FROM node:21

WORKDIR /usr/src/app

COPY package*.json .
COPY app .

RUN npm install

EXPOSE 3000
