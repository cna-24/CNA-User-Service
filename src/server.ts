import { Hono } from "hono";
import register from "./routes/register";
import db from "./db/db";
import { sql } from "drizzle-orm";
import login from "./routes/login";
import swagger from "./routes/swagger"
import user from "./routes/user";


const query = sql`select "hello world" as text`;
const result = db.get<{ text: string }>(query);
console.log(result);

const app = new Hono();


app.route("/swagger", swagger)
app.route("/register", register);
app.route("/login", login);
app.route("/user", user);

export default app;
