import { IBotService } from "../../domain/services/IBotService";

export class BroadcastMessageUseCase{
    constructor(private readonly botService:IBotService){}

    public async execute(chatId:string,message:string, scheduleAt?:Date):Promise<void>{
        if(scheduleAt && scheduleAt>new Date()){
            throw new Error('Programación futura no implementada aún');
        }

        await this.botService.sendMessage(chatId,message);
    }
}