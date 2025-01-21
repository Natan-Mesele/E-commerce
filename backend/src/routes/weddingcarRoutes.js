const express = require("express");
const authenticate = require("../middleware/authenticate");
const checkAdmin = require("../middleware/checkAdmin");
const weddingcarController = require("../controller/weddingcarController");

const router = express.Router();

router.post("/", authenticate, checkAdmin, weddingcarController.createWeddingCar);

// Other wedding car routes
router.get("/", weddingcarController.getAllWeddingCars);
router.get("/:id", weddingcarController.getWeddingCarById);
router.put("/:id", authenticate, checkAdmin, weddingcarController.updateWeddingCar);
router.delete("/:id", authenticate, checkAdmin, weddingcarController.deleteWeddingCar);

module.exports = router;
