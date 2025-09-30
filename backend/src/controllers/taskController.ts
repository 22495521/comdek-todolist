import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../config/database';
import { Task, Priority } from '../entities/Task';
import { AppError } from '../middleware/errorHandler';

export class TaskController {
  static async getAllTasks(req: Request, res: Response, next: NextFunction) {
    try {
      const { page = 1, limit = 10 } = (req as any).validatedQuery || {};
      const skip = (page - 1) * limit;

      const taskRepository = AppDataSource.getRepository(Task);
      
      const [tasks, total] = await taskRepository.findAndCount({
        order: {
          createdAt: 'DESC'
        },
        skip,
        take: limit
      });

      const totalPages = Math.ceil(total / limit);

      res.json({
        success: true,
        message: '成功獲取任務列表',
        data: tasks,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: total,
        }
      });
    } catch (error) {
      next(error);
    }
  }

  static async getTaskById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const taskRepository = AppDataSource.getRepository(Task);
      const task = await taskRepository.findOne({
        where: { id: parseInt(id) }
      });

      if (!task) {
        throw new AppError(`找不到 ID 為 ${id} 的任務`, 404);
      }

      res.json({
        success: true,
        message: '成功獲取任務',
        data: task
      });
    } catch (error) {
      next(error);
    }
  }

  static async createTask(req: Request, res: Response, next: NextFunction) {
    try {
      const { task, priority, deadline } = req.body;

      const taskRepository = AppDataSource.getRepository(Task);
      const newTask = taskRepository.create({
        task,
        priority,
        deadline: deadline ? new Date(deadline) : null,
        isDone: false
      });

      const savedTask = await taskRepository.save(newTask);

      res.status(201).json({
        success: true,
        message: '任務創建成功',
        data: savedTask
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateTask(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { task, priority, deadline, isDone } = req.body;

      const taskRepository = AppDataSource.getRepository(Task);
      const existingTask = await taskRepository.findOne({
        where: { id: parseInt(id) }
      });

      if (!existingTask) {
        throw new AppError(`找不到 ID 為 ${id} 的任務`, 404);
      }

      const updateData: any = {};
      if (task !== undefined) updateData.task = task;
      if (priority !== undefined) updateData.priority = priority;
      if (deadline !== undefined) updateData.deadline = deadline ? new Date(deadline) : null;
      if (isDone !== undefined) updateData.isDone = isDone;

      await taskRepository.update(parseInt(id), updateData);
      const updatedTask = await taskRepository.findOne({
        where: { id: parseInt(id) }
      });

      res.json({
        success: true,
        message: '任務更新成功',
        data: updatedTask
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteTask(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const taskRepository = AppDataSource.getRepository(Task);
      
      const existingTask = await taskRepository.findOne({
        where: { id: parseInt(id) }
      });

      if (!existingTask) {
        throw new AppError(`找不到 ID 為 ${id} 的任務`, 404);
      }

      await taskRepository.delete(parseInt(id));

      res.json({
        success: true,
        message: '任務刪除成功'
      });
    } catch (error) {
      next(error);
    }
  }
}