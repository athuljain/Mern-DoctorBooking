import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../Context/AuthContext';

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
                const response = await axios.get('http://localhost:5001/api/v1/users/user-details',config
                 
                );
                setUserDetails(response.data.data);
            } catch (error) {
                console.error('Fetching user details failed:', error);
            }
        };

        fetchUserDetails();
    }, [user]);

    if (!userDetails) return <div>Loading...</div>;

    return (
        <div>
            <h2>User Details</h2>
            <p>Name: {userDetails.name}</p>
            <p>Email: {userDetails.email}</p>
            <p>Phone: {userDetails.phone}</p>
            <p>Gender: {userDetails.gender}</p>
            <p>Age: {userDetails.age}</p>
            <h3>Bookings</h3>
            <ul>
                {userDetails.bookings.map((booking) => (
                    <li key={booking._id}>{booking.slot} - {booking.appointmentDate}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserDetailsPage;
