const express = require("express");
const authenticate = require("../middleware/authenticate");
const router = express.Router();
const reviewController = require('../controller/reviewController');

router.post("/:userId/reviews", authenticate, reviewController.addReview);
router.get("/:userId/reviews", authenticate, reviewController.getReviews);
router.put("/:userId/reviews", authenticate, reviewController.updateReview);
router.delete("/:userId/reviews/:carId", authenticate, reviewController.deleteReview);

module.exports = router;
