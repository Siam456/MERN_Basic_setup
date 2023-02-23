FROM node:16
WORKDIR /app/server
COPY package.json .

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
        then npm i; \
        else npm i --production; \
        fi
COPY . ./
EXPOSE 3030
CMD ["npm", "run", "dev"]
