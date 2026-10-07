import { withErrorHandling } from '../../src/presentation/api/helpers/handlerWrapper';
import { getContainer } from '../../src/infrastructure/container';

export default withErrorHandling(async (req, res) => {
    await getContainer().authController.login(req, res);
});