const envalid = require("envalid");
require("dotenv").config({
  path: ".env",
});

const { str, num } = envalid;

module.exports = envalid.cleanEnv(process.env, {
  APP_HOST: str({ default: "127.0.0.1" }),
  APP_PORT: num({ default: 3000 }),
  NODE_ENV: str({
    choices: ["development", "production"],
    default: "development",
  }),
});
