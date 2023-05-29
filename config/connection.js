const { Sequelize } = require("sequelize");
require("dotenv").config();

let sequelize;

if (process.env.NODE_ENV === "test") {
  // For testing environment
  sequelize = new Sequelize("bidwise_db", "root", null, {
    host: "localhost",
    dialect: "mysql",
    port: 3306, // Use port from .env for testing
    logging: false,
  });
} else {
  // For production environment
  sequelize = new Sequelize("bidwise_db", "root", null, {
    host: "localhost",
    dialect: "mysql",
    port: 3306, // Use Heroku's assigned port for production
    logging: false,
  });
}

module.exports = sequelize;
