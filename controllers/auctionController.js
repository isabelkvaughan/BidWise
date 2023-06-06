const { Auction, User, Bid } = require("../models");
const path = require("path");
const fs = require("fs");

// Controller functions for auction
const getAllAuctions = async (req, res) => {
  try {
    const auctions = await Auction.findAll({
      include: [{ model: User, attributes: ["name", "email"] }],
    });

    const allAuctions = auctions.map((data) => data.get({ plain: true }));

    res.render("homepage", { allAuctions, logged_in: req.session.logged_in });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a single auction
const getAuction = async (req, res) => {
  try {
    const { id } = req.params;
    const auction = await Auction.findByPk(id, {
      include: [{ model: User, attributes: ["name", "email"] }],
    });
    if (!auction) {
      return res.status(404).json({ error: "Auction not found" });
    }
    const individualAuction = auction.get({ plain: true });
    const userId = req.session.user_id;
    const isOwner = individualAuction.userId === userId;
    res.render("auction", {
      individualAuction,
      logged_in: req.session.logged_in,
      isOwner,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getProfile = async (req, res) => {
  try {
    const userId = req.session.user_id;
    const userData = await User.findByPk(userId, {
      attributes: { exclude: ["password"] },
      include: [{ model: Auction }],
    });
    const user = userData.get({ plain: true });
    const userAuctions = user.auctions;
    res.render("profile", {
      user: user,
      userAuctions: userAuctions,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

// Create New Listing
const createAuction = async (req, res) => {
  try {
    const { title, description, startingPrice, endDate } = req.body;
    const userId = req.session.user_id; // Get the user ID from the session

    const imageFile = req.file;
    //console.log("imageFile ", imageFile);
    if (!imageFile) {
      // Handle the case when no image file is uploaded
      return res.status(400).json({ error: "No image file provided" });
    }
    // Generate a unique filename for the image
    const uniqueFilename = `${Date.now()}_${imageFile.originalname}`;
    const uploadPath = path.join(
      __dirname,
      "..",
      "public",
      "images",
      uniqueFilename
    );

    fs.renameSync(imageFile.path, uploadPath);

    const auction = await Auction.create({
      title,
      description,
      startingPrice,
      endDate,
      userId,
      imageUrl: uniqueFilename,
    });
    res.status(201).json(auction);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateAuction = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, startingPrice, endDate } = req.body;
    const userId = req.session.user_id;
    const auctionData = await Auction.findOne({
      where: {
        id: id,
        userId: userId, // Ensure that only the owner of the auction can update it
      },
    });
    const auction = auctionData.get({ plain: true });
    if (!auction) {
      return res.status(404).json({ error: "Auction not found" });
    }
    // Update the auction record with the new values
    auction.title = title;
    auction.description = description;
    auction.startingPrice = startingPrice;
    auction.endDate = endDate;
    console.log("auction PUT:", auction);

    await Auction.update(auction, { where: { id: req.params.id } });
    res.status(200).json({ message: "Auction updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteAuction = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.session.user_id;
    // Find the auction to be deleted
    const auction = await Auction.findOne({
      where: {
        id: id,
        userId: userId, // Ensure that only the owner of the auction can delete it
      },
    });

    if (!auction) {
      return res.status(404).json({ error: "Auction not found" });
    }
    // Delete the auction
    await auction.destroy();
    res.status(200).json({ message: "Auction deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createBid = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount } = req.body;
    const userId = req.session.user_id;

    // Find the auction
    const auction = await Auction.findByPk(id);

    if (!auction) {
      return res.status(404).json({ error: "Auction not found" });
    }

    // Get the highest existing bid for the auction
    const highestBid = await Bid.findOne({
      where: { auctionId: id },
      order: [["amount", "DESC"]],
    });

    // Validate bid amount
    if (highestBid && amount <= highestBid.amount) {
      return res
        .status(400)
        .json({ error: "Bid must be higher than the current highest bid" });
    }

    // Create the bid
    const bid = await Bid.create({
      auctionId: id,
      userId,
      amount,
    });

    // Update the individualAuction startingPrice with the new bid amount
    auction.startingPrice = amount;

    // Save the updated individualAuction
    await auction.save();

    res.status(201).json(bid);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Export the controller functions
module.exports = {
  getAllAuctions,
  getAuction,
  getProfile,
  createAuction,
  updateAuction,
  deleteAuction,
  createBid,
};
