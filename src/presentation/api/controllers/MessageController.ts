import type { VercelRequest, VercelResponse } from '@vercel/node';
import { BroadcastMessageUseCase } from '../../../application/use-cases/BroadcastMessageUseCase';
import { requireAuth } from '../middlewares/authMiddleware';
import { ok } from '../helpers/response';
import { Errors } from '../helpers/AppError';

export class MessageController {
    constructor(private readonly broadcast: BroadcastMessageUseCase) { }

    public async send(req: VercelRequest, res: VercelResponse): Promise<void> {
        await requireAuth(req);

        const { message, chatId } = req.body ?? {};

        if (typeof message !== 'string' || message.trim().length === 0) {
            throw Errors.validation('El mensaje no puede estar vacío');
        }

        const targetChatId = chatId || process.env.TELEGRAM_GROUP_ID;
        if (!targetChatId) throw Errors.internal();

        await this.broadcast.execute(targetChatId, message);
        ok(res, { message: 'Mensaje enviado correctamente' }, 201);
    }
}