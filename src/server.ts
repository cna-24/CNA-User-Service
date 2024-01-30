import { Hono } from "hono";
import register from "./routes/register";
import db from "./db/db";
import { sql } from "drizzle-orm";

const query = sql`select "hello world" as text`;
const result = db.get<{ text: string }>(query);
console.log(result);

const app = new Hono();

app.route("/register", register);

export default app;
