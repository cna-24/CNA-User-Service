import db from "../db/db";
import { users } from "../db/schema"
import { hashPassword } from "../routes/register"
import { eq } from "drizzle-orm";


const createAdmin = async (username: string, email: string, password: string) => {

    // Check if any of the parameters are undefined
    if (username === undefined || email === undefined || password === undefined) {
        console.error("Error creating admin user: Missing parameters.");
        return;
    }


    try {
        const isAdmin = await checkAdminExists(username)
        if (!isAdmin) {
            const hashedPassword = await hashPassword(password)
            await db.insert(users).values({
                username: username,
                password: hashedPassword,
                email: email,
                admin: true
            })
            console.log("Created admin user")
        }
    } catch (error) {
        console.error("Error creating admin user:", error)
    }
}

const checkAdminExists = async (username: string) => {
    const [admin] = await db.select({
        username: users.username,
        admin: users.admin
    }).from(users).where(eq(users.username, username))
    return admin && admin.admin === true;
}


export default createAdmin