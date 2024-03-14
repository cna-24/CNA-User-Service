FROM oven/bun:canary-alpine

WORKDIR /app

COPY package.json bun.lockb drizzle.config.ts ./
COPY ./drizzle ./drizzle
COPY ./src ./src
COPY ./database ./database


# Update apk repositories
RUN apk update

# Install Node.js
RUN apk add --update nodejs

# Install dependencies
RUN bun install


CMD bun run db-gen && bun run db-migrate && bun run ./src/server.ts