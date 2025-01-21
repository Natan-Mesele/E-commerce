const WeddingCar = require("../models/weddingCarModel");

module.exports = {
    async createWeddingCar(weddingCarData) {
        try {
          // Ensure that 'availability' is provided and valid
          if (!weddingCarData.availability || weddingCarData.availability < 1) {
            throw new Error('Availability must be a positive number.');
          }
    
          const weddingCar = await WeddingCar.create(weddingCarData);
          return weddingCar;
        } catch (error) {
          throw new Error(error.message);
        }
      },
    
      async getAllWeddingCars() {
        try {
          const weddingCars = await WeddingCar.find();
          return weddingCars;
        } catch (error) {
          throw new Error(error.message);
        }
      },
    
      async getWeddingCarById(weddingCarId) {
        try {
          const weddingCar = await WeddingCar.findById(weddingCarId);
          if (!weddingCar) throw new Error('Wedding car not found');
          return weddingCar;
        } catch (error) {
          throw new Error(error.message);
        }
      },
    
      async updateWeddingCar(weddingCarId, weddingCarData) {
        try {
          const weddingCar = await WeddingCar.findById(weddingCarId);
          if (!weddingCar) throw new Error('Wedding car not found');
          
          // Only update the fields that are present in the incoming data
          if (weddingCarData.name) weddingCar.name = weddingCarData.name;
          if (weddingCarData.brand) weddingCar.brand = weddingCarData.brand;
          if (weddingCarData.model) weddingCar.model = weddingCarData.model;
          if (weddingCarData.year) weddingCar.year = weddingCarData.year;
          if (weddingCarData.pricePerDay) weddingCar.pricePerDay = weddingCarData.pricePerDay;
          if (weddingCarData.seats) weddingCar.seats = weddingCarData.seats;
          if (weddingCarData.transmission) weddingCar.transmission = weddingCarData.transmission;
          if (weddingCarData.fuelType) weddingCar.fuelType = weddingCarData.fuelType;
          if (weddingCarData.availability) weddingCar.availability = weddingCarData.availability;  // Only update availability
          if (weddingCarData.images) weddingCar.images = weddingCarData.images;
      
          // Save the updated wedding car
          await weddingCar.save();
          return weddingCar;
        } catch (error) {
          throw new Error(error.message);
        }
      },
      

    async deleteWeddingCar(id) {
        try {
            const weddingCar = await WeddingCar.findByIdAndDelete(id);
            if (!weddingCar) {
                throw new Error("Wedding car not found");
            }
            return weddingCar;
        } catch (error) {
            throw new Error(error.message);
        }
    },
};
