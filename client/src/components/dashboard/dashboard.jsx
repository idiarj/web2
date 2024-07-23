import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import icon from '../../assets/icon.jpg';
import projectManagerImage from '../../assets/project-manager.png'; // Nueva imagen
import './dashboard.css';
import { ifetchWrapper } from '/fetchWrapper.js';

function Dashboard() {
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      const response = await ifetchWrapper.fetchMethod({
        endpoint: 'logout',
        method: 'post',
        credentials: 'include'
      });
      if (response.ok) {
        navigate('/login');
        console.log(response);
      } else {
        console.log(response);
        console.log('Error al cerrar sesión');
      }
    } catch (error) {
      console.log('Error al cerrar sesión:', error);
    }
  }

  return (
    <div className="dashboard-container">
      <aside className="dashboard-nav">
        <ul>
          <li><Link to="/dashboard">Home</Link></li>
          <li><Link to="/profile">Perfil</Link></li>
          <li><Link to="/calendar">Calendario</Link></li>
          <li><Link to="/projects">Proyectos</Link></li>
          <li><Link to="/login" onClick={handleLogout}>Cerrar sesión</Link></li>
        </ul>
      </aside>
      <main className="dashboard-content">
        <h1>
          <img src={icon} alt="Icon" className="icono-img" />
          ABC ProjectManager
        </h1>
        <img src={projectManagerImage} alt="Project Manager" className="dashboard-image" /> {/* Nueva imagen */}
      </main>
    </div>
  );
}

export default Dashboard;
