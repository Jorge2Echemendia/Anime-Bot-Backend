import { Bot, webhookCallback } from 'grammy';
import { WarnUserUseCase } from '../src/application/use-cases/WarnUserUseCase';
import { UnbanUserUseCase } from '../src/application/use-cases/UnbanUserUseCase';
import { TelegramBotService } from '../src/infrastructure/bot/TelegramBotService';
import { PostgresUserRepository } from '../src/infrastructure/database/PostgresUserRepository';
import { registerBotHandlers } from '../src/presentation/bot/BotHandlers';

const token = process.env.BOT_TOKEN;
if (!token) {
    throw new Error('BOT_TOKEN is unset');
}

const bot = new Bot(token);

const userRepository = new PostgresUserRepository();
const botService = new TelegramBotService(bot);
const warnUserUseCase = new WarnUserUseCase(userRepository, botService);
const unbanUserUseCase = new UnbanUserUseCase(userRepository, botService);

registerBotHandlers(bot, {
    warnUser: warnUserUseCase,
    unbanUser: unbanUserUseCase,
});

export default webhookCallback(
    bot,
    'https',
    'return',
    9000,
    process.env.TELEGRAM_SECRET_TOKEN,
);