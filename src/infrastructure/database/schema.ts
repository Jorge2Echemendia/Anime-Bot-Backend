import { pgTable,varchar,integer,boolean,timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id:varchar("id",{length:64}).primaryKey(),
    username:varchar("username",{length:255}).notNull().unique(),
    warnings:integer("warnings").notNull().default(0),
    isBanned:boolean('is_banned').notNull().default(false),
    createdAt:timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
})

export type UserRow=typeof users.$inferSelect;
export type NewUserRow =typeof users.$inferInsert;