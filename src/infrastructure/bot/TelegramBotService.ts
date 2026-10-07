import { Bot } from 'grammy';
import { IBotService } from '../../domain/services/IBotService';

export class TelegramBotService implements IBotService {
  constructor(private readonly bot: Bot) {}

  async sendMessage(chatId: string, message: string): Promise<void> {
    await this.bot.api.sendMessage(chatId, message, {
      parse_mode: 'HTML',
    });
  }

  async banUser(chatId: string, userId: string): Promise<void> {
    await this.bot.api.banChatMember(chatId, parseInt(userId));
  }

  async unbanUser(chatId: string, userId: string): Promise<void> {
    await this.bot.api.unbanChatMember(chatId, parseInt(userId), {
      only_if_banned: true,
    });
  }

  async warnUser(chatId: string, userId: string, reason: string): Promise<void> {
    // Telegram no tiene "advertencias" nativas, así que solo enviamos un mensaje
    await this.bot.api.sendMessage(
      chatId,
      `⚠️ <a href="tg://user?id=${userId}">Usuario</a>, has recibido una advertencia. Motivo: ${reason}`,
      { parse_mode: 'HTML' }
    );
  }
}