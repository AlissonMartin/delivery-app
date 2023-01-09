FROM node

WORKDIR /usr/src/app/api

COPY package.json .

RUN npm install

EXPOSE 6001

CMD ["npm", "start"]

COPY . .