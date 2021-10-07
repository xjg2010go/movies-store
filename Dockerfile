FROM node:14.17.0

WORKDIR /app

COPY package-lock.json package.json .

RUN npm i --only=prod

COPY index.js dao.js ./

CMD npm start