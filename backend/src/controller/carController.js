const Car = require("../models/carModel");
const carService = require("../service/carService");

module.exports = {
    async createCar(req, res) {
        try {
          const carData = req.body;
    
          // Validate required fields
          if (!carData.name || !carData.availability) {
            return res.status(400).json({ message: 'Name and availability are required.' });
          }
    
          const car = await carService.createCar(carData);
          res.status(201).json({ message: 'Car created successfully', car });
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      },
    
      // Endpoint to fetch all cars
      async getAllCars(req, res) {
        try {
          const cars = await carService.getAllCars();
          res.status(200).json(cars);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      },
    
      // Endpoint to fetch a car by ID
      async getCarById(req, res) {
        try {
          const { id } = req.params;
          const car = await carService.getCarById(id);
    
          if (!car) {
            return res.status(404).json({ message: 'Car not found' });
          }
    
          res.status(200).json(car);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      },
    
      async updateCar(req, res) {
        try {
          const { id } = req.params;
          const carData = req.body;
    
          const updatedCar = await carService.updateCar(id, carData);
          if (!updatedCar) {
            return res.status(404).json({ message: 'Car not found' });
          }
    
          res.status(200).json({ message: 'Car updated successfully', updatedCar });
        } catch (error) {
          res.status(500).json({ message: error.message });
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
