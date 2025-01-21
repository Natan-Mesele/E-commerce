const reviewService = require('../service/reviewService');

const addReview = async (req, res) => {
    const { userId } = req.params; // Use userId from params
    const { carId, rating, comment } = req.body; // Get carId from the body

    try {
        const updatedCar = await reviewService.addReview(carId, userId, rating, comment);
        res.status(201).json({ message: "Review added successfully", car: updatedCar });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateReview = async (req, res) => {
    const { userId } = req.params; // Use userId from params
    const { carId, rating, comment } = req.body;

    try {
        const updatedCar = await reviewService.updateReview(carId, userId, rating, comment);
        res.status(200).json({ message: "Review updated successfully", car: updatedCar });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteReview = async (req, res) => {
    const { userId, carId } = req.params;

    try {
        const updatedCar = await reviewService.deleteReview(carId, userId);
        res.status(200).json({ message: "Review deleted successfully", car: updatedCar });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getReviews = async (req, res) => {
    const { userId } = req.params; 
    const { carId } = req.query;  

    try {
        const reviews = await reviewService.getReviews(userId, carId);
        res.status(200).json(reviews);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { addReview, updateReview, deleteReview, getReviews };
