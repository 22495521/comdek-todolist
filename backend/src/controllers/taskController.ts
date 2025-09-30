import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../config/database';
import { Task, Priority } from '../entities/Task';
import { AppError } from '../middleware/errorHandler';

export class TaskController {
  static async getAllTasks(req: Request, res: Response, next: NextFunction) {
    try {
      const taskRepository = AppDataSource.getRepository(Task);
      const tasks = await taskRepository.find({
        order: {
          createdAt: 'DESC'
        }
      });

      res.json({
        success: true,
        message: '成功獲取所有任務',
        data: tasks,
        count: tasks.length
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
}