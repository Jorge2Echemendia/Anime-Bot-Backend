export class AppError extends Error {
    constructor(
        public readonly code: string,
        public readonly message: string,
        public readonly statusCode: number = 400
    ) {
        super(message);
        this.name = 'AppError'
    }
}
export const Errors = {
    unauthorized: () => new AppError('UNAUTHORIZED', 'No autorizado', 401),
    invalidCredentials: () =>
        new AppError('INVALID_CREDENTIALS', 'Credenciales inválidas', 401),
    userNotFound: (id: string) =>
        new AppError('USER_NOT_FOUND', `Usuario ${id} no encontrado`, 404),
    userBanned: (id: string) =>
        new AppError('USER_ALREADY_BANNED', `El usuario ${id} ya está baneado`, 409),
    validation: (msg: string) => new AppError('VALIDATION_ERROR', msg, 422),
    internal: () =>
        new AppError('INTERNAL_ERROR', 'Error interno del servidor', 500),
};