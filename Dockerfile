FROM oven/bun:canary-alpine

WORKDIR /app

# Copy package files to /app
COPY package.json bun.lockb drizzle.config.ts ./
COPY ./drizzle ./drizzle

# Copy the source code to /app/src
COPY ./src ./src

RUN bun install
RUN bun run db-gen
RUN bun run db-migrate

CMD bun run ./src/server.ts