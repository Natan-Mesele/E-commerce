const Car = require("../models/carModel");

module.exports = {
    async createCar(carData) {
        try {
            const car = await Car.create(carData);
            return car;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async getAllCars(filters = {}) {
        try {
            const cars = await Car.find(filters); // Add filters as needed
            return cars;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async getCarById(id) {
        try {
            const car = await Car.findById(id);
            if (!car) {
                throw new Error("Car not found");
            }
            return car;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async updateCar(id, carData) {
        try {
            const car = await Car.findByIdAndUpdate(id, carData, { new: true });
            if (!car) {
                throw new Error("Car not found");
            }
            return car;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async deleteCar(id) {
        try {
            const car = await Car.findByIdAndDelete(id);
            if (!car) {
                throw new Error("Car not found");
            }
            return car;
        } catch (error) {
            throw new Error(error.message);
        }
    },
};
