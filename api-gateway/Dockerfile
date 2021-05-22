FROM node:alpine3.11

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --loglevel verbose

COPY . .

CMD ["npm", "start"]
