import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function AdminBookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            setLoading(true);
            try {
                const dateQuery = selectedDate ? `?date=${selectedDate.toISOString().split('T')[0]}` : '';
                const response = await axios.get(`http://localhost:5001/api/accepted-bookings${dateQuery}`);
                setBookings(response.data.data);
            } catch (error) {
                setError('Error fetching accepted bookings');
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [selectedDate]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Accepted Bookings</h1>
            <div style={styles.datePickerContainer}>
                <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    dateFormat="yyyy/MM/dd"
                    placeholderText="Select a date"
                    style={styles.datePicker}
                />
            </div>
            {bookings.length > 0 ? (
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>User Name</th>
                            <th style={styles.th}>Email</th>
                            <th style={styles.th}>Date</th>
                            <th style={styles.th}>Slot</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking._id}>
                                <td style={styles.td}>{booking.user.name}</td>
                                <td style={styles.td}>{booking.user.email}</td>
                                <td style={styles.td}>{new Date(booking.appointmentDate).toLocaleDateString()}</td>
                                <td style={styles.td}>{booking.slot}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p style={styles.noBookings}>No bookings for this date</p>
            )}
        </div>
    );
}

const styles = {
    container: {
        padding: '20px',
        backgroundColor: '#2F4F4F', /* Dark Green */
        color: '#ADD8E6', /* Light Blue */
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        minHeight: '100vh',
    },
    heading: {
        marginBottom: '20px',
    },
    datePickerContainer: {
        marginBottom: '20px',
    },
    datePicker: {
        backgroundColor: '#ADD8E6', /* Light Blue */
        border: 'none',
        borderRadius: '5px',
        padding: '10px',
        color: '#2F4F4F', /* Dark Green */
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    th: {
        backgroundColor: '#4CAF50', /* Green */
        color: 'white',
        padding: '10px',
        border: '1px solid #ddd',
        textAlign: 'left',
    },
    td: {
        padding: '10px',
        border: '1px solid #ddd',
        textAlign: 'left',
    },
    noBookings: {
        textAlign: 'center',
        color: '#fff',
    },
};
