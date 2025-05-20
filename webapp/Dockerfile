# stage1 - build react app first
FROM node:20.17.0-alpine AS builder

ARG NEXT_PUBLIC_LIVEKIT_URL
ARG NEXT_PUBLIC_PASSWORD_PK

# Environment variables
ENV NEXT_PUBLIC_LIVEKIT_URL=wss://mensismentorcertai-n2y8a3k9.livekit.cloud
ENV NEXT_PUBLIC_PASSWORD_PK=1234

WORKDIR /app
RUN apk add --no-cache git

COPY package.json ./
COPY yarn.lock ./
COPY next.config.ts ./
COPY tsconfig.json ./

RUN yarn install --frozen-lockfile

COPY public/ ./public
COPY src/ ./src
COPY lib/ ./lib

RUN CI=true yarn build

# Expose port
EXPOSE 3000

# Start the app
CMD ["yarn", "start"]
# stage 2 - build the final image and copy the react build files
# FROM nginx:1.25-alpine AS server

# COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
# COPY --from=builder ./next/build /usr/share/nginx/html
