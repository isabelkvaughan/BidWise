const faker = require('faker');
const { User, Auction } = require('../models');

// Function to generate a random number within a range
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Function to create fake users
async function createFakeUsers() {
  try {
    // Create 10 fake users
    for (let i = 0; i < 10; i++) {
      await User.create({
        name: faker.name.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    console.log('Fake users created successfully.');
  } catch (error) {
    console.error('Error creating fake users:', error);
  }
}

// Function to create fake auctions made by random users
async function createFakeAuctions() {
  try {
    const users = await User.findAll(); // Get all users

    // Create 10 fake auctions
    for (let i = 0; i < 10; i++) {
      const randomUserIndex = getRandomNumber(0, users.length - 1);
      const randomUser = users[randomUserIndex];

      await Auction.create({
        title: faker.commerce.productName(),
        description: faker.lorem.sentences(),
        startingPrice: getRandomNumber(100, 1000),
        endDate: faker.date.future(),
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: randomUser.id,
      });
    }
    console.log('Fake auctions created successfully.');
  } catch (error) {
    console.error('Error creating fake auctions:', error);
  }
}

// Function to seed the database with fake data
async function seed() {
  await createFakeUsers();
  await createFakeAuctions();
}

// Run the seed function
seed();
