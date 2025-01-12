const bcrypt = require('bcrypt');
const User = require('../models/userModel');

async function createAdmin() {
    const hashedPassword = await bcrypt.hash("admin123", 10);
    const admin = new User({
        fullName: "Admin User",
        email: "admin@example.com",
        password: hashedPassword,
        role: "ROLE_ADMIN",
    });

    await admin.save();
    console.log("Admin user created:", admin);
}

createAdmin();
