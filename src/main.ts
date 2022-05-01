import App from './app';
import ConfigService from './config/config.service';
import IConfigService from './config/config.service.interface';
import PrismaService from './database/prisma.service';
import ExceptionFilter from './errors/exception.filter';
import IExceptionFilter from './errors/exception.filter.interface';
import ILogger from './logger/logger.interface';
import LoggerService from './logger/logger.service';
import UserService from './users/user.service';
import IUserService from './users/user.service.interface';
import UserController from './users/users.controller';
import IUserController from './users/users.controller.interface';
import UsersRepository from './users/users.repository';
import { TYPES } from './types';
import { Container, ContainerModule, interfaces } from 'inversify';
import { IUsersRepository } from './users/users.repository.interface';

export interface IBootstrapReturn {
	appContainer: Container;
	app: App;
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<App>(TYPES.Application).to(App);
	bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
	bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
	bind<IUserController>(TYPES.UserController).to(UserController);
	bind<IUserService>(TYPES.UserService).to(UserService);
	bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
	bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
	bind<IUsersRepository>(TYPES.UsersRepository).to(UsersRepository).inSingletonScope();
});

async function bootstrap(): Promise<IBootstrapReturn> {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);
	await app.init();
	return { appContainer, app };
}

export const boot = bootstrap();
