const Sequelize = require("sequelize");
const pkg = require("../../package.json");
require("dotenv").config();

const databaseName =
  pkg.name + (process.env.NODE_ENV === "test" ? "-test" : "");

const config = {
  logging: false,
};

if (process.env.LOGGING === "true") {
  delete config.logging;
}

//https://stackoverflow.com/questions/61254851/heroku-postgres-sequelize-no-pg-hba-conf-entry-for-host
if (process.env.DATABASE_URL) {
  config.dialectOptions = {
    ssl: {
      rejectUnauthorized: false,
    },
  };
}

// local db
// const db = new Sequelize(
//   process.env.DATABASE_URL ||
//     `postgres://localhost:5432/graceshopper-project-test`,
//   config
// );
// module.exports = db;

// deploy db
const db = new Sequelize(process.env.DATABASE_URL, config);
module.exports = db;
