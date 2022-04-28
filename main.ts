import App from './app';
import LoggerService from './src/logger/logger.service';
import UserController from './src/users/users.controller';

async function bootstrap() {
  const logger = new LoggerService();
  const app = new App(logger, new UserController(logger));
  await app.init();
}

bootstrap();
