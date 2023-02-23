# POC_nodejs_advance

A basic crud application Express.

## Setup

To setup and run you need to download or clone the project. Then, you can run the project both manually and using Docker.

- ### Docker
  You need `docker` installed in your system. Go to root directory of the project and run `docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d`. The application will up and running after completing task.
- ### Manual Setup
  - Run `npm install` then `npm run dev` to run in development mode or `npm start` to run production.

After completing the setup browse `http://localhost:3000` for backend.

## Tech Stack

- `express@4`

## Documentation

Swagger documentation is not completed yet. Instead you can use `Rest Client` extention of `VSCode`.

## Testing

To test backend apis run `npm run test`.

## Features

- User curd
