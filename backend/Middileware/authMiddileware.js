


// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const tokenFromHeader = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
    const tokenFromCookie = req.cookies.token;
    
    const token = tokenFromHeader || tokenFromCookie;

    if (!token) {
        return res.status(401).json({ message: 'Authentication required: No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.userId = decoded.id;
        next();
    } catch (error) {
        console.error('JWT verification error:', error);
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authMiddleware;
