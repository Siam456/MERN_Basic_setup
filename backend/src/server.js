const app = require("./app.js");
const { connectDB } = require("./config/db");

const port = process.env.PORT;

connectDB();

app.listen(port, () => {
  if (process.env.NODE_ENV != "TEST") {
    console.log(`=================================`);
    console.log(`======= ENV: ${process.env.NODE_ENV} =======`);
    console.log(`🚀 App listening on the port ${port}`);
    console.log(`=================================`);
  }
});
