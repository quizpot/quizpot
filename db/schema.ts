import { pgTable, integer, varchar, timestamp, boolean } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),

  icon: varchar('icon', { length: 40 }).notNull(),
  nickname: varchar('nickname', { length: 32 }).notNull(),
  username: varchar('username', { length: 32 }).notNull().unique(),
  email: varchar('email', { length: 320 }).notNull().unique(),
  pwHash: varchar('pw_hash', { length: 60 }).notNull(),
  color: varchar('color', { length: 7 }).notNull(),
  isAdmin: boolean('is_admin').notNull().default(false),

  createdAt: timestamp('created_at').defaultNow().notNull(),
});