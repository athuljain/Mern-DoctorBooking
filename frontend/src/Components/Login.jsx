// import React, {  useContext } from 'react';
// import axios from 'axios';
// import AuthContext from '../Context/AuthContext';
// import { Link } from 'react-router-dom';


// const LoginPage = () => {
   
//     const { login,email,setEmail,password, setPassword, } = useContext(AuthContext);
  

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('http://localhost:5001/api/v1/users/login', { email, password });
//             login(response.data.token);
         
//         } catch (error) {
//             console.error('Login failed:', error);
//         }
//     };

//     return (
//         <div>
//             <h2>Login</h2>
//             <form onSubmit={handleSubmit}>
//                 <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
//                 <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
//                 <button type="submit">Login</button>
//                 <p>dont have account <Link to={"/register"}>Sign up</Link></p>
//             </form>
//         </div>
//     );
// };

// export default LoginPage;



import React, { useContext } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from '../Context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();
    const { login, email, setEmail, password, setPassword } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5001/api/v1/users/login', { email, password });
            login(response.data.token);
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
        <div>
            <ToastContainer />
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
    );
};

export default LoginPage;
