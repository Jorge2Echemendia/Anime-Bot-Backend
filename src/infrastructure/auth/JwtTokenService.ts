import jwt from 'jsonwebtoken';
import { ITokenService, TokenPayload } from '../../domain/services/ITokenService';

export class JwtTokenService implements ITokenService {
    private readonly secret: string;

    constructor(secret: string) {
        this.secret = secret;
    }

    async sign(payload: TokenPayload): Promise<string> {
        return jwt.sign(payload, this.secret, { expiresIn: '7d' });
    }

    async verify(token: string): Promise<TokenPayload> {
        return jwt.verify(token, this.secret) as TokenPayload;
    }
}