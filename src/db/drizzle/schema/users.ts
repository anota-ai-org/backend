import { index, pgTable, uuid, varchar, timestamp } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const users = pgTable('users', {
  id: uuid('uuid').default(sql`gen_random_uuid()`).notNull().primaryKey(),
  fullName: varchar('full_name').notNull(),
  username: varchar('username').notNull(),
  phone: varchar('phone', { length: 60 }).notNull(),
  email: varchar('email', { length: 254 }).notNull(), // Why 254 in length? https://stackoverflow.com/a/1199238
  password: varchar('password', { length: 60 }).notNull(), // Why 60 varchar? https://forums.phpfreaks.com/topic/293405-recommended-sql-datatype-for-bcrypt-hash/#comment-1500831
  createdAt: timestamp('created_at', { withTimezone: true, mode: "date" }).default(sql`(now() at time zone 'utc')`).notNull(), // Why "with timezone"? https://stackoverflow.com/a/20713587
  updatedAt: timestamp('updated_at', { withTimezone: true, mode: "date" }).default(sql`(now() at time zone 'utc')`).notNull(),
}, (users) => ({
  idIdx: index('id_idx').on(users.id),
}));