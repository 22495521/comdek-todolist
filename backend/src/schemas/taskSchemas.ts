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

export const paginationSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10)
});