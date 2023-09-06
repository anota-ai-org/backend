const { drizzle } = require("drizzle-orm/postgres-js");
const { migrate } = require("drizzle-orm/postgres-js/migrator");
const postgres = require("postgres");

const connectionString = process.env.DATABASE_URL;
const client = postgres(connectionString, { max: 1 });
const db = drizzle(client);

async function migrateNow() {
  await migrate(db, { migrationsFolder: "./src/db/migrations" });
}

migrateNow()
  .then(() => console.log("Migration completed successfully"))
  .catch((err) => console.error("Migration failed: " + err.message + connectionString));
