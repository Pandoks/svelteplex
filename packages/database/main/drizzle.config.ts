import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './main/schema/*.sql.ts',
  dialect: 'postgresql',
  out: './main/migrations',
  dbCredentials: {
    url: process.env.DATABASE_URL!
  },
  strict: true,
  verbose: true
});
