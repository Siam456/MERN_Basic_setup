FROM node:16

WORKDIR /app/client
COPY package.json .

RUN npm i;
COPY . ./

EXPOSE 3000
CMD ["npm", "start"]
