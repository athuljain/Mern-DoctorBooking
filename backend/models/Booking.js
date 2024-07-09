

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    slot: { type: String, required: true },
    appointmentDate: { type: Date, required: true },
    ticketPrice: { type: Number, default: 100 }, // Default ticket price
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' }
});

module.exports = mongoose.model('Booking', bookingSchema);
