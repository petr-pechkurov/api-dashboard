import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import BaseController from '../common/base.controller';
import HTTPError from '../errors/http-error.class';
import ILogger from '../logger/logger.interface';
import { TYPES } from '../types';
import 'reflect-metadata';
import IUserController from './users.controller.interface';
import UserLoginDto from './dto/user-login.dto';
import UserRegisterDto from './dto/user-register.dto';
import User from './user.entity';
import UserService from './user.service';
import ValidateMiddleware from '../common/validate.middleware';

@injectable()
export default class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.ILogger) logger: ILogger,
		@inject(TYPES.UserService) private userService: UserService,
	) {
		super(logger);
		this.bindRoutes([
			{
				path: '/login',
				method: 'post',
				func: this.login,
				middlewares: [new ValidateMiddleware(UserLoginDto)],
			},
			{
				path: '/register',
				method: 'post',
				func: this.register,
				middlewares: [new ValidateMiddleware(UserRegisterDto)],
			},
		]);
	}

	async login(
		{ body }: Request<{}, {}, UserLoginDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.userService.validateUser(body);
		if (!result) {
			return next(new HTTPError(401, 'auth error', 'login'));
		}
		this.ok(res, { message: 'login successful' });
	}

	async register(
		{ body }: Request<{}, {}, UserRegisterDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.userService.createUser(body);
		if (!result) {
			return next(new HTTPError(422, 'This user is already exists'));
		}
		this.ok(res, { email: result.email, id: result.id });
	}
}
