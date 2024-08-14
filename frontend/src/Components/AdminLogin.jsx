import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const nav = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5001/api/admin-login', { email, password });
            setMessage(response.data.message);
            localStorage.setItem('token', response.data.token);
            nav("/admin");
        } catch (error) {
            setMessage('Login failed: ' + (error.response?.data || error.message));
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Admin Login</h1>
            <form onSubmit={handleLogin} style={styles.form}>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={styles.input}
                        required
                    />
                </div>
                <button type="submit" style={styles.button}>Login</button>
            </form>
            {message && <p style={styles.message}>{message}</p>}
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#2F4F4F', /* Dark Green */
        color: '#ADD8E6', /* Light Blue */
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    },
    heading: {
        marginBottom: '20px',
        textAlign: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '400px',
    },
    inputGroup: {
        marginBottom: '15px',
    },
    label: {
        display: 'block',
        marginBottom: '5px',
    },
    input: {
        width: '100%',
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ddd',
        boxSizing: 'border-box',
    },
    button: {
        padding: '10px',
        backgroundColor: '#4CAF50', /* Green */
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
    },
    message: {
        marginTop: '20px',
        textAlign: 'center',
    },
};
