const Auction = require('./auction');
const Bid = require('./bid');
const User = require('./user');

// Define associations between models
User.hasMany(Auction, { foreignKey: 'userId' });
Auction.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Bid, { foreignKey: 'userId' });
Bid.belongsTo(User, { foreignKey: 'userId' });
Auction.hasMany(Bid, { foreignKey: 'auctionId' });
Bid.belongsTo(Auction, { foreignKey: 'auctionId' });

// Export models
module.exports = {
  Auction,
  Bid,
  User,
};
