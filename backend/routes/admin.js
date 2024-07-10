
// const express = require("express");
// const { adminLogin, viewBookings, acceptBooking ,rejectBooking} = require('../controllers/AdminController');
// const router = express.Router();

// router.post('/adminlogin', adminLogin);
// router.get('/bookedappointment', viewBookings);

// router.put('/acceptbooking/:id', acceptBooking);
// router.put('/rejectbooking/:id', rejectBooking);

// module.exports = router;


const express = require('express');
const adminController = require('../controllers/adminController');
const router = express.Router();



router.post('/admin-login', adminController.adminLogin);
router.get('/getAllUsers',adminController.getAllUsers)

module.exports = router;

