import { Hono } from "hono";
import { db } from "./db";
import type { User } from "./global";

const register = new Hono();

register.post("/register", async (c) => {
    const { username, password } = await c.req.json();

    if (await isUsernameTaken(username)) {
        return c.json({ message: "User already exists" }, 409);
    }

    await createUser(username, password);

    const user = await getUserByUsername(username);
    if (!user) {
        return c.json({ message: "Registration failed" }, 500);
    }

    return c.json({ message: "Registration successful", userId: user.id });
});

const isUsernameTaken = async (username: string): Promise<boolean> => {
    const existingUser = await getUserByUsername(username);
    return !!existingUser;
};

const createUser = async (username: string, password: string) => {
    const hashedPassword = await hashPassword(password);
    db.query("INSERT INTO users (username, password) VALUES (?1, ?2)").run(
        username,
        hashedPassword
    );
};

const hashPassword = async (password: string) => {
    return await Bun.password.hash(password, {
        algorithm: "argon2id",
        memoryCost: 4, // kibibytes
        timeCost: 3,
    });
};

const getUserByUsername = async (username: string): Promise<User | null> => {
    return (await db
        .query("SELECT id FROM users WHERE username = ?1")
        .get(username)) as User;
};


export default register