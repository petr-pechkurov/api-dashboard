import { Container, ContainerModule, interfaces } from 'inversify';
import App from './app';
import ExceptionFilter from './errors/exception.filter';
import IExceptionFilter from './errors/exception.filter.interface';
import ILogger from './logger/logger.interface';
import LoggerService from './logger/logger.service';
import { TYPES } from './types';
import UserController from './users/users.controller';
import IUserController from './users/users.controller.interface';

export interface IBootstrapReturn {
	appContainer: Container;
	app: App;
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<App>(TYPES.Application).to(App);
	bind<ILogger>(TYPES.ILogger).to(LoggerService);
	bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
	bind<IUserController>(TYPES.UserController).to(UserController);
});

function bootstrap(): IBootstrapReturn {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);
	app.init();
	return { appContainer, app };
}

export const { app, appContainer } = bootstrap();
