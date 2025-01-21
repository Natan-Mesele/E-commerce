const weddingCarService = require("../service/weddingCarService");

module.exports = {
    async createWeddingCar(req, res) {
        try {
          const weddingCarData = req.body;
    
          // Validate required fields
          if (!weddingCarData.name || !weddingCarData.availability) {
            return res.status(400).json({ message: 'Name and availability are required.' });
          }
    
          const weddingCar = await weddingCarService.createWeddingCar(weddingCarData);
          res.status(201).json({ message: 'Wedding car created successfully', weddingCar });
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      },
    
      // Endpoint to fetch all wedding cars
      async getAllWeddingCars(req, res) {
        try {
          const weddingCars = await weddingCarService.getAllWeddingCars();
          res.status(200).json(weddingCars);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      },
    
      // Endpoint to fetch a wedding car by ID
      async getWeddingCarById(req, res) {
        try {
          const { id } = req.params;
          const weddingCar = await weddingCarService.getWeddingCarById(id);
    
          if (!weddingCar) {
            return res.status(404).json({ message: 'Wedding car not found' });
          }
    
          res.status(200).json(weddingCar);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      },
    
      async updateWeddingCar(req, res) {
        try {
          const { id } = req.params;
          const weddingCarData = req.body;
          
          // If the availability field is passed, only that should be updated
          if (weddingCarData.availability) {
            const updatedWeddingCar = await weddingCarService.updateWeddingCar(id, weddingCarData);
            return res.status(200).json({ message: 'Wedding car updated successfully', updatedWeddingCar });
          } else {
            return res.status(400).json({ message: 'Availability is required' });
          }
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      },
      

    async deleteWeddingCar(req, res) {
        try {
            const { id } = req.params;
            const weddingCar = await weddingCarService.deleteWeddingCar(id);
            if (!weddingCar) {
                return res.status(404).json({ message: "Wedding car not found" });
            }
            res.status(200).json({ message: "Wedding car deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};
