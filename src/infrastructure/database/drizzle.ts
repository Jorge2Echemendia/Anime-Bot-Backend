import * as schema from './schema'
import { Pool } from 'pg'
import { drizzle } from 'drizzle-orm/node-postgres'

let pool: Pool | null = null;
let db: ReturnType<typeof drizzle> | null = null;

export function getDb() {
    if (db) return db;

    pool = new Pool({
        connectionString: process.env.Database_Url,
        max: 1,
        idleTimeoutMillis: 10_000,
        connectionTimeoutMillis: 5_000,
    })

    db= drizzle(pool,{schema});
    return db;
}

export function getPool(){
    if(!pool)getDb();
    return pool!;
}

