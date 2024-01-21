// Interface merging so that .env variables get global type information
declare module "bun" {
    interface Env {
        JWT_SECRET: string;
    }
}

export interface User {
    id: number;
    username: string;
    password: string;
}
