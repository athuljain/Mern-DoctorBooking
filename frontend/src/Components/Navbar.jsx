// import React from 'react';
// import { FaUser } from 'react-icons/fa';
// import './Style/Navbar.css';

// const Navbar = () => {
//     return (
//         <nav className="navbar">
//             <div className="navbar-logo">Book My Doctor</div>
//             <ul className="navbar-links">
//                 <li>
//                     <a href="/home">Home</a>
//                 </li>
//                 <li>
//                     <a href="#a">About</a>
//                 </li>
//                 <li>
//                     <a href="/user">
//                         <FaUser className="user-icon" /> User
//                     </a>
//                 </li>
//             </ul>
//         </nav>
//     );
// };

// export default Navbar;



import React, { useContext } from 'react';
import { FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../Context/AuthContext';
import './Style/Navbar.css';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">Book My Doctor</div>
            <ul className="navbar-links">
                <li>
                    <Link to="/home">Home</Link>
                </li>
                <li>
                    <Link to="#a">About</Link>
                </li>
                {user ? (
                    <>
                        <li>
                            <Link to="/user">
                                <FaUser className="user-icon" /> User
                            </Link>
                        </li>
                        <li>
                            <button className="logout-btn" onClick={handleLogout}>
                                Logout
                            </button>
                        </li>
                    </>
                ) : (
                    <li>
                        <Link to="/">Login</Link>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
