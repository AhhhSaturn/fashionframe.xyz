FROM oven/bun AS build

WORKDIR /app

COPY package.json package.json

RUN bun install

COPY ./src ./src
COPY ./healthcheck.ts ./healthcheck.ts

ENV NODE_ENV=production

RUN bun run build
RUN bun build --compile --minify-whitespace --minify-syntax --outfile healthcheck healthcheck.ts

FROM gcr.io/distroless/base

WORKDIR /app

VOLUME /app/modules

COPY --from=build /app/server server
COPY --from=build /app/healthcheck healthcheck
COPY --from=build /app/package.json package.json

ENV NODE_ENV=production

CMD ["./server"]

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD [ "healthcheck" ]

EXPOSE 3000
