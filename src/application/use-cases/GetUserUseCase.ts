import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { User } from '../../domain/entities/User';
import { Errors } from '../../presentation/api/helpers/AppError';

export class GetUserUseCase {
    constructor(private readonly userRepository: IUserRepository) { }

    public async execute(userId: string): Promise<User> {
        const user = await this.userRepository.findById(userId);
        if (!user) throw Errors.userNotFound(userId);
        return user;
    }
}