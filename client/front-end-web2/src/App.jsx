// import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from "./components/LogIn.jsx";
import Register from './components/register.jsx';
import ForgotPassword from './components/forgot-password';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/logIn" />} />
        <Route path="/logIn" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
