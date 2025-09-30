import { Request, Response, NextFunction } from 'express';

export interface ApiError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export class AppError extends Error implements ApiError {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const globalErrorHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { statusCode = 500, message } = err;

  if (process.env.NODE_ENV === 'development') {
    console.error('錯誤詳情:', {
      message: err.message,
      stack: err.stack,
      url: req.url,
      method: req.method,
      body: req.body,
      params: req.params,
      query: req.query
    });
  } else {
    console.error('生產環境錯誤:', {
      message: err.message,
      url: req.url,
      method: req.method,
      timestamp: new Date().toISOString()
    });
  }

  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = '資料驗證失敗';
  } else if (err.name === 'CastError') {
    statusCode = 400;
    message = '無效的資料格式';
  } else if (err.name === 'QueryFailedError') {
    statusCode = 400;
    message = '資料庫查詢失敗';
  } else if (!err.isOperational && statusCode === 500) {
    message = '伺服器內部錯誤';
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && {
      error: err.message,
      stack: err.stack
    }),
    timestamp: new Date().toISOString()
  });
};