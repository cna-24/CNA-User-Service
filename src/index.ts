import { Hono } from "hono";
import { initializeDatabase } from "./db";
import register from "./register";

initializeDatabase();

const app = new Hono();

app.route("/register", register);

export default app;
