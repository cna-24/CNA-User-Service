import { Hono } from "hono";
import { cors } from "hono/cors";
import register from "./routes/register";
import login from "./routes/login";
import swagger from "./routes/swagger";
import user from "./routes/user";
import createAdmin from "./middleware/adminMiddleware";

if (!Bun.env.JWT_SECRET) {
    console.error("\x1b[31m%s\x1b[0m", "Error JWT_SECRET is not set");
    process.exit(0);
}

const ALLOWED_ORIGINS = Bun.env.ALLOWED_ORIGINS
    ? Bun.env.ALLOWED_ORIGINS.split(",")
    : [];

if (!ALLOWED_ORIGINS.length) {
    console.warn(
        "\x1b[33m%s\x1b[0m",
        "No CORS origin is set, this could be an issue"
    );
}



const app = new Hono();
(async () => {
    try {
        if (Bun.env.ADMIN_USERNAME && Bun.env.ADMIN_EMAIL && Bun.env.ADMIN_PASSWORD) {
            await createAdmin(Bun.env.ADMIN_USERNAME, Bun.env.ADMIN_EMAIL, Bun.env.ADMIN_PASSWORD)
        } else {
            console.error("Error creating admin user: Missing parameters.")
        }

    } catch (error) {
        console.error("error creating Admin user:", error)
    }
})();


app.use(
    "*",
    cors({
        origin: ALLOWED_ORIGINS,
        allowMethods: ["GET", "POST", "DELETE", "PATCH"],
    })
);

app.route("/swagger", swagger);
app.route("/register", register);
app.route("/login", login);
app.route("/user", user);

export default app;

