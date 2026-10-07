import { Context } from "grammy";
import { WarnUserUseCase } from "../../application/use-cases/WarnUserUseCase";
import { resolveTargetUser } from "./resolveTargetUser";

export async function handleWarn(ctx: Context, warmUserUseCase: WarnUserUseCase): Promise<void> {
    if (ctx.chat?.type !== 'group' && ctx.chat?.type !== 'supergroup') {
        await ctx.reply('Este comando solo funciona en grupos.');
        return;
    }

    const target = resolveTargetUser(ctx);
    if (!target) {
        await ctx.reply(
            ' No pude identificar al usuario.\n\n' +
            'Opciones válidas:\n' +
            '• Responde a un mensaje suyo con /warn [motivo]\n' +
            '• Menciónalo con su @username público (debe haber escrito antes)'
        );
        return;
    }

    const text = ctx.message?.text ?? '';
    const reason = extractReason(text) || 'Sin motivo especificado';

    try {
        const result = await warmUserUseCase.execute(
            ctx.chat.id.toString(),
            target.id,
            target.username,
            reason
        );
        if (!result.banned) {
            await ctx.reply(
                `Advertencia registrada para @${target.username} (${result.warnings}/3)`
            );
        }
    } catch (error) {
        await ctx.reply(`Error: ${(error as Error).message}`)
    }
}

function extractReason(text: string): string {
    return text.replace(/^\/warn\s*/i, '')
        .replace(/@\S+\s*/g, '')
        .trim();
}

