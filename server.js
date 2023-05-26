const express = require('express');
const { Sequelize } = require('sequelize');
const routes = require('./controllers/routes');
const sequelize = require('./config/connection');
const app = express();
const PORT = process.env.PORT || process.env.DB_PORT || 3000;

// Load environment variables from .env file
require('dotenv').config();

// Set the environment variable
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

// Test the database connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');

    // Synchronize Sequelize models with the database
    await sequelize.sync();
    console.log('Sequelize models synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

// Middleware
app.use(express.json()); // JSON middleware for JSON payloads in request body

// Routes
app.use('/', routes);

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// Increase server timeout
server.setTimeout(30000); // Set the timeout value in milliseconds (e.g., 30 seconds)
