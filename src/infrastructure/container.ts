import { getPool } from './database/pool';
import { PostgresUserRepository } from './database/PostgresUserRepository';
import { TelegramBotService } from './bot/TelegramBotService';
import { JwtTokenService } from './auth/JwtTokenService';
import { Bot } from 'grammy';

import { ListUsersUseCase } from '../application/use-cases/ListUsersUseCase';
import { GetUserUseCase } from '../application/use-cases/GetUserUseCase';
import { WarnUserUseCase } from '../application/use-cases/WarnUserUseCase';
import { UnbanUserUseCase } from '../application/use-cases/UnbanUserUseCase';
import { GetStatsUseCase } from '../application/use-cases/GetStatsUseCase';
import { LoginUseCase } from '../application/use-cases/LoginUseCase';
import { BroadcastMessageUseCase } from '../application/use-cases/BroadcastMessageUseCase';

import { AuthController } from '../presentation/api/controllers/AuthController';
import { UserController } from '../presentation/api/controllers/UserController';
import { StatsController } from '../presentation/api/controllers/StatsController';
import { MessageController } from '../presentation/api/controllers/MessageController';

interface Container {
  authController: AuthController;
  userController: UserController;
  statsController: StatsController;
  messageController: MessageController;
  tokenService: JwtTokenService;
  bot: Bot;
}

let container: Container | null = null;

export function getContainer(): Container {
  if (container) return container;

  // Infraestructura
  const pool = getPool();
  const userRepository = new PostgresUserRepository();
  const tokenService = new JwtTokenService(process.env.JWT_SECRET!);

  const bot = new Bot(process.env.BOT_TOKEN!);
  const botService = new TelegramBotService(bot);

  // Casos de uso
  const listUsers = new ListUsersUseCase(userRepository);
  const getUser = new GetUserUseCase(userRepository);
  const warnUser = new WarnUserUseCase(userRepository, botService);
  const unbanUser = new UnbanUserUseCase(userRepository, botService);
  const getStats = new GetStatsUseCase(userRepository);
  const login = new LoginUseCase(tokenService);
  const broadcast = new BroadcastMessageUseCase(botService);

  // Controladores
  container = {
    authController: new AuthController(login),
    userController: new UserController(listUsers, getUser, warnUser, unbanUser),
    statsController: new StatsController(getStats),
    messageController: new MessageController(broadcast),
    tokenService,
    bot,
  };

  return container;
}