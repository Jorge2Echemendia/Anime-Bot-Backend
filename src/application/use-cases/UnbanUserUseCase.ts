import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { IBotService } from "../../domain/services/IBotService";

export class UnbanUserUseCase {
    constructor(
        private readonly userRepositore: IUserRepository,
        private readonly botservice: IBotService
    ) { }

    public async execute(chatId: string, userId: string): Promise<void> {
        const user = await this.userRepositore.findById(userId);
        if (!user) throw new Error('Usuario no encontrado');

        await this.botservice.unbanUser(chatId, userId)
        user.resetWarnings();
        await this.userRepositore.save(user);
    }
}