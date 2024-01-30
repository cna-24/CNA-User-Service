/*
 ? Migrate.ts is used to apply or "migrate" any changes made in schema.ts
 ? Remember to run the "generate" script before migrating
 */

import { migrate } from "drizzle-orm/bun-sqlite/migrator";

import db from "./db";
migrate(db, { migrationsFolder: "./drizzle" });
