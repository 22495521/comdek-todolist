import { Request, Response, NextFunction } from 'express';
import { AppError } from './errorHandler';

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  const message = `找不到路由 ${req.method} ${req.originalUrl}`;
  const error = new AppError(message, 404);
  next(error);
};