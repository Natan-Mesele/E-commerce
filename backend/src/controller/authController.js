const { generateToken } = require("../config/jwtProvider");
const userService = require("../service/userService");
const bcrypt = require('bcrypt');

const register = async (req, res) => {
    try {
        const user = await userService.createUser(req.body); // The createUser method will handle the confirmPassword logic
        const jwt = generateToken(user._id);
        return res.status(201).send({ jwt, message: "Register success", user });
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
}


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
    login
}