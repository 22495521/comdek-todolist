import Joi from 'joi';
import { Priority } from '../entities/Task';

export const createTaskSchema = Joi.object({
  task: Joi.string().trim().min(1).required(),
  priority: Joi.string().valid("High", "Medium", "Low").required(),
  deadline: Joi.date().allow(null).optional().required(),
});