import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from "./components/LogIn/LogIn.jsx";
import Register from './components/register/register.jsx';
import ForgotPassword from './components/forgot-password/forgot-password.jsx';
import Dashboard from './components/dashboard/dashboard.jsx';
import Projects from './components/projects/projects.jsx'; 
import { NotDone } from './components/not-done/not-done.jsx';
import { Testing } from './components/testing/testing.jsx';
import ProjectDetail from './components/projects/ProjectDetail.jsx';

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
        <Route path='/projects' element={<Projects/>}/>
        <Route path="/test" element={<Testing/>}/>
        <Route path="/projects/:projectId" element={<ProjectDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
