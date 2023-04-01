const express = require("express");
const dot = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const rateLimit = require("./middleware/rateLimiting");
const errorHandler = require("./middleware/error");
const cookie = require("cookie-parser");
const connection = require("./config/db");
const cors = require("cors");
// loading env variables from env
dot.config({ path: "./config/config.env" });
const PORT = process.env.PORT || 5000;

//db connected
connection();
const bootcamps = require("./routes/bootcamps");
const auth = require("./routes/auth");

const app = express();
//using parser
app.use(express.json());

if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}
//mounting middleware
app.use(cors());
app.use(cookie());
app.use(rateLimit);
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/auth", auth);
app.use(errorHandler);

//handler for unhandled errors
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}\nClosing server`.bold.red);
  server.close(() => {
    process.exit(1);
  });
});

const server = app.listen(PORT, () => {
  console.log(
    `The Server is running in ${process.env.NODE_ENV} mode on ${PORT}`.green
  );
});
