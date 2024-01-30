import { Hono } from "hono";
import { sign } from "hono/jwt";

const login = new Hono();

const user = {
    username: "admin",
    password: "password",
};

interface LoginRequest {
    username: string;
    password: string;
}

login.post("/login", async (c) => {
    const { username, password }: LoginRequest = await c.req.json();

    if (username === user.username && password === user.password) {
        const token = await sign({ username }, Bun.env.JWT_SECRET);
        return c.json({ message: "Login successful", token: token });
    }

    return c.json({ message: "Invalid credentials" }, 401);
});

export default login;
