const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const config = require("./config");
const routes = require("./routes");
const { notFound } = require("./helpers");

const app = express();
app.set("port", config.APP_PORT);
app.set("host", config.APP_HOST);
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("json spaces", 2);

app.use(
  cors({
    origin: "*",
  })
);
app.use(
  morgan(config.isDev ? "dev" : "combined", {
    skip: (_, res) => res.statusCode < 400,
  })
);

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.use(routes);
app.use(notFound);

module.exports = app;
