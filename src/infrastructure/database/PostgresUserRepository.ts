import { eq, asc } from 'drizzle-orm';
import { getDb } from './drizzle';
import { users } from './schema';
import { IUserRepository } from '../../domain/repositories/IUserRepository'
import { User } from '../../domain/entities/User';

export class PostgresUserRepository implements IUserRepository {
    private readonly db = getDb();

    async findById(id: string): Promise<User | null> {
        const [row] = await this.db.select().from(users).where(eq(users.id, id)).limit(1);
        return row ? this.mapToUser(row) : null;
    }

    async findByUsername(username: string): Promise<User | null> {
        const [row] = await this.db.select().from(users).where(eq(users.username, username)).limit(1);
        return row ? this.mapToUser(row) : null;
    }

    async findAll(): Promise<User[]> {
        const rows = await this.db.select().from(users).orderBy(asc(users.username));
        return rows.map((row) => this.mapToUser(row));
    }

    async save(user: User): Promise<void> {
        await this.db.insert(users).values({
            id: user.id,
            username: user.username,
            warnings: user.getWarnings(),
            isBanned: user.isUserBanned(),
        })
            .onConflictDoUpdate({
                target: users.id,
                set: {
                    warnings: user.getWarnings(),
                    isBanned: user.isUserBanned(),
                    updatedAt: new Date(),
                },
            });
    }

    private mapToUser(row: typeof users.$inferSelect): User {
        return new User(row.id, row.username, row.warnings, row.isBanned);
    }
}