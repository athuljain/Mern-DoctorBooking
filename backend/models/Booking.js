

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    slot: { 
        type: String, 
        enum: [
            "10:00 - 10:30",
            "10:30 - 11:00",
            "11:00 - 11:30",
            "11:30 - 12:00",  
            "12:30 - 13:00",
             "13:00 - 13:30",
             "13:30 - 14:00",
            "14:00 - 14:30",
            "14:30 - 15:00",
            "15:00 - 15:30"
        ], 
        required: true 
    },
    appointmentDate: { type: Date, required: true },
    ticketPrice: { type: Number, default: 100 }, // Default ticket price
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' }
});

module.exports = mongoose.model('Booking', bookingSchema);
