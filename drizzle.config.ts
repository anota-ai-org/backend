import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/drizzle/schema/*",
  driver: "pg",
  out: "./src/db/migrations",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL as string,
  }
} satisfies Config;