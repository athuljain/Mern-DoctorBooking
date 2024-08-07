import React, { useContext } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from '../Context/AuthContext';
import { useNavigate, Link } from 'react-router-dom'
import "./Style/Login.css"

const LoginPage = () => {
    const navigate = useNavigate();
    const { login, email, setEmail, password, setPassword } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5001/api/v1/users/login', { email, password });
            const { token, user } = response.data; // Expecting user details from response
            login(token, user); // Updated login function
            toast.success('Login successful!');
            navigate('/home');
        } catch (error) {
            if (error.response && error.response.data) {
                toast.error(`Login failed: ${error.response.data.message}`);
            } else {
                toast.error('Login failed: An unknown error occurred.');
            }
        }
    };

    return (
        <div className="login-container">
            <ToastContainer />
            <div className="login-form">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                    <button type="submit">Login</button>
                    <p>Don't have an account? <Link to="/register">Sign up</Link></p>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
