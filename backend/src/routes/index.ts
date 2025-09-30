import { Router } from 'express';

const router = Router();

router.get('/health', (_req, res) => {
  res.json({ 
    status: 'OK',
    message: 'API 運行正常',
    timestamp: new Date().toISOString()
  });
});

export default router;