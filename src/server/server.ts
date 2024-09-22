import 'reflect-metadata';
import 'express-async-errors';
import './container';
import {AppDataSource} from '../db/conection/data-source'
import { routes } from '../http/routes'
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';

const app = express();
app.use(cors());

app.use(express.json());
app.use(routes);

AppDataSource.initialize().then(async () => {
    console.log("Database Ok")
    app.listen(3333, () => {
        console.log('Server start from port 3333');
    });
})