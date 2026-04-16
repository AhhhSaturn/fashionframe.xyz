FROM oven/bun AS build

WORKDIR /app

COPY package.json package.json

RUN bun install

COPY ./src ./src

ENV NODE_ENV=production

RUN bun run build

FROM gcr.io/distroless/base

WORKDIR /app

VOLUME /app/modules

COPY --from=build /app/server server
COPY --from=build /app/package.json package.json

ENV NODE_ENV=production

CMD ["./server -s"]

EXPOSE 3000
