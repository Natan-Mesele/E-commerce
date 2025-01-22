const { getUserIdFromToken } = require("../config/jwtProvider");
const User = require("../models/usermodel");
const bcrypt = require('bcryptjs');

module.exports = {
    async createUser(userData) {
        try {
            let { fullName, emailValue, password, confirmPassword, role, phoneNumber } = userData; // Add confirmPassword here
            
            // Check if confirmPassword matches password
            if (password !== confirmPassword) {
                throw new Error("Password and confirm password do not match");
            }
    
            const isUserExist = await User.findOne({ email: emailValue });
    
            if (isUserExist) {
                throw new Error("User already exists with this email");
            }
    
            password = await bcrypt.hash(password, 8); // Hash the password
    
            const user = await User.create({
                fullName,
                email: emailValue,
                password: password,
                role,
                phoneNumber
            });
    
            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async getUserByEmail(email) {
        try {
            const user = await User.findOne({ email });
            if (!user) {
                throw new Error("User not found");
            }
            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    },
     
    async findUserById(userId) {
        try {
            const user = await User.findById(userId);
            
            if (!user) {
                throw new Error(`User not found with id ${userId}`);
            }

            return user;

        }catch (error) {
            throw new Error(error.message);
        }
    },

    async findUserProfileByJwt (jwt) {
        try {
            const userId = getUserIdFromToken(jwt);
            const user = await this.findUserById(userId);

            return user;
        } catch(error){
            throw new Error(error.message);
        }
    },

    async findAllUsers(){
        try {
            const users = await User.find();
            return users;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async updateUserProfile(userId, updateData) {
        try {
            const user = await this.findUserById(userId);
    
            // Update user data, including phone number
            if (updateData.fullName) user.fullName = updateData.fullName;
            if (updateData.email) user.email = updateData.email;
            if (updateData.phoneNumber) user.phoneNumber = updateData.phoneNumber;  // Add phoneNumber update
    
            await user.save();
            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async changePassword(userId, currentPassword, newPassword) {
        try {
          // Find the user by ID
          const user = await User.findById(userId);
      
          if (!user) {
            throw new Error('User not found');
          }
      
          // Compare current password with the stored hash
          const isMatch = await bcrypt.compare(currentPassword, user.password);
      
          if (!isMatch) {
            throw new Error('Incorrect current password');
          }
      
          // Hash the new password
          const hashedNewPassword = await bcrypt.hash(newPassword, 8);
      
          // Update the user's password with the new hashed password
          user.password = hashedNewPassword;
          await user.save();
      
          return { message: 'Password changed successfully' };
        } catch (error) {
          throw new Error(error.message);
        }
      },
}