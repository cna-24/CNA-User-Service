/*
 ? Migrate.ts is used to apply or "migrate" any changes made in schema.ts
 ? Remember to run the "generate" script before migrating
 */
import { migrate } from "drizzle-orm/bun-sqlite/migrator";

import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";

const sqlite = new Database("./database/db.sqlite");
const db = drizzle(sqlite);
migrate(db, { migrationsFolder: "./drizzle" });
