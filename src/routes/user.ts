import { Hono } from "hono";
import { verify } from "hono/jwt";
import db from "../db/db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import { hashPassword } from "./register";

const user = new Hono();

interface PatchUser {
    email?: string;
    password?: string;
    admin?: boolean;
}

user.get("/", async (c) => {
    const token = c.req.header('Authorization');

    if (!token) {
        return c.json({ message: "Unauthorized" }, 401)
    }

    try {
        const tokenValue = token.split(' ')[1];

        const decoded = await verify(tokenValue, Bun.env.JWT_SECRET)
        if (decoded.admin) {
            const allUsers = await db
                .select({
                    id: users.id,
                    username: users.username
                })
                .from(users)

            if (allUsers) {
                return c.json({ users: allUsers }, 200);
            } else {
                return c.json({ message: "Could not list users" }, 404);
            }
        } else {
            return c.json({ message: "Unauthorized" }, 401);
        }
    } catch (err) {
        return c.json({ message: "Unauthorized" }, 401);
    }
});

user.get("/:id", async (c) => {
    const token = c.req.header('Authorization');

    if (!token) {
        return c.json({ message: "Unauthorized" }, 401)
    }

    try {
        const tokenValue = token.split(' ')[1];

        const decoded = await verify(tokenValue, Bun.env.JWT_SECRET);

        const id = parseInt(c.req.param('id'));
        if (decoded.id === id || decoded.admin) {
            const fetchedUser = await getUserById(id)

            if (fetchedUser) {
                if (fetchedUser.id === id) {
                    return c.json(fetchedUser, 200)
                } else {
                    return c.json({ message: "Unauthorized" }, 401)
                }
            } else {
                return c.json({ message: "User not found" }, 404)
            }
        } else {
            return c.json({ message: "Unauthorized" }, 401)
        }
    } catch (err) {
        return c.json({ message: "Invalid token" }, 401);
    }
});

user.patch("/:id", async (c) => {
    const { email, password, admin }: PatchUser = await c.req.json()
    const token = c.req.header('Authorization');

    if (!token) {
        return c.json({ message: 'Unauthorized' }, 401)
    }

    try {
        const tokenValue = token.split(' ')[1];
        const decoded = await verify(tokenValue, Bun.env.JWT_SECRET);

        const id = parseInt(c.req.param('id'))
        if (decoded.id == id || decoded.admin) {
            const updateData: Partial<{ email: string; password: string, admin: boolean }> = {};
            if (email) updateData.email = email;
            if (password) {
                const hashedPassword = await hashPassword(password)
                updateData.password = hashedPassword;
            }
            if (decoded.admin && admin !== undefined) {
                updateData.admin = admin;
            }
            if (Object.keys(updateData).length > 0) {
                await db.update(users).set(updateData).where(eq(users.id, id))
                return c.json({ message: "Updated user" })
            }
        }
        return c.json({ message: "Unauthorized to update user" }, 401)
    } catch (error) {
        return c.json({ message: "error", error })
    }
})



user.delete("/:id", async (c) => {
    const token = c.req.header('Authorization');

    if (!token) {
        return c.json({ message: "Unauthorized " }, 401)
    }

    try {
        const tokenValue = token.split(' ')[1];
        const decoded = await verify(tokenValue, Bun.env.JWT_SECRET);

        const id = parseInt(c.req.param('id'))
        if (decoded.id === id || decoded.admin) {
            const user = getUserById(id)
            delUser(id)
            return c.json({ message: `Deleted user ${(await user).username} successfully`, id: (await user).id, username: (await user).username })
        } else {
            return c.json({ message: "Unauthorized" }, 401)
        }
    } catch (err) {
        return c.json({ message: "Invalid token" }, 401)
    }
});

const delUser = async (userId: number) => {
    await db.delete(users)
        .where(eq(users.id, userId))
}

const getUserById = async (userId: number) => {
    const [user] = await db
        .select({
            id: users.id,
            username: users.username,
            admin: users.admin
        })
        .from(users)
        .where(eq(users.id, userId))

    return user;
}
export default user;