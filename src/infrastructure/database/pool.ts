import { Pool } from 'pg';

let pool: Pool | null = null;

export function getPool(): Pool {
    if (!pool) {
        pool = new Pool({
            connectionString: process.env.DATABASE_URL,
            max: 1,
            idleTimeoutMillis: 10_000,
            connectionTimeoutMillis: 5_000,
        });
    }
    return pool;
}