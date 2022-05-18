import { Request, Response } from 'express';
import Controller, { RequestWithBody, ResponseError } from '.';
import TaskService from '../services/TaskService';
import Task from '../interfaces/Tasks';

class TaskController extends Controller<Task> {
  private _route: string;

  constructor(
    service = new TaskService(),
    route = '/tasks',
  ) {
    super(service);
    this._route = route;
  }

  get route(): string { return this._route; }

  create = async (
    req: RequestWithBody<Task>,
    res: Response<Task | ResponseError>,
  ): Promise<typeof res> => {
    const { body } = req;
    try {
      const task = await this.service.create(body);
      if (!task) {
        return res.status(500).json({ error: this.errors.internal });
      }
      if ('error' in task) {
        return res.status(400).json(task);
      }
      return res.status(201).json(task);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  }

  readOne = async (
    req: Request<{ id: string; }>,
    res: Response<Task | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    try {
      const task = await this.service.readOne(id);
      return task
      ? res.status(200).json(task)
      : res.status(404).json({ error: this.errors.notFound });
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  }

  update = async (
    req: RequestWithBody<Task>,
    res: Response<Task | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    const { body } = req;
    try {
      const task = await this.service.update(id, body);
      if (!task) {
        return res.status(500).json({ error: this.errors.internal });
      }
      if ('error' in task) {
        return res.status(400).json(task);
      }
      return res.status(200).json(task);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  }

  delete = async (
    req: Request<{ id: string; }>,
    res: Response<Task | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    try {
      const task = await this.service.delete(id);
      return task
      ? res.status(200).json(task)
      : res.status(404).json({ error: this.errors.notFound });
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  }
}

export default TaskController;