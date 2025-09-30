import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { initializeDatabase } from './config/database';
import routes from './routes';
import { notFoundHandler } from './middleware/notFound';
import { globalErrorHandler } from './middleware/errorHandler';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);

app.use(notFoundHandler);
app.use(globalErrorHandler);

export { app, initializeDatabase };