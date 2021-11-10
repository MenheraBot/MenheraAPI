FROM node:14
WORKDIR /apps
COPY . ./
RUN yarn install
EXPOSE 25156
CMD [ "yarn", "api", "run", "dev" ]
