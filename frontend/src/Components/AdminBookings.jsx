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
            setLoading(true); // Set loading to true before the API call
            try {
                const dateQuery = selectedDate ? `?date=${selectedDate.toISOString().split('T')[0]}` : '';
                const response = await axios.get(`http://localhost:5001/api/accepted-bookings${dateQuery}`);
                setBookings(response.data.data);
            } catch (error) {
                setError('Error fetching accepted bookings');
            } finally {
                setLoading(false); // Set loading to false after the API call
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
                />
            </div>
            {selectedDate && (
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>User Name</th>
                            <th style={styles.th}>Email</th>
                            <th style={styles.th}>Slot</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.length > 0 ? (
                            bookings.map((booking) => (
                                <tr key={booking._id}>
                                    <td style={styles.td}>{booking.user.name}</td>
                                    <td style={styles.td}>{booking.user.email}</td>
                                    <td style={styles.td}>{booking.slot}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" style={styles.td}>No bookings for this date</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
}

const styles = {
    container: {
        padding: '20px',
    },
    heading: {
        marginBottom: '20px',
        textAlign: 'center',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    th: {
        border: '1px solid #ddd',
        padding: '8px',
        textAlign: 'left',
        backgroundColor: '#f2f2f2',
    },
    td: {
        border: '1px solid #ddd',
        padding: '8px',
        textAlign: 'left',
    },
    datePickerContainer: {
        marginBottom: '20px',
        textAlign: 'center',
    },
};
