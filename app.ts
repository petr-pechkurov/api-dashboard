import express, { Express } from 'express';
import { Server } from 'http';
import { inject, injectable } from 'inversify';
import ExceptionFilter from './src/errors/exception.filter';
import ILogger from './src/logger/logger.interface';
import { TYPES } from './src/types';
import UserController from './src/users/users.controller';
import 'reflect-metadata';

@injectable()
export default class App {
  app: Express;
  server: Server;
  port: number;

  constructor(
    @inject(TYPES.ILogger) private logger: ILogger,
    @inject(TYPES.UserController) private userController: UserController,
    @inject(TYPES.ExceptionFilter) private exceptionFilter: ExceptionFilter
  ) {
    this.app = express();
    this.port = 8000;
  }

  useRoutes() {
    this.app.use('/users', this.userController.router);
  }

  useExceptionFilters() {
    this.app.use(this.exceptionFilter.catch.bind(this));
  }

  public async init() {
    this.useRoutes();
    this.useExceptionFilters();
    this.server = this.app.listen(this.port);
    this.logger.log(`Server started at http://localhost:${this.port}`);
  }
}
