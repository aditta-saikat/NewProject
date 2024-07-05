const express = require("express");
const router = express.Router();
const farmerController = require("../controllers/farmerController");
const newDealController = require("../controllers/newDealController");

router.post("/create-farmer", farmerController.createFarmer);
console.log("ok");
router.get("/get-farmer/:name", farmerController.findFarmerByName);

router.get("/get-all-farmers", farmerController.showAllFarmers);

// Route to create a new deal (assuming it references framer)
router.post("/create-deal", newDealController.createDeal);
router.get("/get-market-deals", newDealController.getAllMarketDeals);
router.get("/get-card-details/:id", newDealController.getCardDetailsById);
module.exports = router;
