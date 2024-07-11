import React, { useContext, useState } from 'react';
import axios from 'axios';

import AuthContext from '../Context/AuthContext';

const RegisterPage = () => {


const { user, setUser, logout,login,age, setAge,name, setName,
    email,setEmail,password, setPassword,
    phone, setPhone, gender, setGender}=useContext(AuthContext)


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5001/api/v1/users/register', { name, email, password, phone, gender, age });
            
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" required />
                <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} placeholder="Gender" required />
                <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age" required />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegisterPage;
