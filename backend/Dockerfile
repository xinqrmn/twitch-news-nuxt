FROM node:lts-alpine

WORKDIR /app

RUN rm -rf node_modules

COPY package.json package-lock.json ./

RUN npm install --pure-lockfile

COPY . .

RUN npm run build

EXPOSE 9000

CMD [ "npm", "run", "start:prod" ]
