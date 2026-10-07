import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GetStatsUseCase } from '../../../application/use-cases/GetStatsUseCase';
import { requireAuth } from '../middlewares/authMiddleware';
import { ok } from '../helpers/response';

export class StatsController {
    constructor(private readonly getStats: GetStatsUseCase) { }

    public async index(_req: VercelRequest, res: VercelResponse): Promise<void> {
        await requireAuth(_req);
        const stats = await this.getStats.execute();
        ok(res, stats);
    }
}