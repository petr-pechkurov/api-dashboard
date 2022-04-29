import { Request, Response, NextFunction } from 'express';
import BaseController from '../common/base.controller';
import HTTPError from '../errors/http-error.class';
import LoggerService from '../logger/logger.service';

export default class UserController extends BaseController {
  constructor(logger: LoggerService) {
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
