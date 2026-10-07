import { Context } from "grammy";

export interface TargetUser{
    id:string;
    username:string;
}

export function resolveTargetUser(ctx:Context):TargetUser|null{
    const replied =ctx.message?.reply_to_message?.from;
    if(replied && !replied.is_bot){
        return{
            id:replied.id.toString(),
            username:replied.username ?? replied.first_name ?? 'usuario',
        };
    }

    const textMention = ctx.message?.entities?.find(
        (e)=>e.type==='text_mention'
    );

    if(textMention && 'user' in textMention && textMention.user){
        const user =textMention.user;
        return{
            id:user.id.toString(),
            username:user.username ?? user.first_name ?? 'usuario',
        };
    }

    return null
}