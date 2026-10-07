import { IUserRepository } from '../../domain/repositories/IUserRepository';

export interface Stats {
  totalUsers: number;
  bannedUsers: number;
  warnedUsers: number;
  totalWarnings: number;
}

export class GetStatsUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  public async execute(): Promise<Stats> {
    const users = await this.userRepository.findAll();

    return {
      totalUsers: users.length,
      bannedUsers: users.filter((u) => u.isUserBanned()).length,
      warnedUsers: users.filter((u) => u.getWarnings() > 0).length,
      totalWarnings: users.reduce((sum, u) => sum + u.getWarnings(), 0),
    };
  }
}