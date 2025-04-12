const { generateToken } = require("../config/jwtProvider");
const userService = require("../service/userService");
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
    try {
        const user = await userService.createUser(req.body); 
        const jwt = generateToken(user._id);
        return res.status(201).send({ jwt, message: "Register success", user });
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
}

const googleSignUp = async (req, res) => {
    const { name, email, photoUrl, uid } = req.body;  // Make sure this matches the sent data

    try {
        const user = await userService.createOrFindUser({ name, email, photoUrl, uid });
        res.status(200).json({
            message: user ? 'User logged in' : 'User created',
            user,
        });
    } catch (error) {
        console.error('Error during Google Sign-Up:', error);  // Log specific error
        res.status(500).json({ message: 'Error handling Google sign-up', error: error.message });
    }
};


const login = async (req, res) => {
    const { password, email } = req.body;

    try {
        const user = await userService.getUserByEmail(email);
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).send({ message: "Invalid password" });
        }

        const jwt = generateToken(user._id);
        return res.status(200).send({ jwt, message: "Login success", user });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

module.exports = {
    register,
    login,
    googleSignUp
}