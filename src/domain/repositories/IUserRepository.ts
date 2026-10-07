import {User} from '../entities/User'

export interface IUserRepository {
    findById(id: string): Promise<User | null>;
    save(user: User): Promise<void>;
    findByUsername(username: string): Promise<User | null>;
    findAll(): Promise<User[]>;
}