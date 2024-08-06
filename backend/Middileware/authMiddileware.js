// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization || req.cookies.token;
    console.log("middileware",authHeader);
    if (!authHeader) {
        return res.status(401).json({ message: 'Authentication required: No token provided' });
    }
    try {
        const decoded = jwt.verify(authHeader, process.env.JWT_SECRET_KEY);
        req.userId = decoded.id;
        next();
    } catch (error) {
        console.error('JWT verification error:', error);
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authMiddleware;

