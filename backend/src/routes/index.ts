import { Router } from 'express';
import { TaskController } from '../controllers/taskController';
import { validate } from '../middleware/validation';
import { createTaskSchema, updateTaskSchema } from '../schemas/taskSchemas';

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
router.put('/tasks/:id', validate(updateTaskSchema), TaskController.updateTask);
router.delete('/tasks/:id', TaskController.deleteTask);

export default router;