const express = require("express");
const { infoLogger, errorLogger, stream } = require("./utils/logger.js");
const morgan = require("morgan");
const dotenv = require("dotenv");
const swaggerUI = require("swagger-ui-express");
const { setup } = require("swagger-ui-express");

dotenv.config();
// console.log(process.env.ELASTIC_SEARCH_LOGGING_URL);
const app = express();
app.use(express.json());

//internal export
const configureRoutes = require("./controllers");
const { handleErrors } = require("./middlewares/handleErrors.js");
const { processRequest } = require("./middlewares/index.js");

app.use(processRequest);
if (process.env.NODE_ENV != "TEST") app.use(infoLogger());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms", {
    stream,
  })
);
configureRoutes(app);

if (process.env.NODE_ENV != "TEST") app.use(errorLogger());
app.use(handleErrors);

const swaggerDocument = require(`./swagger.json`);
app.use("/api-docs", swaggerUI.serve, setup(swaggerDocument));

module.exports = app;
