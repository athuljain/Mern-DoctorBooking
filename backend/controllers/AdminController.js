
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Booking = require('../models/Booking');
const User = require('../models/usermodel');

// Hardcoded doctor details
const doctorDetails = {
    email: 'doctor@gmail.com',
    password: 'doctor123',
    name: 'Doctor Name',
    age: 45,
    specialization: 'Cardiology',
    // profilePicture: 'path/to/profile-picture.jpg'
};

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email !== doctorDetails.email) {
            return res.status(401).send("Invalid Email or Password");
        }

        const match = password === doctorDetails.password;
        if (!match) {
            return res.status(401).send("Invalid Email or Password");
        }

        const token = jwt.sign({ id: 'doctor' }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
        return res.status(200).send({ message: "Login successful", token, doctorDetails });
    } catch (error) {
        console.error("Error during admin login:", error);
        res.status(500).send("Login failed");
    }
};

// Get all users function
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().populate('bookings');
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
};

// Accept booking function
const acceptBooking = async (req, res) => {
    const id = req.params.id;

    try {
        const booking = await Booking.findByIdAndUpdate(id, { status: 'accepted' }, { new: true });
        if (!booking) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }

        // Optionally notify user that booking has been accepted

        res.status(200).json({ 
            success: true, 
            message: 'Booking accepted successfully', 
            data: {
                id: booking._id,
                user: booking.user,
                slot: booking.slot,
                status: booking.status
            } 
        });
    } catch (error) {
        console.error('Error accepting booking:', error);
        res.status(500).json({ success: false, message: 'Failed to accept booking' });
    }
};

// Reject booking function
const rejectBooking = async (req, res) => {
    const id = req.params.id;

    try {
        const booking = await Booking.findByIdAndUpdate(id, { status: 'rejected' }, { new: true });
        if (!booking) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }

        res.status(200).json({ 
            success: true, 
            message: 'Booking rejected successfully', 
            data: {
                id: booking._id,
                user: booking.user,
                slot: booking.slot,
                status: booking.status
            } 
        });
    } catch (error) {
        console.error('Error rejecting booking:', error);
        res.status(500).json({ success: false, message: 'Failed to reject booking' });
    }
};


// // Get all accepted bookings function
// const getAllAcceptedBookings = async (req, res) => {
//     try {
//         const bookings = await Booking.find({ status: 'accepted' }).populate('user');
//         res.status(200).json({ success: true, data: bookings });
//     } catch (error) {
//         console.error('Error fetching accepted bookings:', error);
//         res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
//     }
// };

// const getAllAcceptedBookings = async (req, res) => {
//     try {
//         const { date } = req.query; // Get date from query parameter
//         let filter = { status: 'accepted' };

//         if (date) {
//             const startOfDay = new Date(date);
//             startOfDay.setHours(0, 0, 0, 0);
//             const endOfDay = new Date(date);
//             endOfDay.setHours(23, 59, 59, 999);

//             filter.appointmentDate = { $gte: startOfDay, $lte: endOfDay }; // Correct field
//             console.log('Date Filter:', filter); // Debug log
//         }

//         const bookings = await Booking.find(filter).populate('user');
//         res.status(200).json({ success: true, data: bookings });
//     } catch (error) {
//         console.error('Error fetching accepted bookings:', error);
//         res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
//     }
// };
const getAllAcceptedBookings = async (req, res) => {
    try {
        const { date } = req.query;
        let filter = { status: 'accepted' };

        if (date) {
            const startOfDay = new Date(date);
            startOfDay.setHours(0, 0, 0, 0);
            const endOfDay = new Date(date);
            endOfDay.setHours(23, 59, 59, 999);

            filter.appointmentDate = { $gte: startOfDay, $lte: endOfDay };
        }

        const bookings = await Booking.find(filter).populate('user');
        res.status(200).json({ success: true, data: bookings });
    } catch (error) {
        console.error('Error fetching accepted bookings:', error);
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
};



module.exports = { adminLogin, getAllUsers, acceptBooking, rejectBooking, getAllAcceptedBookings };
