import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import BaseController from '../common/base.controller';
import HTTPError from '../errors/http-error.class';
import ILogger from '../logger/logger.interface';
import { TYPES } from '../types';
import 'reflect-metadata';
import IUserController from './users.controller.interface';

@injectable()
export default class UserController extends BaseController implements IUserController {
	constructor(@inject(TYPES.ILogger) logger: ILogger) {
		super(logger);
		this.bindRoutes([
			{ path: '/login', method: 'post', func: this.login },
			{ path: '/register', method: 'post', func: this.register },
		]);
	}

	login(req: Request, res: Response, next: NextFunction): void {
		next(new HTTPError(401, 'auth error', 'login'));
	}

	register(req: Request, res: Response, next: NextFunction): void {
		this.ok(res, { message: 'register' });
	}
}
