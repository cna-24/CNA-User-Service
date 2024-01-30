// ? db.ts initializes the database and can then be imported in other files

import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";

const sqlite = new Database("db.sqlite");
const db = drizzle(sqlite);

export default db

