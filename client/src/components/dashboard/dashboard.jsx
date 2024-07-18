import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import icon from '../../assets/icon.jpg';
import './dashboard.css';

function Dashboard() {
  const navigate = useNavigate();

  async function handleLogout() {
    navigate('/login');
  }

  return (
    <div className="dashboard-container">
      <aside className="dashboard-nav">
        <ul>
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
        <p>Dashboard content here...</p>
      </main>
    </div>
  );
}

export default Dashboard;
