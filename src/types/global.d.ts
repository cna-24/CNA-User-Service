// ? Interface merging so that .env variables get global type information

// Add any new .env variables here for proper typing using typescript
declare module "bun" {
    interface Env {
        JWT_SECRET: string;
    }
}