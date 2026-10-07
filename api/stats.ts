import { withErrorHandling } from '../../anime-bot-backend/src/presentation/api/helpers/handlerWrapper';
import { getContainer } from '../../anime-bot-backend/src/infrastructure/container';

export default withErrorHandling(async (req, res) => {
    await getContainer().statsController.index(req, res);
});