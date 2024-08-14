import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/getAllUsers');
                setUsers(response.data.data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching users');
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleAccept = async (bookingId) => {
        try {
            const response = await axios.put(`http://localhost:5001/api/accept-booking/${bookingId}`);
            alert('Booking accepted');
            // Update UI after acceptance
            setUsers((prevUsers) =>
                prevUsers.map((user) => ({
                    ...user,
                    bookings: user.bookings.map((booking) =>
                        booking._id === bookingId ? { ...booking, status: 'accepted' } : booking
                    ),
                }))
            );
        } catch (error) {
            alert('Error accepting booking');
        }
    };

    const handleReject = async (bookingId) => {
        try {
            const response = await axios.put(`http://localhost:5001/api/reject-booking/${bookingId}`);
            alert('Booking rejected');
            // Update UI after rejection
            setUsers((prevUsers) =>
                prevUsers.map((user) => ({
                    ...user,
                    bookings: user.bookings.map((booking) =>
                        booking._id === bookingId ? { ...booking, status: 'rejected' } : booking
                    ),
                }))
            );
        } catch (error) {
            alert('Error rejecting booking');
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Users</h1>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>Name</th>
                        <th style={styles.th}>Email</th>
                        <th style={styles.th}>Age</th>
                        <th style={styles.th}>Bookings</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td style={styles.td}>{user.name}</td>
                            <td style={styles.td}>{user.email}</td>
                            <td style={styles.td}>{user.age}</td>
                            <td style={styles.td}>
                                {user.bookings && user.bookings.length > 0 ? (
                                    <ul style={styles.bookingList}>
                                        {user.bookings.map((booking) => (
                                            <li key={booking._id} style={styles.bookingItem}>
                                                <p>Date: {new Date(booking.date).toLocaleDateString()}</p>
                                                <p>Slot: {booking.slot}</p>
                                                <p>Status: {booking.status}</p>
                                                <button
                                                    onClick={() => handleAccept(booking._id)}
                                                    style={styles.acceptButton}
                                                    disabled={booking.status === 'accepted'}
                                                >
                                                    Accept
                                                </button>
                                                <button
                                                    onClick={() => handleReject(booking._id)}
                                                    style={styles.rejectButton}
                                                    disabled={booking.status === 'rejected'}
                                                >
                                                    Reject
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    'No bookings'
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

const styles = {
    container: {
        padding: '20px',
        backgroundColor: '#2F4F4F', /* Dark Green */
        color: '#ADD8E6', /* Light Blue */
        borderRadius: '10px',
        maxWidth: '1200px',
        margin: 'auto',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
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
        padding: '12px',
        textAlign: 'left',
        backgroundColor: '#004d00', /* Darker Green */
        color: '#ADD8E6', /* Light Blue */
    },
    td: {
        border: '1px solid #ddd',
        padding: '12px',
        textAlign: 'left',
    },
    acceptButton: {
        marginRight: '10px',
        padding: '8px 12px',
        backgroundColor: '#4CAF50', /* Green */
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    rejectButton: {
        padding: '8px 12px',
        backgroundColor: '#f44336', /* Red */
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    bookingList: {
        listStyleType: 'none',
        padding: 0,
    },
    bookingItem: {
        marginBottom: '10px',
        padding: '10px',
        borderRadius: '5px',
        backgroundColor: '#004d00', /* Darker Green */
    },
};
