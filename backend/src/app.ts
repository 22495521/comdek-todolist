import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { initializeDatabase } from './config/database';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);

export { app, initializeDatabase };