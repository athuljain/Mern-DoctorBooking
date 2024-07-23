

const express = require("express");
const userController = require("../controllers/usercontroller");
const authMiddleware = require("../Middileware/authMiddileware");
const router = express.Router();

// Define routes and link them to controller functions
router.post("/register", userController.register); // Register a new user
router.post("/login", userController.login); // User login
router.post('/book-appointment', authMiddleware, userController.createBooking);
router.get('/user-details', authMiddleware, userController.getUserDetails);
router.get('/booked-slots',userController.getBookedSlots)

module.exports = router;
