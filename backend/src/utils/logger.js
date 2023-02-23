const winston = require("winston");
require("winston-mongodb");
const expressWinston = require("express-winston");
require("winston-daily-rotate-file");
const fs = require("fs");
const { Client } = require("es6");
const winston_elasticsearch = require("winston-elasticsearch");

const logDir = __dirname + "/../logs";

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logFormat = winston.format.printf(
  ({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`
);

const getMessage = (req, res) => {
  let obj = {
    correlationId: req.headers["x-correlation-id"],
    requestBody: req.body,
  };

  return JSON.stringify(obj);
};

const client = new Client({
  level: "info",
  node: process.env.ELASTIC_SEARCH_LOGGING_URL,
});

const esTransportOpts = {
  dataStream: true,
  indexSuffixPattern: "YYYY.MM.DD",

  // clientOpts: { node: process.env.ELASTIC_SEARCH_LOGGING_URL },
  client: client,
  type: "console",
  indexPrefix: "log-siam",
};

let esTransport = new winston_elasticsearch(esTransportOpts);

const mongoErrorTransport = (uri) =>
  new winston.transports.MongoDB({
    db: uri,
    metaKey: "meta",
    options: { useUnifiedTopology: true },
  });

const infoLogger = () =>
  expressWinston.logger({
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.splat(),
          winston.format.colorize()
        ),
      }),
      new winston.transports.DailyRotateFile({
        level: "debug",
        datePattern: "YYYY-MM-DD",
        dirname: logDir + "/debug", // log file /logs/debug/*.log in save
        filename: `%DATE%.log`,
        maxFiles: 30, // 30 Days saved
        json: false,
        zippedArchive: true,
      }),
      esTransport,
    ],
    format: winston.format.combine(
      // winston.format.colorize(),
      winston.format.json()
    ),
    dirname: logDir + "/debug",
    meta: false,
    msg: getMessage,
  });

const errorLogger = () =>
  expressWinston.errorLogger({
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.splat(),
          winston.format.colorize()
        ),
      }),
      // error log setting
      new winston.transports.DailyRotateFile({
        level: "error",
        datePattern: "YYYY-MM-DD",
        dirname: logDir + "/error", // log file /logs/error/*.log in save
        filename: `%DATE%.log`,
        maxFiles: 30, // 30 Days saved
        handleExceptions: true,
        json: false,
        zippedArchive: true,
      }),
      mongoErrorTransport(process.env.MONGO_URI),
      esTransport,
    ],
    format: winston.format.combine(
      // winston.format.colorize(),
      winston.format.json()
    ),
    meta: true,
    msg: '{ "correlationId": "{{req.headers["x-correlation-id"]}}", "error": "{{err.message}}" }',
  });

const stream = {
  write: (message) => {
    if (process.env.NODE_ENV !== "TEST")
      console.log(message.substring(0, message.lastIndexOf("\n")));
  },
};

module.exports = { infoLogger, errorLogger, stream };
