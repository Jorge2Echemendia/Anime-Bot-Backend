import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { IBotService } from '../../domain/services/IBotService';
import { User } from '../../domain/entities/User';

export class WarnUserUseCase {
    constructor(
        private userRepository: IUserRepository,
        private botService: IBotService
    ) { }

    public async execute(chatId: string, targetUserId: string, targetUsername: string, reason: string): Promise<{ banned: boolean; warnings: number }> {
        let user = await this.userRepository.findById(targetUserId);;
        if (!user) {
            user = new User(targetUserId, targetUsername);
        }

        const shouldBan = user.addWarning();
        await this.userRepository.save(user);

        if (shouldBan) {
            await this.botService.banUser(chatId, targetUserId);

            await this.botService.sendMessage(chatId, `Advertencia para ${targetUsername},ha sido baneado por acumular 3 advertencias.Total: ${user.getWarnings()}`);
        } else {
            await this.botService.warnUser(chatId, targetUserId, reason);
            await this.botService.sendMessage(
                chatId,
                `⚠️ @${targetUsername} ha recibido una advertencia (${user.getWarnings()}/3). Motivo: ${reason}`
            );
        }

        return { banned: shouldBan, warnings: user.getWarnings() };
    }
}