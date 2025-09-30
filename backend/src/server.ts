import { config } from 'dotenv';
import { app, initializeDatabase } from './app';

config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await initializeDatabase();
    
    app.listen(PORT, () => {
      console.log(`伺服器運行在 http://localhost:${PORT}`);
      console.log(`API 健康檢查: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error('啟動伺服器失敗:', error);
    process.exit(1);
  }
};

startServer();