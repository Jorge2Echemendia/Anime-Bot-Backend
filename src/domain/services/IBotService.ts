export interface IBotService {
    sendMessage(chatId: string, message: string): Promise<void>;
    banUser(chatId: string, user: string): Promise<void>;
    unbanUser(chatId: string, user: string): Promise<void>;
    warnUser(chatId: string, userId: string, reason: string): Promise<void>;
}