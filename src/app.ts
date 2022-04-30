import express, { Express } from 'express';
import { Server } from 'http';
import { inject, injectable } from 'inversify';
import ExceptionFilter from './errors/exception.filter';
import ILogger from './logger/logger.interface';
import { TYPES } from './types';
import UserController from './users/users.controller';
import 'reflect-metadata';
import { json } from 'body-parser';
import IUserController from './users/users.controller.interface';
import IExceptionFilter from './errors/exception.filter.interface';
import IConfigService from './config/config.service.interface';

@injectable()
export default class App {
	app: Express;
	server: Server;
	port: number;

	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.UserController) private userController: UserController,
		@inject(TYPES.ExceptionFilter) private exceptionFilter: IExceptionFilter,
		@inject(TYPES.ConfigService) private configService: IConfigService,
	) {
		this.app = express();
		this.port = 8000;
	}

	useMiddleware(): void {
		this.app.use(json());
	}

	useRoutes(): void {
		this.app.use('/users', this.userController.router);
	}

	useExceptionFilters(): void {
		this.app.use(this.exceptionFilter.catch.bind(this));
	}

	public init(): void {
		this.useMiddleware();
		this.useRoutes();
		this.useExceptionFilters();
		this.server = this.app.listen(this.port);
		this.logger.log(`Server started at http://localhost:${this.port}`);
	}
}
