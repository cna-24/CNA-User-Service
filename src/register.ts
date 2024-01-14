import { Hono } from "hono";

const register = new Hono();

register.get("/register", (c) =>
    c.json({ message: "Register function still under construction" })
);

export default register;
