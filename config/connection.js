const { Sequelize } = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.NODE_ENV === 'test') {
  // For testing environment
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: 'mysql',
      port: process.env.DB_PORT_TEST, // Use port from .env for testing
      logging: false,
    }
  );
} else {
  // For production environment
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: 'mysql',
      port: process.env.PORT, // Use Heroku's assigned port for production
      logging: false,
    }
  );
}

module.exports = sequelize;
