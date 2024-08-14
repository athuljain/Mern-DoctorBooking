import React from 'react';
import { FaUser } from 'react-icons/fa';
import './Style/Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">MyApp</div>
            <ul className="navbar-links">
                <li>
                    <a href="#home">Home</a>
                </li>
                <li>
                    <a href="#about">About</a>
                </li>
                <li>
                    <a href="#user">
                        <FaUser className="user-icon" /> User
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
