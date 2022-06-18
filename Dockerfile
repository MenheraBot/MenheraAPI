FROM node:16.6.0-alpine as installer
USER root
WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./
COPY prisma ./prisma
RUN npm install
COPY . .
RUN npm run build

FROM node:16.6.0-alpine as compiler
USER root
WORKDIR /app
COPY --from=installer /app/package*.json ./
COPY --from=installer /app/dist ./
COPY --from=installer /app/prisma ./prisma
RUN npm install --production
RUN npm install -g prisma
RUN npx prisma generate

FROM gcr.io/distroless/nodejs:16
WORKDIR /app
COPY --from=compiler /app ./
USER 1000
EXPOSE 25156
LABEL org.opencontainers.image.description An HTTP API to help MenheraBot
CMD ["server.js"]
