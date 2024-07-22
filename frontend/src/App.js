// import React, { useEffect, useState } from 'react';
// import {  BrowserRouter, Routes, Route } from 'react-router-dom';
// import LoginPage from './Components/Login.jsx';
// import RegisterPage from './Components/Register.jsx';
// import AuthContext from './Context/AuthContext.js';
// import Home from './Components/Home.jsx';
// import BookAppointmentPage from './Components/BookAppointment.jsx';

// function App() {

//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [phone, setPhone] = useState('');
//   const [gender, setGender] = useState('');
//   const [age, setAge] = useState('');

//   const [user, setUser] = useState(null);

//   useEffect(() => {
//       const token = localStorage.getItem('token');
//       if (token) {
//           // Simulate fetching user data with the token
//           setUser({ token });
//       }
//   }, []);

//   const login = (token) => {
//       localStorage.setItem('token', token);
//       setUser({ token });
//   };

//   const logout = () => {
//       localStorage.removeItem('token');
//       setUser(null);
//   };

// const values={
//   user, setUser, logout,login,age, setAge,
//   name, setName,email,setEmail,password, setPassword,
//   phone, setPhone, gender, setGender,
// }


//     return (
//       <div className="App">

//        <BrowserRouter>
//        <AuthContext.Provider value={values}>
//        <Routes>
//         <Route path='/' element={<LoginPage />}/>
//         <Route path='/register' element={<RegisterPage />}/>
//         <Route path='/home' element={<Home />}/>
//         <Route path='/booking' element={<BookAppointmentPage />}/>
//        </Routes>
//        </AuthContext.Provider>
//        </BrowserRouter>
//        </div>
//     );
// }

// export default App;



import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './Components/Login.jsx';
import RegisterPage from './Components/Register.jsx';
import AuthContext from './Context/AuthContext.js';
import Home from './Components/Home.jsx';
import BookAppointmentPage from './Components/BookAppointment.jsx';

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
    console.log("logindata",login);

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
                    <Routes>
                        <Route path='/' element={<LoginPage />} />
                        <Route path='/register' element={<RegisterPage />} />
                        <Route path='/home' element={<Home />} />
                        <Route path='/booking' element={<BookAppointmentPage />} />
                    </Routes>
                </AuthContext.Provider>
            </BrowserRouter>
        </div>
    );
}

export default App;
