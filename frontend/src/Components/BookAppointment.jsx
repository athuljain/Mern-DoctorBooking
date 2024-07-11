import React, { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../Context/AuthContext';

const BookAppointmentPage = () => {
    const [slot, setSlot] = useState('');
    const [appointmentDate, setAppointmentDate] = useState('');
    const { user } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/v1/users/book-appointment', 
                { slot, appointmentDate },
                { headers: { Authorization: user.token } }
            );
            alert('Appointment booked successfully!');
        } catch (error) {
            console.error('Booking failed:', error);
        }
    };

    return (
        <div>
            <h2>Book Appointment</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" value={slot} onChange={(e) => setSlot(e.target.value)} placeholder="Slot" required />
                <input type="date" value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} required />
                <button type="submit">Book</button>
            </form>
        </div>
    );
};

export default BookAppointmentPage;
