import App from './app';
import ExceptionFilter from './src/errors/exception.filter';
import LoggerService from './src/logger/logger.service';
import UserController from './src/users/users.controller';

async function bootstrap() {
  const logger = new LoggerService();
  const app = new App(logger, new UserController(logger), new ExceptionFilter(logger));
  await app.init();
}

bootstrap();
