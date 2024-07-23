


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


// // middleware/authMiddleware.js
// const jwt = require('jsonwebtoken');

// const authMiddleware = (req, res, next) => {
//     const authHeader = req.headers.authorization || req.cookies.token;
//     console.log("Middleware Authorization Header:", authHeader);
    
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//         return res.status(401).json({ message: 'Authentication required: No token provided' });
//     }

//     const token = authHeader.split(' ')[1];

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
//         req.userId = decoded.id;
//         next();
//     } catch (error) {
//         console.error('JWT verification error:', error);
//         res.status(401).json({ message: 'Invalid token' });
//     }
// };

// module.exports = authMiddleware;
