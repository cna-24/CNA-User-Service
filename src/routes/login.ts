import { Hono } from "hono";
import { sign } from "hono/jwt";
import db from "../db/db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";

const login = new Hono();

interface LoginRequest {
    username: string;
    password: string;
}

login.post("/", async (c) => {
    const { username, password }: LoginRequest = await c.req.json();

    const user = await getUser(username);

    if (user && (await isMatch(password, user.password))) {
        const token = await sign(username, Bun.env.JWT_SECRET);
        return c.json({ message: "Login successful", token: token }, 200);
    }

    return c.json({ message: "Invalid credentials" }, 401);
});

const getUser = async (username: string) => {
    const [user] = await db
        .select()
        .from(users)
        .where(eq(users.username, username));
    return user;
};

const isMatch = async (password: string, hash: string) => {
    return await Bun.password.verify(password, hash);
};

export default login;
