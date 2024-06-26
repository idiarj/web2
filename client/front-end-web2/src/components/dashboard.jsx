import React from 'react';
import { Link } from 'react-router-dom';
import './dashboard.css'; 
import enproceso from '../assets/enproceso.jpg'; 

function Dashboard({ username }) {
  return (
    <div className="dashboard-container">
      <aside className="dashboard-nav">
        <ul>
          <li><Link to="/profile">Perfil</Link></li>
          <li><Link to="/settings">Configuraciones</Link></li>
          <li><Link to="/projects">Proyectos</Link></li>
          <li><Link to="/logout">Cerrar sesión</Link></li>
        </ul>
      </aside>
      <main className="dashboard-content">
        <h1>Bienvenido al Dashboard</h1>
        <img src={enproceso} alt="En Proceso" className="dashboard-image" /> 
      </main>
    </div>
  );
}

export default Dashboard;
