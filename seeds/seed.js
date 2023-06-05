const faker = require('faker');
const { User, Auction } = require('../models');
const { google } = require('googleapis');

const serviceAccount = {
  "type": "service_account",
  "project_id": "bidwise",
  "private_key_id": "0dcd364082cb127e67c7af35df93f6402a5e5150",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDC8iAEbvbHKiTS\nXU1J9OhdyL/wH8pn59gDhiv7MExRvZcCDLr5JhYVE+0BLe/Tp9oO0AgHd/McLxiG\n/RsCuEFbQRPEKqaI28EwStrBp1xte2nji7sPuKpXatLUGEFwiu2FyWLvTEj1ie+y\nMT4C8uOatnFf3VWmlims3+PhVGf2Eo7pcdhqyQci3D1g1OvBW+mNxGp27iOY2qjF\nNwQW5XzDDkt85Kcme5EL4/6/nnzcYw5fBbRRUCbi9wJmZ2GibN+c0kHSAcE4Be2S\nNtbtgEsuwDJ3lk5oaryqLuCD0pKrK4nGlGE0f6XwsyV/OlMOnKOaUnN0TSZri3dj\nHvh6mqG7AgMBAAECggEAC1UGi923JkMhimZox2bfYshBccSWLdteqiZZuyb0hVsJ\npz806cqhfGoKCdqVrgVFWhim/bC5Hb4WQLMkTCv2PKKKcvduTiAy/e+Yk6rWQmdG\nYW4JvzNsYcjwizOVeIlAnv30/tUZChDtHymPxlRAD9M15dHGT1Rgl2GrkHBN26SX\nQIKQazRwMqDv+ldgPmu6s9rWOaTOjExOdFG89O3TXWDskQA4SukNM9i8v7+dhmi+\nLd5tOZRSolkj2uPNsX3Yq9bfORlJAWxIx+3TGyVZAZDsxYdbdcdYT7YgpGQLl5YJ\nYgP09lqsaEszoBPCqo3zP5dlvTvGvqlT9PfxIGprDQKBgQDoWmYzv5KK6eLqr6Kd\nqJzHliNkSXAWt569GYMN4ovQ66zIMwxRis21sYcfpiqJFka84qivCricN57udnPW\nqPI5etK4+Q86FwtpKG/xW+nKKl3GsmhZqVxL7VkrLeio5AYVqSYTWT+085lZmiOf\n2jVF8t/pYOHetnTa6Ijx8RzazwKBgQDWySLSWtqPbVOOzlO3RS49rQ0T6VAriMI0\nE92xOWZisToIcPuleUKhVZ1uwU2fF+CUBziAeRyqYoRGkGoAm86u8n73ZQ8qlVTb\nHOomOEj2N0+KKAnFThhust6fNQH8T5ezofcrJaNpB8N1GEguAcRiwiJnIQLdme0G\n6PXpGX0VVQKBgQDNVI26r1HWFqgj0wA2qPmbWu99wXQfbzcFTxVEYO5DuvEenhYF\nvU7agL6zVkmCicALTZXZ0fSggHqfquflS7l62DJ9qgMtx42a6VQ7i4kH0fa7D5At\no//fTSkeglx3W8KQw8DVGmq1AwyCZTeUHOY1IVOETsxr3vtXNGVIwVVJewKBgQDJ\ntLY46g2a6EayM922nQdh8GP5sQATAimvEoD9cDRQtrMTPld0/L2wGWDxpCMrJxdG\nrMlJDXP4JvCl+/UwgSHGdgD6gDOQABFifHMAVZdfcm4GBre2TTLwspYS2Yr10iFb\nFt2x7XTaq+nIy3btjcdKH5qDUyMHzQgllx1pPQCUyQKBgQDgWOTwb8VlW/zZohRj\nGrtauB62+Sh6547NVR1aGAut4phpEUd4dG1C2egA0kR5IBPf3vkB+WXftGMr3EKE\nRQG+2ONjSaqOcQjityM1rCea78m547vVRVBUFtXOAa5xOFMGcblkw7PHqr0pmyzL\ntPpt2WMgWnGUsBO4a1iB1g0b5w==\n-----END PRIVATE KEY-----\n",
  "client_email": "bidwise@bidwise.iam.gserviceaccount.com",
  "client_id": "111973634560350309024",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/bidwise%40bidwise.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
};


// Create a new Google Image API client
const googleImage = google.customsearch({
  version: 'v1',
  auth: new google.auth.JWT(
    serviceAccount.client_email,
    null,
    serviceAccount.private_key,
    ['https://www.googleapis.com/auth/cse']
  )
});

// Function to generate a random number within a range
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Function to search for an image using the Google Image API
async function searchImage(title) {
  try {
    // Extract the last two words from the title
    const titleWords = title.split(' ');
    const lastTwoWords = titleWords.slice(-2).join(' ');

    const res = await googleImage.cse.list({
      cx: '63e6478adcb604240',
      q: lastTwoWords,
      searchType: 'image',
      num: 1
    });
    const imageUrl = res.data.items[0].link;
    return imageUrl;
  } catch (error) {
    console.error('Error searching image:', error);
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
