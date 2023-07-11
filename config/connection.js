const { Sequelize } = require("sequelize");
require("dotenv").config();

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: "mysql",
  port: process.env.DB_PORT,
  logging: false,
});
}

module.exports = sequelize;

// This will default to port 3000 when launching server.js, .env file should have "DB_PORT=3306" for db and table creation for testing locally
// Please use an env file (with a null password if you don't use one) instead of hard coding credentials here

/*

DB_NAME=bidwise_db
DB_USER=<username>
DB_PASSWORD=null
DB_HOST=localhost
DB_PORT=3306

*/