FROM node:16.6.0-alpine

USER root

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

CMD ["npm", "start"]
