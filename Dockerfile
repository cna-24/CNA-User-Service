FROM oven/bun:canary-alpine

WORKDIR /app

COPY package.json bun.lockb drizzle.config.ts ./
COPY ./drizzle ./drizzle
COPY ./src ./src
COPY ./database ./database

RUN bun install
RUN bun run db-migrate

CMD bun run ./src/server.ts