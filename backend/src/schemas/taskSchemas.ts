import Joi from 'joi';
import { Priority } from '../entities/Task';

export const createTaskSchema = Joi.object({
  task: Joi.string().trim().min(1).required(),
  priority: Joi.string().valid("High", "Medium", "Low").default("Medium"),
  deadline: Joi.date().allow(null).optional()
});

export const updateTaskSchema = Joi.object({
  task: Joi.string().trim().min(1).optional(),
  priority: Joi.string().valid("High", "Medium", "Low").optional(),
  deadline: Joi.date().allow(null).optional(),
  isDone: Joi.boolean().optional()
});