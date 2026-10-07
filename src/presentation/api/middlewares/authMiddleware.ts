import type { VercelRequest } from '@vercel/node';
import { getContainer } from '../../../infrastructure/container';
import { Errors } from '../helpers/AppError';

export async function requireAuth(req: VercelRequest): Promise<string> {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    throw Errors.unauthorized();
  }

  const token = header.substring(7);
  const { tokenService } = getContainer();

  try {
    const payload = await tokenService.verify(token);
    return payload.sub;
  } catch {
    throw Errors.unauthorized();
  }
}