import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from "./components/LogIn.jsx";
import Register from './components/register.jsx';
import Dashboard from './components/dashboard.jsx'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/logIn" />} />
        <Route path="/logIn" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;


