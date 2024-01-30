// ? Migrate.ts is used to apply or "migrate" any changes made in schema.ts

import { migrate } from "drizzle-orm/bun-sqlite/migrator";

import db from "./db";
migrate(db, { migrationsFolder: "./drizzle" });
