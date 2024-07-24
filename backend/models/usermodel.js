const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    gender: { type: String, enum: ['male', 'female', 'other'], required: true },
    age: { type: Number, required: true },
    bookings: [{ type: Schema.Types.ObjectId, ref: 'Booking' }]
});
module.exports = mongoose.model('User', userSchema);





