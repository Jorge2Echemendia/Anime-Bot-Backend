export class User {
    constructor(
        public readonly id: string,
        public readonly username: string,
        private warnings: number =0,
        private isBanned:boolean = false
    ) {}
    public getWarnings() {
        return this.warnings;
    }
    public isUserBanned():boolean{
        return this.isBanned;
    }
    public addWarning() {
        if(this.isBanned){
            throw new Error('No se puede advertir a aun usuario baneado');
        }
        this.warnings+=1;
        if(this.warnings>=3){
            this.isBanned= true;
        }
        return this.warnings>=3;
    }

    public resetWarnings():void{
        this.warnings=0;
    }
}