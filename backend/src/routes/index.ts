import { Router } from 'express';
import { TaskController } from '../controllers/taskController';

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

export default router;