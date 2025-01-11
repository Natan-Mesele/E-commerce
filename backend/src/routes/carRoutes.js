const express = require("express");
const carController = require("../controller/carController");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

// Car Routes
router.post("/",authenticate, carController.createCar); // Create a car
router.get("/", carController.getAllCars); // Get all cars
router.get("/:id", carController.getCarById); // Get car by ID
router.put("/:id",authenticate,  carController.updateCar); // Update car by ID
router.delete("/:id",authenticate, carController.deleteCar); // Delete car by ID

module.exports = router;
