require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

// Get MySQL credentials from environment variables
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

// Create a Sequelize instance
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'mysql',
});

// Define the User model
const User = sequelize.define('User', {
  // Define the user model attributes
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Define the Auction model
const Auction = sequelize.define('Auction', {
  // Define the auction model attributes
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  startingPrice: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

// Define the relationship between User and Auction
User.hasMany(Auction);
Auction.belongsTo(User);

// Synchronize the models with the database and create the tables
sequelize
  .sync()
  .then(() => {
    console.log('Database tables created successfully');
  })
  .catch((error) => {
    console.error('Error creating database tables:', error);
  });
