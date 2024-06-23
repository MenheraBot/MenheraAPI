FROM node:16.6.0-alpine as builder
USER root
WORKDIR /app
COPY package.json yarn.lock ./
COPY tsconfig.json ./
COPY prisma ./prisma
RUN yarn --frozen-lockfile
COPY . .
RUN yarn build
RUN rm -rf node_modules
RUN mv docker/.yarnclean .yarnclean
RUN yarn install --production
RUN yarn autoclean --force

FROM node:16.6.0-alpine
USER api
WORKDIR /app
COPY --from=builder /app/dist ./
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 25156
LABEL org.opencontainers.image.description An HTTP API to help MenheraBot
CMD ["node", "server.js"]
