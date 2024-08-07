
// controllers/userController.js
const User = require('../models/usermodel');
const Booking = require('../models/Booking');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register function
const register = async (req, res) => {
    try {
        const { name, email, password, phone, gender, age } = req.body;

        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User with this email already exists' });
        }

        // Hash and salt password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            phone,
            gender,
            age
        });
        await newUser.save();

        res.status(201).json({ success: true, newUser });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ success: false, message: 'Duplicate key error: Email already exists' });
        }
        res.status(400).json({ success: false, error: error.message });
    }
};


// controllers/userController.js

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User Not Found' });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ message: 'Invalid Password' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
        
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            maxAge: 1000 * 60 * 60,
        });
        res.setHeader("Authorization", token);

        // Exclude password from the user object
        const { password: pwd, ...userDetails } = user.toObject();

        res.status(200).json({ message: 'Login Success', success: true, token, user: userDetails });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Error in Login: ${error.message}` });
    }
};





const createBooking = async (req, res) => {
    const { slot, appointmentDate } = req.body;
    const ticketPrice = 100; // Constant ticket price
    const userId = req.userId; // Extracted from token

    // Validate fields
    if (!slot || !appointmentDate) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    try {
        // Check if the slot is available
        const existingBooking = await Booking.findOne({ slot, appointmentDate });
        if (existingBooking) {
            return res.status(400).json({ success: false, message: 'Slot is already booked' });
        }

        // Create new booking
        const newBooking = new Booking({ slot, appointmentDate, ticketPrice, user: userId });
        const savedBooking = await newBooking.save();

        // Add booking to user's bookings
        const user = await User.findById(userId);
        user.bookings.push(savedBooking._id);
        await user.save();

        res.status(200).json({ success: true, message: 'Booked Successfully', data: savedBooking });
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
};

module.exports = createBooking;



// Get user details function
const getUserDetails = async (req, res) => {
    try {
        const userId = req.userId; // Extracted from token
        const user = await User.findById(userId).populate('bookings');
        
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
};






const getBookedSlots = async (req, res) => {
    const { date } = req.query;

    if (!date) {
        return res.status(400).json({ success: false, message: 'Date is required' });
    }

    try {
        // Create a date object for the start of the day (00:00:00) and the end of the day (23:59:59)
        const startDate = new Date(date);
        startDate.setHours(0, 0, 0, 0);
        
        const endDate = new Date(date);
        endDate.setHours(23, 59, 59, 999);

        // Query the bookings within the date range
        const bookings = await Booking.find({
            appointmentDate: {
                $gte: startDate,
                $lte: endDate
            }
        });

        const bookedSlots = bookings.map(booking => booking.slot);

        res.status(200).json({ success: true, bookedSlots });
    } catch (error) {
        console.error('Error fetching booked slots:', error);
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
};



module.exports = { register, login, createBooking, getUserDetails,getBookedSlots };