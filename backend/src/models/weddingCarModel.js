const mongoose = require("mongoose");

const WeddingCarSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  pricePerDay: { type: Number, required: true },
  seats: { type: Number, required: true },
  transmission: { type: String, required: true }, // e.g., 'Automatic', 'Manual'
  fuelType: { type: String, required: true }, // e.g., 'Gasoline', 'Diesel', 'Electric'
  availability: { type: Boolean, default: true }, // Indicates if the car is available for rent
  images: [String], // Array to store image URLs
  availability: { type: Number, default: 0 },

  reviews: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to the user who made the review
      rating: { type: Number, required: true, min: 1, max: 5 }, // Rating from 1 to 5
      comment: { type: String }, // Optional comment from the user
      createdAt: { type: Date, default: Date.now },
    },
  ],
  averageRating: { type: Number, default: 0 }, 
  totalReviews: { type: Number, default: 0 },

}, { timestamps: true });

const WeddingCar = mongoose.model("WeddingCar", WeddingCarSchema);

module.exports = WeddingCar;
