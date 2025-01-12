const express = require("express");
const carController = require("../controller/carController");
const authenticate = require("../middleware/authenticate");
const checkAdmin = require("../middleware/checkAdmin");

const router = express.Router();

router.post("/", authenticate, checkAdmin, carController.createCar);

// Other car routes
router.get("/", carController.getAllCars);
router.get("/:id", carController.getCarById);
router.put("/:id", authenticate, checkAdmin, carController.updateCar);
router.delete("/:id", authenticate, checkAdmin, carController.deleteCar);

module.exports = router;
