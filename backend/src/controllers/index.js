const routes = require("./routes");

const configure = (app) => {
  app.use("/api", routes);
};

module.exports = configure;
