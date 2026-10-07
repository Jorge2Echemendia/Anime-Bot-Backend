import type { VercelRequest, VercelResponse } from '@vercel/node';
import { AppError } from './AppError';
import { fail } from './response';
import { applyCors } from '../middlewares/corsMiddleware';

type Handler = (req: VercelRequest, res: VercelResponse) => Promise<void>;

export function withErrorHandling(handler: Handler): Handler {
    return async (req, res) => {
        applyCors(req, res);  // ← ahora recibe req

        if (req.method === 'OPTIONS') {
            res.status(204).end();
            return;
        }

        try {
            await handler(req, res);
        } catch (error) {
            if (error instanceof AppError) {
                fail(res, error.code, error.message, error.statusCode);
                return;
            }
            console.error('Unhandled error:', error);
            fail(res, 'INTERNAL_ERROR', 'Error interno del servidor', 500);
        }
    };
}