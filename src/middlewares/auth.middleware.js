const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const AppError = require('../utils/AppError');

const protect = async (req, res, next) => {
    try {
        let token;
        
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            throw new AppError('You are not logged in. Please log in to get access.', 401);
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const currentUser = await User.findById(decoded.id);
        if (!currentUser) {
            throw new AppError('The user belonging to this token no longer exists.', 401);
        }

        req.user = currentUser;
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = { protect };