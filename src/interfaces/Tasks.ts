import { z } from 'zod';

const TaskSchema = z.object({
  title: z.string({
    required_error: 'Title is required',
    invalid_type_error: 'Title must be a string',
  }).min(3,{ message: 'Title must be at least 3 characters' })
    .max(255, { message: 'Title must be at most 255 characters' }),
  description: z.string({
    required_error: 'Description is required',
    invalid_type_error: 'Description must be a string',
  }).min(3,{ message: 'Description must be at least 3 characters' })
    .max(255, { message: 'Description must be at most 255 characters' }),
  status: z.string({
    required_error: 'Status is required',
    invalid_type_error: 'Status must be a string',
  }).min(3,{ message: 'Status must be at least 3 characters' })
    .max(255, { message: 'Status must be at most 255 characters' }),
  createdAt: z.date({
    required_error: 'CreatedAt is required',
    invalid_type_error: 'CreatedAt must be a date',
  }),
  updatedAt: z.date({
    required_error: 'UpdatedAt is required',
    invalid_type_error: 'UpdatedAt must be a date',
  }),
});

type Task = z.infer<typeof TaskSchema>;

export default Task;
export { TaskSchema };