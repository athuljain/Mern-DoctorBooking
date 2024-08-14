import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../Context/AuthContext';
import './Style/UserDetails.css'; // Ensure this CSS file contains the styles below
// import Navbar from './Navbar';

const UserDetailsPage = () => {
    const [userDetails, setUserDetails] = useState(null);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                const response = await axios.get('http://localhost:5001/api/v1/users/user-details', config);
                setUserDetails(response.data.data);
            } catch (error) {
                console.error('Fetching user details failed:', error);
            }
        };

        fetchUserDetails();
    }, [user]);

    if (!userDetails) return <div className="loading">Loading...</div>;

    return (
        <div className="user-details-container">
            {/* <Navbar /> */}
            <div className="user-details-content">
                <h2>User Details</h2>
                <div className="user-info">
                    <p><strong>Name:</strong> {userDetails.name}</p>
                    <p><strong>Email:</strong> {userDetails.email}</p>
                    <p><strong>Phone:</strong> {userDetails.phone}</p>
                    <p><strong>Gender:</strong> {userDetails.gender}</p>
                    <p><strong>Age:</strong> {userDetails.age}</p>
                </div>
                <h3>Bookings</h3>
                <ul className="booking-list">
                    {userDetails.bookings.map((booking) => (
                        <li key={booking._id}>
                            {booking.slot} - {new Date(booking.appointmentDate).toLocaleDateString()}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default UserDetailsPage;
