import { withErrorHandling } from '../../anime-bot-backend/src/presentation/api/helpers/handlerWrapper';
import { ok } from '../../anime-bot-backend/src/presentation/api/helpers/response';

export default withErrorHandling(async (_req, res) => {
    ok(res, { status: 'ok', timestamp: new Date().toISOString() });
});