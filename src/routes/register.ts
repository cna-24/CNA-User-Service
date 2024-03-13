import { Hono } from "hono";
import db from "../db/db";
import { users } from "../db/schema";
import { HTTPException } from "hono/http-exception";

const register = new Hono();

interface RegisterRequest {
    username: string;
    password: string;
    email: string;
}

register.post("/", async (c) => {
    const { username, email, password }: RegisterRequest = await c.req.json();
    validateRequestData(username, password);

    await createUser(username, email, password);

    return c.json({ message: "Registration successful" }, 201);
});

register.onError((err, c) => {
    if (err instanceof HTTPException) {
        return c.json({ message: err.message }, err.status);
    }
    if (
        err instanceof Error &&
        err.message.includes("UNIQUE constraint failed")
    ) {
        return c.json({ message: "Username already taken" }, 400);
    }

    return c.json({ message: "Internal server error" }, 500);
});

const createUser = async (username: string, email: string, password: string) => {
    const hashedPassword = await hashPassword(password);
    return await db
        .insert(users)
        .values({ username, email, password: hashedPassword });
};

export const hashPassword = async (password: string) => {
    return await Bun.password.hash(password, {
        algorithm: "argon2id",
        memoryCost: 2048, // KiB
        timeCost: 4,
    });
};

const validateRequestData = (username: string, password: string) => {
    if (username.length < 4) {
        throw new HTTPException(400, {
            message: "Username must be at least 4 characters long",
        });
    }
    if (password.length < 8) {
        throw new HTTPException(400, {
            message: "Password must be at least 8 characters long",
        });
    }
};

export default register;
