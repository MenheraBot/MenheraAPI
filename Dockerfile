FROM node:16.6.0-alpine

USER root

WORKDIR /app

COPY . .

RUN npm install

RUN npx prisma generate

RUN npm run build

EXPOSE 25156

CMD ["npm", "start"]
