import { Router } from 'express';
import { TaskController } from '../controllers/taskController';
import { validate } from '../middleware/validation';
import { createTaskSchema } from '../schemas/taskSchemas';

const router = Router();

router.get('/health', (_req, res) => {
  res.json({ 
    status: 'OK',
    message: 'API 運行正常',
    timestamp: new Date().toISOString()
  });
});

router.get('/tasks', TaskController.getAllTasks);
router.get('/tasks/:id', TaskController.getTaskById);
router.post('/tasks', validate(createTaskSchema), TaskController.createTask);

export default router;