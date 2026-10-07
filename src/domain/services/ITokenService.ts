export interface TokenPayload {
    sub: string;
}

export interface ITokenService {
    sign(payload: TokenPayload): Promise<string>;
    verify(token: string): Promise<TokenPayload>;
}