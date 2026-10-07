import { ITokenService } from '../../domain/services/ITokenService';
import { Errors } from '../../presentation/api/helpers/AppError';
import bcrypt from 'bcryptjs';

export class LoginUseCase {
    constructor(private readonly tokenService: ITokenService) { }

    public async execute(
        username: string,
        password: string
    ): Promise<{ token: string; username: string }> {
        const adminUsername = process.env.ADMIN_USERNAME;
        const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

        if (!adminUsername || !adminPasswordHash) {
            throw Errors.internal();
        }

        const passwordMatches =
            username === adminUsername &&
            (await bcrypt.compare(password, adminPasswordHash));

        if (!passwordMatches) {
            throw Errors.invalidCredentials();
        }

        const token = await this.tokenService.sign({ sub: username });
        return { token, username };
    }
}