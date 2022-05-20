import { Schema, model as createModel, Document } from 'mongoose';
import Task from '../interfaces/Tasks';
import MongoModel from './MongoModel';

interface TaskDocument extends Task, Document { }

const taskSchema = new Schema<TaskDocument>({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
  description: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
  status: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

class TaskModel extends MongoModel<Task> {
  constructor(public model = createModel('Task', taskSchema)) {
    super(model);
  }
}

export default TaskModel;