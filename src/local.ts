import 'dotenv/config';
import { Bot } from "grammy";
import { PostgresUserRepository } from "./infrastructure/database/PostgresUserRepository";
import { TelegramBotService } from "./infrastructure/bot/TelegramBotService";
import { WarnUserUseCase } from "./application/use-cases/WarnUserUseCase";
import { registerBotHandlers } from "./presentation/bot/BotHandlers";
import { UnbanUserUseCase } from "./application/use-cases/UnbanUserUseCase";

const token = process.env.BOT_TOKEN;
if (!token) throw new Error("BOT_TOKEN is unset");

const bot = new Bot(token);
const userRepository = new PostgresUserRepository();
const botService = new TelegramBotService(bot);
const warnUserUseCase = new WarnUserUseCase(userRepository, botService);
const unbanUserUseCase = new UnbanUserUseCase(userRepository, botService);
registerBotHandlers(bot, {
    warnUser: warnUserUseCase,
    unbanUser: unbanUserUseCase,
});

bot.start();
console.log("Bot en modo polling iniciado...");