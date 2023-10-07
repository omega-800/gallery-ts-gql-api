FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8090
EXPOSE 5433

CMD ["npm","run","start"]
