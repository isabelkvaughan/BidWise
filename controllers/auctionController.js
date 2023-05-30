const { Auction, User, Bid } = require("../models");

// Controller functions for auctions
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

const getAuction = async (req, res) => {
  try {
    const { id } = req.params;
    const auction = await Auction.findByPk(id, {
      include: [{ model: User, attributes: ["name", "email"] }],
    });

    if (!auction) {
      return res.status(404).json({ error: "Auction not found" });
    }

    //res.status(200).json(auction);
    const individualAuction = auction.get({ plain: true });
    res.render("auction", {
      individualAuction,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createAuction = async (req, res) => {
  try {
    const { title, description, startingPrice, endDate, userId } = req.body;
    const auction = await Auction.create({
      title,
      description,
      startingPrice,
      endDate,
      userId,
      user_id: req.session.user_id,
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
  createAuction,
  updateAuction,
  deleteAuction,
};
