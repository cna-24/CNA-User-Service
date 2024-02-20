import { Hono } from "hono";
import register from "./routes/register";
import db from "./db/db";
import { sql } from "drizzle-orm";
import login from "./routes/login";
import swagger from "./routes/swagger";
import user from "./routes/user";

if (!Bun.env.JWT_SECRET) {
    // ANSI escape code to color the output red
    console.error("\x1b[31m%s\x1b[0m", "Error JWT_SECRET is not set");
    process.exit(0);
}

const query = sql`select "hello world" as text`;
const result = db.get<{ text: string }>(query);
console.log(result);

const app = new Hono();

app.route("/swagger", swagger);
app.route("/register", register);
app.route("/login", login);
app.route("/user", user);

export default app;
