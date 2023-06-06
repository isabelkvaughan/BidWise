const express = require("express");
const router = express.Router();
const auctionController = require("../controllers/auctionController");
const userController = require("../controllers/userController");
const withAuth = require("../utils/auth");
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: "public/images",
  filename: function (req, file, cb) {
    // Generate a unique filename
    const uniqueFilename = `${Date.now()}_${file.originalname}`;
    cb(null, uniqueFilename);
  },
});
const uploadImage = multer({ storage: storage });

// Auction routes
router.get("/", auctionController.getAllAuctions);
router.get("/auctions/:id", auctionController.getAuction);
// router.get("/newlisting", auctionController.newListing);
router.post(
  "/auctions",
  withAuth,
  uploadImage.single("image"),
  auctionController.createAuction
);
router.put("/auctions/:id", withAuth, auctionController.updateAuction);
router.get("/profile", withAuth, auctionController.getProfile);
router.delete("/auctions/:id", withAuth, auctionController.deleteAuction);
router.post("/auctions/:id/bid", withAuth, auctionController.createBid);

// User routes
router.get("/users", userController.getAllUsers);
router.get("/users/:id", userController.getUser);
router.post("/users", userController.createUser);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);
router.get("/login", userController.getLoginUser);

router.post("/login", userController.loginUser);
router.post("/logout", userController.logoutUser);

module.exports = router;
