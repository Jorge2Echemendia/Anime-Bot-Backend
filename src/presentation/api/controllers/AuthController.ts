import type { VercelRequest, VercelResponse } from '@vercel/node';
import { LoginUseCase } from '../../../application/use-cases/LoginUseCase';
import { ok } from '../helpers/response';
import { Errors } from '../helpers/AppError';

export class AuthController {
    constructor(private readonly loginUseCase: LoginUseCase) { }

    public async login(req: VercelRequest, res: VercelResponse): Promise<void> {
        if (req.method !== 'POST') {
            throw Errors.validation('Método no permitido');
        }

        const { username, password } = req.body ?? {};

        if (typeof username !== 'string' || typeof password !== 'string') {
            throw Errors.validation('username y password son obligatorios');
        }

        const result = await this.loginUseCase.execute(username, password);
        ok(res, result);
    }
}