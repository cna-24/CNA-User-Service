import { Context, Hono } from "hono";
import db from "../db/db";
import { users } from "../db/schema";
import { HTTPException } from "hono/http-exception";

const register = new Hono();

interface RegisterRequest {
    username: string;
    password: string;
}

register.post("/", async (c) => {
    try {
        const { username, password }: RegisterRequest = await c.req.json();
        validateRequestData(username, password);

        await createUser(username, password);

        return c.json({ message: "Registration successful" }, 200);
    } catch (error) {
        return handleRegistrationError(c, error);
    }
});

const handleRegistrationError = (c: Context, error: unknown) => {
    if (error instanceof HTTPException) {
        return error.getResponse();
    }
    if (
        error instanceof Error &&
        error.message.includes("UNIQUE constraint failed")
    ) {
        return c.json("Username already taken", 400);
    }
    return c.json({ message: "Internal server error" }, 500);
};

const createUser = async (username: string, password: string) => {
    const hashedPassword = await hashPassword(password);
    return await db
        .insert(users)
        .values({ username, password: hashedPassword });
};

const hashPassword = async (password: string) => {
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
