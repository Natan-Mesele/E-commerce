const Car = require("../models/carModel");

module.exports = {
    async createCar(req, res) {
        try {
            const carData = req.body;
            const car = await Car.create(carData);
            res.status(201).json({ message: "Car created successfully", car });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getAllCars(req, res) {
        try {
            const cars = await Car.find(); // You can add filters later
            res.status(200).json(cars);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getCarById(req, res) {
        try {
            const { id } = req.params;
            const car = await Car.findById(id);
            if (!car) {
                return res.status(404).json({ message: "Car not found" });
            }
            res.status(200).json(car);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async updateCar(req, res) {
        try {
            const { id } = req.params;
            const carData = req.body;
            const car = await Car.findByIdAndUpdate(id, carData, { new: true });
            if (!car) {
                return res.status(404).json({ message: "Car not found" });
            }
            res.status(200).json({ message: "Car updated successfully", car });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async deleteCar(req, res) {
        try {
            const { id } = req.params;
            const car = await Car.findByIdAndDelete(id);
            if (!car) {
                return res.status(404).json({ message: "Car not found" });
            }
            res.status(200).json({ message: "Car deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};
