const Car = require("../models/carModel");

const addReview = async (carId, userId, rating, comment) => {
    // Find the car by its ID
    const car = await Car.findById(carId);
    if (!car) {
        throw new Error("Car not found");
    }

    // Check if the user has already reviewed this specific car
    const existingReview = car.reviews.find((r) => r.user.toString() === userId.toString());
    if (existingReview) {
        return { success: false, message: "You have already reviewed this car" };
    }

    // Add the new review
    const review = { user: userId, rating, comment };
    car.reviews.push(review);
    car.totalReviews = car.reviews.length;

    // Update the average rating
    car.averageRating =
        car.reviews.reduce((acc, cur) => acc + cur.rating, 0) / car.totalReviews;

    return await car.save(); 
};

const updateReview = async (carId, userId, rating, comment) => {
    const car = await Car.findById(carId);
    if (!car) {
        throw new Error("Car not found");
    }

    // Check if the user has already reviewed the car
    const reviewIndex = car.reviews.findIndex((r) => r.user.toString() === userId.toString());
    if (reviewIndex === -1) {
        throw new Error("Review not found for this car");
    }

    // Update the review
    car.reviews[reviewIndex].rating = rating;
    car.reviews[reviewIndex].comment = comment;

    // Recalculate the average rating
    car.averageRating =
        car.reviews.reduce((acc, cur) => acc + cur.rating, 0) / car.reviews.length;

    return await car.save();
};

const deleteReview = async (carId, userId) => {
    const car = await Car.findById(carId);
    if (!car) {
        throw new Error("Car not found");
    }

    // Check if the user has reviewed the car
    const reviewIndex = car.reviews.findIndex((r) => r.user.toString() === userId.toString());
    if (reviewIndex === -1) {
        throw new Error("Review not found for this car");
    }

    // Remove the review
    car.reviews.splice(reviewIndex, 1);
    car.totalReviews = car.reviews.length;

    // Recalculate the average rating
    car.averageRating =
        car.reviews.length > 0
            ? car.reviews.reduce((acc, cur) => acc + cur.rating, 0) / car.reviews.length
            : 0;

    return await car.save();
};

const getReviews = async (userId, carId) => {
    try {
        // Find the specific car by ID
        const car = await Car.findById(carId).populate("reviews.user", "name");

        if (!car) {
            throw new Error("Car not found");
        }

        // Filter reviews for the specific user
        const userReviews = car.reviews.filter((review) => review.user._id.toString() === userId);

        return userReviews;
    } catch (error) {
        console.error('Error in getReviews:', error.message); // Debugging statement
        throw new Error(error.message);
    }
};

module.exports = { addReview, updateReview, deleteReview, getReviews };
