import { pgTable, text, uuid } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
  id: uuid('id').notNull().primaryKey(),
  email: text('email').notNull().unique()
});
