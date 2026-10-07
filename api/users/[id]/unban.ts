import { withErrorHandling } from '../../../../anime-bot-backend/src/presentation/api/helpers/handlerWrapper';
import { getContainer } from '../../../../anime-bot-backend/src/infrastructure/container';

export default withErrorHandling(async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ success: false, error: 'Method Not Allowed' });
    return;
  }
  await getContainer().userController.unban(req, res);
});