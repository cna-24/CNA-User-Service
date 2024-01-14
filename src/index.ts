import { Hono } from "hono";
import login from "./login";
import register from "./register";

const app = new Hono();

app.route("/users", login);
app.route("/users", register);

export default app;
