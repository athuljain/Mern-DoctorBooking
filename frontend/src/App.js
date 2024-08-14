
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './Components/Login';
import RegisterPage from './Components/Register';
import AuthContext from './Context/AuthContext';
import Home from './Components/Home';
import BookAppointmentPage from './Components/BookAppointment';
import UserDetailsPage from './Components/UserDetailsPage';
import AdminLogin from './Components/AdminLogin';
import AdminDashBoard from './Components/AdminDashboard';
import AdminPage from './Components/AdminPage';
import AdminBookings from './Components/AdminBookings';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';

function App() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));
        if (token && user) {
            setUser({ token, ...user });
        }
    }, []);

    const login = (token, user) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        setUser({ token, ...user });
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    const values = {
        user, setUser, logout, login,
        name, setName, email, setEmail,
        password, setPassword, phone, setPhone,
        gender, setGender, age, setAge
    };

    return (
        <div className="App">
            <BrowserRouter>
                <AuthContext.Provider value={values}>
                <Navbar/>
                    <Routes>
                       
                        <Route path='/' element={<LoginPage />} />
                        <Route path='/register' element={<RegisterPage />} />
                        <Route path='/home' element={<Home />} />
                        <Route path='/booking' element={<BookAppointmentPage />} />
                        <Route path='/user' element={<UserDetailsPage />}/>

                        <Route path='/adminlogin' element={<AdminLogin />}/>
                        <Route path='/admin' element={<AdminDashBoard/>}/>
                        <Route path='/users' element={<AdminPage />}/>
                        <Route path='/bookings' element={<AdminBookings />}/>

                    </Routes>
                </AuthContext.Provider>
                <Footer/>
            </BrowserRouter>
        </div>
    );
}

export default App;
