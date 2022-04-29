import { Container } from 'inversify';
import App from './app';
import ExceptionFilter from './src/errors/exception.filter';
import IExceptionFilter from './src/errors/exception.filter.interface';
import ILogger from './src/logger/logger.interface';
import LoggerService from './src/logger/logger.service';
import { TYPES } from './src/types';
import UserController from './src/users/users.controller';

const appContainer = new Container();
appContainer.bind<ILogger>(TYPES.ILogger).to(LoggerService);
appContainer.bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
appContainer.bind<UserController>(TYPES.UserController).to(UserController);
appContainer.bind<App>(TYPES.Application).to(App);
const app = appContainer.get<App>(TYPES.Application);
app.init();

export default {app, appContainer}