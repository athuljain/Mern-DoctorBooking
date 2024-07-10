const express = require("express");
const adminController = require("../controllers/adminController");
const router = express.Router();

router.post("/admin-login", adminController.adminLogin);
router.get("/getAllUsers", adminController.getAllUsers);
router.put("/accept-booking/:id", adminController.acceptBooking);
router.put("/reject-booking/:id", adminController.rejectBooking);
router.get("/accepted-bookings", adminController.getAllAcceptedBookings);

module.exports = router;
