import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../Context/AuthContext';
import axios from 'axios';

const BookAppointmentPage = () => {
  const { user } = useContext(AuthContext);
  const [appointmentDate, setAppointmentDate] = useState('');
  const [slot, setSlot] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [message, setMessage] = useState('');

  const slots = [
    "10:00 - 10:30",
    "11:00 - 11:30",
    "13:00 - 13:30",
    "14:00 - 14:30",
    "15:00 - 15:30"
  ];

  useEffect(() => {
    const fetchBookedSlots = async () => {
      if (appointmentDate) {
        try {
          const response = await axios.get(`http://localhost:5001/api/v1/users/booked-slots?date=${appointmentDate}`);
          const bookedSlots = response.data.bookedSlots || []; // Ensure bookedSlots is an array
  
          console.log('API Response:', response.data);
          console.log('Booked Slots:', bookedSlots);
  
          const available = slots.filter(slot => !bookedSlots.includes(slot));
          console.log('Available Slots:', available);
  
          setAvailableSlots(available);
  
          if (available.length === 0) {
            setMessage('No slots available for the selected date.');
          } else {
            setMessage(''); // Clear the message if slots are available
          }
        } catch (error) {
          console.error('Error fetching booked slots:', error);
          setMessage('Failed to load available slots. Please try again later.');
        }
      } else {
        setAvailableSlots([]); // Clear slots if no date is selected
      }
    };
  
    fetchBookedSlots();
  }, [appointmentDate]); // Removed 'slots' from the dependency array
  
  const handleBooking = async () => {
    if (!slot || !appointmentDate) {
      setMessage('Please select a date and slot.');
      return;
    }

    try {
      await axios.post('http://localhost:5001/api/v1/users/book-appointment', {
        slot,
        appointmentDate,
      }, {
        headers: { 'Authorization': `Bearer ${user.token}` }
      });

      setMessage('Booking Successful!');
      setSlot('');
      // Refetch available slots after booking
      setAvailableSlots(prevSlots => prevSlots.filter(s => s !== slot));
    } catch (error) {
      console.error('Error booking appointment:', error);
      setMessage('Failed to book appointment.');
    }
  };

  return (
    <div>
      <h1>Book an Appointment</h1>
      <div>
        <label>
          Appointment Date:
          <input
            type="date"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Slot:
          <select 
            value={slot} 
            onChange={(e) => setSlot(e.target.value)} 
            disabled={!availableSlots.length}
          >
            <option value="">Select a slot</option>
            {availableSlots.length > 0 ? (
              availableSlots.map((availableSlot, index) => (
                <option key={index} value={availableSlot}>{availableSlot}</option>
              ))
            ) : (
              <option value="" disabled>No slots available</option>
            )}
          </select>
        </label>
      </div>
      <button 
        onClick={handleBooking} 
        disabled={!slot || !appointmentDate || !availableSlots.length}
      >
        Book Appointment
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default BookAppointmentPage;
