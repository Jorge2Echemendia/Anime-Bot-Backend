import type { VercelRequest, VercelResponse } from '@vercel/node';
import { ListUsersUseCase } from '../../../application/use-cases/ListUsersUseCase';
import { GetUserUseCase } from '../../../application/use-cases/GetUserUseCase';
import { WarnUserUseCase } from '../../../application/use-cases/WarnUserUseCase';
import { UnbanUserUseCase } from '../../../application/use-cases/UnbanUserUseCase';
import { requireAuth } from '../middlewares/authMiddleware';
import { ok } from '../helpers/response';
import { Errors } from '../helpers/AppError';

export class UserController {
    constructor(
        private readonly listUsers: ListUsersUseCase,
        private readonly getUser: GetUserUseCase,
        private readonly warnUser: WarnUserUseCase,
        private readonly unbanUser: UnbanUserUseCase
    ) { }

    public async list(req: VercelRequest, res: VercelResponse): Promise<void> {
        await requireAuth(req);
        const users = await this.listUsers.execute();
        ok(res, users.map(this.serialize));
    }

    public async detail(req: VercelRequest, res: VercelResponse): Promise<void> {
        await requireAuth(req);
        const userId = req.query.id as string;
        const user = await this.getUser.execute(userId);
        ok(res, this.serialize(user));
    }

    public async warn(req: VercelRequest, res: VercelResponse): Promise<void> {
        await requireAuth(req);
        const userId = req.query.id as string;
        const { reason } = req.body ?? {};

        if (typeof reason !== 'string' || reason.trim().length === 0) {
            throw Errors.validation('El motivo es obligatorio');
        }

        const groupChatId = process.env.TELEGRAM_GROUP_ID;
        if (!groupChatId) throw Errors.internal();

        const user = await this.getUser.execute(userId);
        const result = await this.warnUser.execute(
            groupChatId,
            userId,
            user.username,
            reason
        );

        ok(res, result);
    }

    public async unban(req: VercelRequest, res: VercelResponse): Promise<void> {
        await requireAuth(req);
        const userId = req.query.id as string;
        const groupChatId = process.env.TELEGRAM_GROUP_ID;
        if (!groupChatId) throw Errors.internal();

        await this.unbanUser.execute(groupChatId, userId);
        ok(res, { message: 'Usuario desbaneado correctamente' });
    }

    private serialize(user: import('../../../domain/entities/User').User) {
        return {
            id: user.id,
            username: user.username,
            warnings: user.getWarnings(),
            isBanned: user.isUserBanned(),
        };
    }
}