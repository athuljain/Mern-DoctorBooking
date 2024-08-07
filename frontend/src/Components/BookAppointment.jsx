


// import React, { useState, useContext, useEffect } from 'react';
// import AuthContext from '../Context/AuthContext';
// import axios from 'axios';

// const BookAppointmentPage = () => {
//   const { user } = useContext(AuthContext);
//   const [appointmentDate, setAppointmentDate] = useState('');
//   const [slot, setSlot] = useState('');
//   const [availableSlots, setAvailableSlots] = useState([]);
//   const [message, setMessage] = useState('');
// console.log("Slots:",slot);
// console.log("AvailableSlots",availableSlots);


//   const slots = [
//     "10:00 - 10:30",
//     "11:00 - 11:30",
//     "13:00 - 13:30",
//     "14:00 - 14:30",
//     "15:00 - 15:30"
//   ];

//   useEffect(() => {
//     const fetchBookedSlots = async () => {
//       if (appointmentDate) {
//         try {
//           const response = await axios.get(`http://localhost:5001/api/v1/users/booked-slots?date=${appointmentDate}`);
//           const bookedSlots = response.data.bookedSlots || [];
  
//           const available = slots.filter(slot => !bookedSlots.includes(slot));
//           setAvailableSlots(available);
  
//           if (available.length === 0) {
//             setMessage('No slots available for the selected date.');
//           } else {
//             setMessage('');
//           }
//         } catch (error) {
//           console.error('Error fetching booked slots:', error);
//           setMessage('Failed to load available slots. Please try again later.');
//         }
//       } else {
//         setAvailableSlots([]);
//       }
//     };
  
//     fetchBookedSlots();
//   }, [appointmentDate]);

//   const handleBooking = async () => {
//     if (!slot || !appointmentDate) {
//         setMessage('Please select a date and slot.');
//         return;
//     }

//     try {
//         const config = {
//             headers: {
//                 Authorization: `Bearer ${user.token}`,
//             },
//         };

//         const response = await axios.post(
//             'http://localhost:5001/api/v1/users/book-appointment',
//             { slot, appointmentDate },
//             config
//         );

//         setMessage('Booking Successful!');
//         setSlot('');
//         setAvailableSlots((prevSlots) => prevSlots.filter((s) => s !== slot));
//     } catch (error) {
//         console.error('Error booking appointment:', error.response ? error.response.data : error.message);
//         setMessage('Failed to book appointment.');
//     }
// };

//   return (
//     <div>
//       <h1>Book an Appointment</h1>
//       <div>
//         <label>
//           Appointment Date:
//           <input
//             type="date"
//             value={appointmentDate}
//             onChange={(e) => setAppointmentDate(e.target.value)}
//           />
//         </label>
//       </div>
//       <div>
//         <label>
//           Slot:
//           <select 
//             value={slot} 
//             onChange={(e) => setSlot(e.target.value)} 
//             disabled={!availableSlots.length}
//           >
//             <option value="">Select a slot</option>
//             {availableSlots.length > 0 ? (
//               availableSlots.map((availableSlot, index) => (
//                 <option key={index} value={availableSlot}>{availableSlot}</option>
//               ))
//             ) : (
//               <option value="" disabled>No slots available</option>
//             )}
//           </select>
//         </label>
//       </div>
//       <button 
//         onClick={handleBooking} 
//         disabled={!slot || !appointmentDate || !availableSlots.length}
//       >
//         Book Appointment
//       </button>
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default BookAppointmentPage;



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

  console.log("slot",slot);
  console.log("availableSlots",availableSlots);
  
  
  // Fetch booked slots whenever the appointment date changes
  useEffect(() => {
    const fetchBookedSlots = async () => {
      if (appointmentDate) {
        try {
          const response = await axios.get(`http://localhost:5001/api/v1/users/booked-slots?date=${appointmentDate}`);
          const bookedSlots = response.data.bookedSlots || [];

          const available = slots.filter(slot => !bookedSlots.includes(slot));
          setAvailableSlots(available);

          if (available.length === 0) {
            setMessage('No slots available for the selected date.');
          } else {
            setMessage('');
          }
        } catch (error) {
          console.error('Error fetching booked slots:', error);
          setMessage('Failed to load available slots. Please try again later.');
        }
      } else {
        setAvailableSlots([]);
      }
    };

    fetchBookedSlots();
  }, [appointmentDate]);

  const handleBooking = async () => {
    if (!slot || !appointmentDate) {
        setMessage('Please select a date and slot.');
        return;
    }

    try {
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };

        const response = await axios.post(
            'http://localhost:5001/api/v1/users/book-appointment',
            { slot, appointmentDate },
            config
        );

        setMessage('Booking Successful!');
        setSlot('');
        setAvailableSlots((prevSlots) => prevSlots.filter((s) => s !== slot));
    } catch (error) {
        console.error('Error booking appointment:', error.response ? error.response.data : error.message);
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

