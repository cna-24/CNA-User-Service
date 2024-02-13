import { Hono } from "hono";
import { sign } from "hono/jwt";
import db from "../db/db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";


const user = new Hono();


// TODO: implement JWT to check that only a admin/logged in user is able to get the information
user.get("/:id", async (c) => {
    const id = parseInt(c.req.param('id'))
    const user = await getUserById(id)

    if (user) {
        return c.json(user, 200)
    } else {
        return c.json({ message: "User not found" }, 404)
    }
});

const getUserById = async (userId: number) => {
    const [user] = await db
        .select()
        .from(users)
        .where(eq(users.id, userId))

    if (user) {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword
    } else {
        return null;
    }
}

export default user;