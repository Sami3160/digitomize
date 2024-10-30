const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, 'secret');
            req.user = await User.findById(decoded.userId).select('-password');
            
            next();
            return
        } catch (error) {
            console.log("token fail")

            console.log(error);
            
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }else{
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
    // console.log(token)
    // if (!token) {
    //     return res.status(401).json({ message: 'Not authorized, no token' });
    // }
};

const isAdmin = (req, res, next) => {
    console.log(req.body)
    if (req.user ) {
        next();  // If the user is an admin, proceed
    } else {
        return res.status(403).json({ message: 'Access denied: Admins only' });
    }
};


module.exports = { protect ,isAdmin };
