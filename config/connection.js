const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: "mysql",
  port: process.env.DB_PORT,
  logging: false,
});

module.exports = sequelize;

// This will default to port 3000 when launching server.js, .env file should have "DB_PORT=3306" for db and table creation for testing locally