


// import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import AuthContext from '../Context/AuthContext';

// const MyBooking = () => {
//     const validSlots = [
//         "10:00 - 10:30",
//         "11:00 - 11:30",
//         "13:00 - 13:30",
//         "14:00 - 14:30",
//         "15:00 - 15:30"
//     ];

//     const { user } = useContext(AuthContext);

//     const [formData, setFormData] = useState({
//         name: '',
//         age: '',
//         slot: '',
//         appointmentDate: '',
//         ticketPrice: 100
//     });

//     const [bookedSlots, setBookedSlots] = useState([]);

//     useEffect(() => {
//         const fetchBookedSlots = async () => {
//             if (formData.appointmentDate) {
//                 try {
//                     const response = await axios.get(`http://localhost:5001/api/v1/users/booked-slots?date=${formData.appointmentDate}`);
//                     setBookedSlots(response.data.bookedSlots);
//                 } catch (error) {
//                     console.error('Error fetching booked slots:', error);
//                 }
//             }
//         };
//         fetchBookedSlots();
//     }, [formData.appointmentDate]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!user) {
//             alert('You need to be logged in to book an appointment.');
//             return;
//         }

//         if (bookedSlots.includes(formData.slot)) {
//             alert('Slot is already booked. Please choose another slot.');
//             return;
//         }

//         try {
//             const response = await axios.post('http://localhost:8000/api/v1/users/book-appointment', 
//             { ...formData }, 
//             {
//                 headers: { Authorization: `Bearer ${user.token}` }
//             });
//             console.log('Booking created:', response.data);
//             alert('Booking Successful!');
//             setFormData({
//                 name: '',
//                 age: '',
//                 slot: '',
//                 appointmentDate: '',
//                 ticketPrice: 100
//             });
//             setBookedSlots([]);
//         } catch (error) {
//             console.error('Error creating booking:', error.response);
//             if (error.response && error.response.status === 400) {
//                 alert('Failed to book slot. Please choose another slot.');
//             } else {
//                 alert('Failed to create booking. Please try again later.');
//             }
//         }
//     };

//     return (
//         <div className="book-container">
//             <h1>Book Your Appointment</h1>
//             <form onSubmit={handleSubmit}>
//                 <div className="form-group">
//                     <input 
//                         type="text" 
//                         id="name"
//                         name="name" 
//                         value={formData.name} 
//                         onChange={handleChange} 
//                         required 
//                         placeholder="Name"
//                     />
//                 </div>
//                 <div className="form-group">
//                     <input 
//                         type="number" 
//                         id="age"
//                         name="age" 
//                         value={formData.age} 
//                         onChange={handleChange} 
//                         required 
//                         placeholder="Age"
//                     />
//                 </div>
//                 <div className="form-group">
//                     <input 
//                         type="date" 
//                         id="appointmentDate"
//                         name="appointmentDate" 
//                         value={formData.appointmentDate} 
//                         onChange={handleChange} 
//                         required 
//                     />
//                 </div>
//                 <div className="form-group">
//                     <select 
//                         id="slot"
//                         name="slot" 
//                         value={formData.slot} 
//                         onChange={handleChange} 
//                         required
//                     >
//                         <option value="" disabled>Select a slot</option>
//                         {validSlots.map((slot, index) => (
//                             <option 
//                                 key={index} 
//                                 value={slot} 
//                                 disabled={bookedSlots.includes(slot)}
//                             >
//                                 {slot}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//                 <div className="form-group">
//                     <input 
//                         type="number" 
//                         id="ticketPrice"
//                         name="ticketPrice" 
//                         value={formData.ticketPrice} 
//                         onChange={handleChange} 
//                         disabled
//                     />
//                 </div>
//                 <button type="submit" className="btn-submit">Book Appointment</button>
//             </form>
//         </div>
//     );
// };

// export default MyBooking;

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../Context/AuthContext';

const MyBooking = () => {
    const validSlots = [
        "10:00 - 10:30",
        "11:00 - 11:30",
        "13:00 - 13:30",
        "14:00 - 14:30",
        "15:00 - 15:30"
    ];

    const { user } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        name: '',
        age: '',
        slot: '',
        appointmentDate: '',
        ticketPrice: 100
    });

    const [bookedSlots, setBookedSlots] = useState([]);

    useEffect(() => {
        const fetchBookedSlots = async () => {
            if (formData.appointmentDate) {
                try {
                    const response = await axios.post('http://localhost:5001/api/v1/users/booked-slots', {
                        date: formData.appointmentDate
                    });
                    setBookedSlots(response.data.bookedSlots);
                } catch (error) {
                    console.error('Error fetching booked slots:', error);
                }
            }
        };
        fetchBookedSlots();
    }, [formData.appointmentDate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            alert('You need to be logged in to book an appointment.');
            return;
        }

        if (bookedSlots.includes(formData.slot)) {
            alert('Slot is already booked. Please choose another slot.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5001/api/v1/users/book-appointment', 
            { ...formData }, 
            {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            console.log('Booking created:', response.data);
            alert('Booking Successful!');
            setFormData({
                name: '',
                age: '',
                slot: '',
                appointmentDate: '',
                ticketPrice: 100
            });
            setBookedSlots([]);
        } catch (error) {
            console.error('Error creating booking:', error.response);
            if (error.response && error.response.status === 400) {
                alert('Failed to book slot. Please choose another slot.');
            } else {
                alert('Failed to create booking. Please try again later.');
            }
        }
    };

    return (
        <div className="book-container">
            <h1>Book Your Appointment</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input 
                        type="text" 
                        id="name"
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        required 
                        placeholder="Name"
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="number" 
                        id="age"
                        name="age" 
                        value={formData.age} 
                        onChange={handleChange} 
                        required 
                        placeholder="Age"
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="date" 
                        id="appointmentDate"
                        name="appointmentDate" 
                        value={formData.appointmentDate} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <select 
                        id="slot"
                        name="slot" 
                        value={formData.slot} 
                        onChange={handleChange} 
                        required
                    >
                        <option value="" disabled>Select a slot</option>
                        {validSlots.map((slot, index) => (
                            <option 
                                key={index} 
                                value={slot} 
                                disabled={bookedSlots.includes(slot)}
                            >
                                {slot}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <input 
                        type="number" 
                        id="ticketPrice"
                        name="ticketPrice" 
                        value={formData.ticketPrice} 
                        onChange={handleChange} 
                        disabled
                    />
                </div>
                <button type="submit" className="btn-submit">Book Appointment</button>
            </form>
        </div>
    );
};

export default MyBooking;
