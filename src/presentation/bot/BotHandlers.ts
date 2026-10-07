import { Bot } from "grammy";
import { UnbanUserUseCase } from "../../application/use-cases/UnbanUserUseCase";
import { WarnUserUseCase } from "../../application/use-cases/WarnUserUseCase";
import { handleWarn } from "./../handlers/warnHandler";
import { handleUnban } from "./../handlers/unbanHandler";

interface BotDependencies {
    warnUser: WarnUserUseCase;
    unbanUser: UnbanUserUseCase;
}
export function registerBotHandlers(bot: Bot, deps: BotDependencies): void {

    bot.command('start', async (ctx) => {
        await ctx.reply(
            '¡Hola! Soy el bot de gestión del grupo de anime. ' +
            'Usa /help para ver los comandos disponibles.'
        );
    });


    bot.command('help', async (ctx) => {
        await ctx.reply(
            '📋 Comandos disponibles:\n' +
            '/warn @usuario [motivo] - Añade una advertencia\n' +
            '/unban @usuario - Retira el ban y resetea advertencias\n' +
            '/status @usuario - Consulta el estado de un usuario'
        );
    });


    bot.command('warn', async (ctx) => {
        await handleWarn(ctx, deps.warnUser);
    });


    bot.command('unban', async (ctx) => {
        await handleUnban(ctx, deps.unbanUser);
    });

    bot.catch((err) => {
        const ctx = err.ctx;
        console.error(`Error en la actualización ${ctx.update.update_id}:`);
        console.error(err.error);

        // Opcional: notificar al administrador
        if (process.env.ADMIN_CHAT_ID) {
            ctx.api.sendMessage(
                process.env.ADMIN_CHAT_ID,
                `⚠️ Error en el bot: ${err.message}`
            ).catch(() => { });
        }
    });
}