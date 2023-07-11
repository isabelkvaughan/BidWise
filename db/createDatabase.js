require('dotenv').config();
const { Sequelize } = require('sequelize');

// Get MySQL credentials from environment variables
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

// Create a Sequelize instance without specifying the database name
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize({
  username: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'mysql',
});
}

// Function to drop the database if it exists
async function dropDatabase() {
  try {
    // Check if the database exists
    const query = `SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '${DB_NAME}'`;
    const [results] = await sequelize.query(query);

    if (results.length !== 0) {
      // Drop the database
      await sequelize.query(`DROP DATABASE ${DB_NAME}`);
      console.log(`Database '${DB_NAME}' dropped successfully.`);
    } else {
      console.log(`Database '${DB_NAME}' does not exist.`);
    }
  } catch (error) {
    console.error('Error dropping database:', error);
  }
}

// Function to create the database
async function createDatabase() {
  try {
    // Create the database
    await sequelize.query(`CREATE DATABASE ${DB_NAME}`);
    console.log(`Database '${DB_NAME}' created successfully.`);
  } catch (error) {
    console.error('Error creating database:', error);
  }
}

// Call the functions to drop and create the database
(async () => {
  try {
    await dropDatabase();
    await createDatabase();
  } catch (error) {
    console.error('Error dropping or creating database:', error);
  } finally {
    // Close the database connection
    await sequelize.close();
  }
})();
