import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { swaggerUI } from "@hono/swagger-ui";

const ParamsSchema = z.object({
    id: z
        .string()
        .min(1)
        .openapi({
            param: {
                name: "id",
                in: "path",
            },
            example: "12",
        }),
});

const HeadersSchema = z.object({
    // Header keys must be in lowercase, `Authorization` is not allowed.
    authorization: z.string().openapi({
        example: "TOKEN",
    }),
});

const UserSchema = z
    .object({
        id: z.string().openapi({
            example: "123",
        }),
        username: z.string().openapi({
            example: "John Doe",
        }),
        email: z.string().openapi({
            example: "blabla@gmail.com",
        }),
        password: z.string().min(8).openapi({
            example: "password123",
        }),
        admin: z.string().openapi({
            example: "False",
        }),
        token: z.string().openapi({}),
    })
    .openapi("User");

const LoginSchema = z.object({
    message: z.string().openapi({
        example: "Login successful",
    }),
    token: z.string().openapi({
        example: "Bearer TOKEN",
    }),
});

const userRoute = createRoute({
    method: "get",
    path: "/user",
    tags: ["User"],
    security: [
        {
            Bearer: [],
        },
    ],
    request: {
        headers: HeadersSchema,
    },
    responses: {
        200: {
            content: {
                "application/json": {
                    schema: UserSchema,
                },
            },
            description: "Retrive all users",
        },
    },
});

const route = createRoute({
    method: "get",
    path: "/user/{id}",
    tags: ["User"],
    security: [
        {
            Bearer: [],
        },
    ],
    request: {
        headers: HeadersSchema,
        params: ParamsSchema,
    },
    responses: {
        200: {
            content: {
                "application/json": {
                    schema: UserSchema,
                },
            },
            description: "Retrieve the user",
        },
        401: {
            description: "Unauthorized",
        },
    },
});

const login = createRoute({
    method: "post",
    path: "/login",
    tags: ["Login"],
    requestBody: {
        description: "Login as a user",
        content: {
            "application/json": {
                example: {
                    username: "JohnDoe",
                    passowrd: "password1234",
                },
            },
        },
    },
    responses: {
        200: {
            description: "Succesfull login",
            content: {
                "application/json": {
                    schema: LoginSchema,
                },
            },
        },
    },
});

const register = createRoute({
    method: "post",
    path: "/register",
    tags: ["Register"],
    requestBody: {
        description: "Register a new user",
        content: {
            "application/json": {
                example: {
                    username: "JohnDoe",
                    email: "blabla@gmail.com",
                    password: "password123",
                },
            },
        },
    },
    responses: {
        200: {
            description: "Registration successful",
            content: {
                "application/json": {
                    schema: z.object({
                        message: z.string().openapi({
                            example: "Registration successful",
                        }),
                    }),
                },
            },
        },
    },
});

const app = new OpenAPIHono();

app.openAPIRegistry.registerComponent("securitySchemes", "Bearer", {
    type: "http",
    scheme: "bearer",
});
app.openapi(register, (c) => {
    return c.json({
        message: "message",
    });
});

app.openapi(login, (c) => {
    return c.json({
        message: "message",
        token: "Token",
    });
});

app.openapi(userRoute, (c) => {
    return c.json({
        id: "1",
        username: "Ultra-man",
        email: "blabla@gmail.com",
        password: "password",
        admin: "False",
        token: "token",
    });
});

app.openapi(route, (c) => {
    const { id } = c.req.valid("param");
    return c.json({
        id,
        username: "Ultra-man",
    });
});
// The OpenAPI documentation will be available at /doc
app.doc("/doc", {
    openapi: "3.0.0",
    info: {
        version: "1.0.0",
        title: "User API",
    },
});

app.get("/ui", swaggerUI({ url: "/swagger/doc" }));

export default app;
