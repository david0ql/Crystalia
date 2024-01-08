import express, { Express } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';

dotenv.config();

import { accessTokenMiddleware } from './middlewares/';
import { Routes } from './routes';

class App {

    constructor(
        private readonly app: Express   = express(),
    ){
        this.setupMiddlewares();
        this.setupRoutes();
    }

    private setupMiddlewares = () => {
        this.app.use(cors())
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(accessTokenMiddleware)
    }

    private setupRoutes = () => {
        this.app.use("/api", Routes)
    }

    public listen = () => {
        this.app.listen(process.env.API_PORT, () => {
            console.log(`Server is listening on port ${process.env.API_PORT}`);
        });
    }
}

export default App;