import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from "./components/LogIn/LogIn.jsx";
import Register from './components/register/register.jsx';
import ForgotPassword from './components/forgot-password/forgot-password.jsx'
import Dashboard from './components/dashboard/dashboard.jsx'
import { NotDone } from './components/not-done/not-done.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/logIn" />} />
        <Route path="/logIn" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/profile' element={<NotDone/>}/>
        <Route path='/settings' element={<NotDone/>}/>
        <Route path='/projects' element={<NotDone/>}/>
      </Routes>
    </Router>
  );
}

export default App;


