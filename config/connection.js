const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize("bidwise_db", "root", null, {
  host: "localhost",
  dialect: "mysql",
  port: 3306,
  logging: false,
});

module.exports = sequelize;

// This will default to port 3000 when launching server.js, .env file should have "DB_PORT=3306" for db and table creation for testing locally
