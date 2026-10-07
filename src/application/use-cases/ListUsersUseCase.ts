import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { User } from "../../domain/entities/User";

export class ListUsersUseCase{
    constructor(private readonly userRepository:IUserRepository){}

    public async execute():Promise<User[]>{
        return this.userRepository.findAll();
    }
}