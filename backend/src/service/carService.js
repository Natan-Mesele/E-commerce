const Car = require("../models/carModel");

module.exports = {
  async createCar(carData) {
    try {
      // Ensure that 'availability' is provided and valid
      if (!carData.availability || carData.availability < 1) {
        throw new Error('Availability must be a positive number.');
      }

      const car = await Car.create(carData);
      return car;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async getAllCars() {
    try {
      const cars = await Car.find();
      return cars;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async getCarById(carId) {
    try {
      const car = await Car.findById(carId);
      if (!car) throw new Error('Car not found');
      return car;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async updateCarAvailability(carId, newAvailability) {
    try {
      const car = await Car.findById(carId);
      if (!car) throw new Error('Car not found');

      // Update the availability
      car.availability = newAvailability;
      await car.save();

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

  async getCarsByCategory(category) {
    try {
      // Check if category is provided, if so filter by category
      const query = category ? { category } : {};
      const cars = await Car.find(query); // Return cars filtered by category
  
      return cars;
    } catch (error) {
      throw new Error('Error fetching cars by category');
    }
  },
};
