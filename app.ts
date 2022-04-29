import express, { Express } from 'express';
import { Server } from 'http';
import ExceptionFilter from './src/errors/exception.filter';
import ILogger from './src/logger/logger.interface';
import LoggerService from './src/logger/logger.service';
import UserController from './src/users/users.controller';

export default class App {
  app: Express;
  server: Server;
  port: number;
  logger: ILogger;
  userController: UserController;
  exceptionFilter: ExceptionFilter;

  constructor(logger: ILogger, userController: UserController, exceptionFilter: ExceptionFilter) {
    this.app = express();
    this.port = 8000;
    this.logger = logger;
    this.userController = userController;
    this.exceptionFilter = exceptionFilter;
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
