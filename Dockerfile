FROM node:20.17.0-alpine AS base

RUN apk add --no-cache curl bash

ENV BUN_INSTALL="/root/.bun"
ENV PATH="${BUN_INSTALL}/bin:$PATH"
ENV BUN_VERSION="1.2.11"

RUN curl -fsSL https://bun.sh/install | bash && \
    ${BUN_INSTALL}/bin/bun --version

WORKDIR /app

COPY package.json bun.lockb ./

RUN bun install

COPY . .

RUN bun run build

EXPOSE 3000

CMD ["bun", "run", "start"]
