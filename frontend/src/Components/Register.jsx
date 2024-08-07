import React, { useContext } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import "./Style/Register.css"

const RegisterPage = () => {
    const navigate = useNavigate();
    const { name, setName, email, setEmail, password, setPassword, phone, setPhone, gender, setGender, age, setAge } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5001/api/v1/users/register', { name, email, password, phone, gender, age });
            toast.success('Registration successful!');
            navigate('/');
        } catch (error) {
            if (error.response && error.response.data) {
                toast.error(`Registration failed: ${error.response.data.message}`);
            } else {
                toast.error('Registration failed: An unknown error occurred.');
            }
        }
    };

    return (
        <div className="register-container">
            <ToastContainer />
            <div className="register-form">
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
        </div>
    );
};

export default RegisterPage;
