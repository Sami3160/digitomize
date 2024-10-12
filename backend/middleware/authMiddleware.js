const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from the header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, 'secret');

            // Get user from the token
            req.user = await User.findById(decoded.userId).select('-password');

            next(); // Move to the next middleware/controller
        } catch (error) {
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
};

const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();  // If the user is an admin, proceed
    } else {
        return res.status(403).json({ message: 'Access denied: Admins only' });
    }
};


module.exports = { protect ,isAdmin };
