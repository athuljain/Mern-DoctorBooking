import React, { useEffect, useState } from 'react';
import {  BrowserRouter, Routes, Route } from 'react-router-dom';


import LoginPage from './Components/Login.jsx';
import RegisterPage from './Components/Register.jsx';

import AuthContext from './Context/AuthContext.js';

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
      if (token) {
          // Simulate fetching user data with the token
          setUser({ token });
      }
  }, []);

  const login = (token) => {
      localStorage.setItem('token', token);
      setUser({ token });
  };

  const logout = () => {
      localStorage.removeItem('token');
      setUser(null);
  };

const values={
  user, setUser, logout,login,age, setAge,
  name, setName,email,setEmail,password, setPassword,
  phone, setPhone, gender, setGender,
}


    return (
      <div className="App">

       <BrowserRouter>
       <AuthContext.Provider value={values}>
       <Routes>
        <Route path='/' element={<LoginPage />}/>
        <Route path='/register' element={<RegisterPage />}/>
       </Routes>
       </AuthContext.Provider>
       </BrowserRouter>
       </div>
    );
}

export default App;
