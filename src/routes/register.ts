import { Context, Hono } from "hono";
import db from "../db/db";
import { users } from "../db/schema";
import HttpError from "../utils/HttpError";

const register = new Hono();

interface RegisterRequest {
    username: string;
    password: string;
}

console.log("Register route registered");

register.post("/", async (c) => {
    console.log("Post request made to /register");
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
    if (error instanceof HttpError) {
        return c.json({ message: error.message }, error.statusCode);
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
        .values({ username, password: hashedPassword })
        .returning({ id: users.id });
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
        throw new HttpError("Username must be at least 4 characters long", 400);
    }
    if (password.length < 8) {
        throw new HttpError("Password must be at least 8 characters long", 400);
    }
};

export default register;
