// utils/passwordValidator.js
const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    if (!passwordRegex.test(password)) {
        throw new Error(
            'Password must be at least 8 characters long and include at least one letter, one number, and one special character.'
        );
    }
};

module.exports = validatePassword;
