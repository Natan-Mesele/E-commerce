const { getUserIdFromToken } = require("../config/jwtProvider");
const userService = require("../service/userService");

module.exports = {
    getUserProfileHandler: async (req, res) => {
        try {
            const jwt = req.headers.authorization?.split(' ')[1];
            const user = await userService.findUserProfileByJwt(jwt);
            user.password = null;
            res.status(200).json(user);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({error: error.message});
            } else {
                res.status(500).json({error: "Internal server error"});
            }
        }
    },

    updateUserProfileHandler: async (req, res) => {
        try {
            const jwt = req.headers.authorization?.split(' ')[1];
            const userId = getUserIdFromToken(jwt);  // Extract user ID from JWT
            const updatedUser = await userService.updateUserProfile(userId, req.body);
    
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    changePasswordHandler: async (req, res) => {
        try {
            const jwt = req.headers.authorization?.split(' ')[1];
            const { oldPassword, newPassword } = req.body;
            const userId = getUserIdFromToken(jwt);  // Extract user ID from JWT

            const updatedUser = await userService.changePassword(userId, oldPassword, newPassword);
            res.status(200).json({ message: "Password updated successfully" });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
};