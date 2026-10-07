import { Context } from 'grammy';
import { UnbanUserUseCase } from '../../application/use-cases/UnbanUserUseCase';
import { resolveTargetUser } from './resolveTargetUser';

export async function handleUnban(
  ctx: Context,
  unbanUserUseCase: UnbanUserUseCase
): Promise<void> {
  if (ctx.chat?.type !== 'group' && ctx.chat?.type !== 'supergroup') {
    await ctx.reply('Este comando solo funciona en grupos.');
    return;
  }

  const target= resolveTargetUser(ctx);
  if(!target){
    await ctx.reply(
      ' No pude identificar al usuario.\n\n' +
        'Opciones válidas:\n' +
        '• Responde a un mensaje suyo con /unban\n' +
        '• Menciónalo con su @username público (debe haber escrito antes)'
    );
    return
  }

  try{
    await unbanUserUseCase.execute(ctx.chat.id.toString(),target.id);
    await ctx.reply(`@${target.username} ha sido desbaneado`);
  } catch(error){
    await ctx.reply(`Error:${(error as Error).message}`);
  }
}