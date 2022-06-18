FROM node:16.6.0-alpine as installer
USER root
WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:16.6.0-alpine as compiler
WORKDIR /app
COPY --from=installer /app/package*.json ./
COPY --from=installer /app/dist ./
RUN npm install --production

FROM gcr.io/distroless/nodejs:16
WORKDIR /app
COPY --from=compiler /app ./
USER 1000
EXPOSE 25156
LABEL org.opencontainers.image.description An HTTP API to help MenheraBot
CMD ["server.js"]
