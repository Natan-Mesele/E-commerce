const checkAdmin = (req, res, next) => {
    if (req.user.role === 'ROLE_ADMIN') {
        next(); // User is admin, proceed to the next middleware/controller
    } else {
        res.status(403).json({ message: "Access denied. Admins only." });
    }
};

module.exports = checkAdmin;
