const { Auction, User, Bid } = require("../models");

// Controller functions for auction
const getAllAuctions = async (req, res) => {
  try {
    const auctions = await Auction.findAll({
      include: [{ model: User, attributes: ["name", "email"] }],
    });
    // res.status(200).json(auctions);
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
    
    // Check if the logged in user created the auction
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

// Render New Listing form
const newListing = async (req, res) => {
  try {
    res.render("newlisting", { logged_in: req.session.logged_in });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create New Listing
const createAuction = async (req, res) => {
  try {
    const { title, description, startingPrice, endDate } = req.body;
    const userId = req.session.user_id; // Get the user ID from the session
    const auction = await Auction.create({
      title,
      description,
      startingPrice,
      endDate,
      userId,
    });
    res.status(201).json(auction);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateAuction = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, startingPrice, endDate } = req.body;

    await Auction.update(
      { title, description, startingPrice, endDate },
      { where: { id, user_id: req.session.user_id } }
    );
    res.status(200).json({ message: "Auction updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteAuction = async (req, res) => {
  try {
    const { id } = req.params;
    await Auction.destroy({ where: { id, user_id: req.session.user_id } });
    res.status(200).json({ message: "Auction deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Export the controller functions
module.exports = {
  getAllAuctions,
  getAuction,
  newListing,
  createAuction,
  updateAuction,
  deleteAuction,
};
