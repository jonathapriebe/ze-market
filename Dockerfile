FROM node:7.7.2-alpine
WORKDIR /usr/app
COPY package.json .
COPY .env .
RUN yarn install --quiet
COPY . .