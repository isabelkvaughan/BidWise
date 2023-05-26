const express = require('express');
const router = express.Router();
const auctionController = require('../controllers/auctionController');
const userController = require('../controllers/userController');

// Auction routes
router.get('/auctions', auctionController.getAllAuctions);
router.get('/auctions/:id', auctionController.getAuction);
router.post('/auctions', auctionController.createAuction);
router.put('/auctions/:id', auctionController.updateAuction);
router.delete('/auctions/:id', auctionController.deleteAuction);

// User routes
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUser);
router.post('/users', userController.createUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

module.exports = router;
