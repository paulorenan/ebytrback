import Task, { TaskSchema, TaskUpdateSchema } from "../interfaces/Tasks";
import Service, { ServiceError } from ".";
import TaskModel from "../models/TaskModel";

class TaskService extends Service<Task> {
  constructor(public model = new TaskModel()) {
    super(model);
  }

  create = async (obj: Task): Promise<Task | null | ServiceError> => {
    const crObj = { ...obj, createdAt: new Date(), updatedAt: new Date() };
    const parsed = TaskSchema.safeParse(crObj);
    if (!parsed.success) {
      return { error: parsed.error };
    }
    return this.model.create(crObj);
  };

  read = async (): Promise<Task[]> => this.model.read();

  readOne = async (id: string): Promise<Task | null | ServiceError> =>
    this.model.readOne(id);

  update = async (id: string, obj: Task): Promise<Task | null | ServiceError> => {
    const upObj = { ...obj, updatedAt: new Date() };
    const parsed = TaskUpdateSchema.safeParse(upObj);
    if (!parsed.success) {
      return { error: parsed.error };
    }
    return this.model.update(id, upObj);
  };
}

export default TaskService;