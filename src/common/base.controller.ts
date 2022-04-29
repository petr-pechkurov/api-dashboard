import { Response, Router } from 'express';
import IControllerRoute from './route.interface';
import ILogger from '../logger/logger.interface';
import { injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export default abstract class BaseController {
  public readonly router: Router;

  constructor(private logger: ILogger) {
    this.router = Router();
  }

  public send<T>(res: Response, code: number, message: T) {
    res.type('application/json');
    return res.status(code).json(message);
  }

  public ok<T>(res: Response, message: T) {
    return this.send<T>(res, 200, message);
  }

  public created(res: Response) {
    return res.sendStatus(201);
  }

  protected bindRoutes(routes: IControllerRoute[]) {
    routes.forEach((route) => {
      this.logger.log(`[${route.method}] ${route.path}`);
      const handler = route.func.bind(this);
      this.router[route.method](route.path, handler);
    });
  }
}
