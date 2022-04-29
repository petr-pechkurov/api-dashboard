import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import BaseController from '../common/base.controller';
import HTTPError from '../errors/http-error.class';
import ILogger from '../logger/logger.interface';
import { TYPES } from '../types';
import 'reflect-metadata';

@injectable()
export default class UserController extends BaseController {
  constructor(@inject(TYPES.ILogger) logger: ILogger) {
    super(logger);
    this.bindRoutes([
      { path: '/login', method: 'post', func: this.login },
      { path: '/register', method: 'post', func: this.register },
    ]);
  }

  login(req: Request, res: Response, next: NextFunction) {
    next(new HTTPError(401, 'auth error', 'login'));
    // this.ok(res, 'login');
  }

  register(req: Request, res: Response, next: NextFunction) {
    this.ok(res, { message: 'register' });
  }
}
