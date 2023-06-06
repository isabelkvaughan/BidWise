const faker = require("faker");
const { User, Auction } = require("../models");
const { google } = require("googleapis");

const serviceAccount = {
  type: process.env.TYPE,
  project_id: process.env.PROJECT_ID,
  private_key_id: process.env.PRIVATE_KEY_ID,
  private_key: process.env.PRIVATE_KEY,
  client_email: process.env.CLIENT_EMAIL,
  client_id: process.env.CLIENT_ID,
  auth_uri: process.env.AUTH_URI,
  token_uri: process.env.TOKEN_URI,
  auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
  universe_domain: process.env.UNIVERSE_DOMAIN,
};

// Create a new Google Image API client
const googleImage = google.customsearch({
  version: "v1",
  auth: new google.auth.JWT(
    serviceAccount.client_email,
    null,
    serviceAccount.private_key,
    ["https://www.googleapis.com/auth/cse"]
  ),
});

// Function to generate a random number within a range
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Function to search for an image using the Google Image API
async function searchImage(title) {
  try {
    // Extract the last two words from the title
    const titleWords = title.split(" ");
    const lastTwoWords = titleWords.slice(-2).join(" ");

    const res = await googleImage.cse.list({
      cx: "63e6478adcb604240",
      q: lastTwoWords,
      searchType: "image",
      num: 1,
    });
    const imageUrl = res.data.items[0].link;
    return imageUrl;
  } catch (error) {
    console.error("Error searching image:", error);
    return null;
  }
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
    console.log("Fake users created successfully.");
  } catch (error) {
    console.error("Error creating fake users:", error);
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

      const title = faker.commerce.productName();
      const imageUrl = await searchImage(title);

      await Auction.create({
        title: title,
        description: faker.lorem.sentences(),
        startingPrice: getRandomNumber(100, 1000),
        endDate: faker.date.future(),
        imageUrl: imageUrl,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: randomUser.id,
      });
    }
    console.log("Fake auctions created successfully.");
  } catch (error) {
    console.error("Error creating fake auctions:", error);
  }
}

// Function to seed the database with fake data
async function seed() {
  await createFakeUsers();
  await createFakeAuctions();
}

// Run the seed function
seed();
