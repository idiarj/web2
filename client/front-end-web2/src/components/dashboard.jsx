import { useState } from 'react';
import { Link } from 'react-router-dom';
import './dashboard.css'; 
import enproceso from '../assets/enproceso.jpg'; 

function Dashboard() {
  const [username, setUsername] = useState()
  // const response = fetch('http://localhost:3000/home')
  //                 .then(
  //                   response => console.log(response)
  //                     )
  //                   .catch(err => console.error(err))
    async function handleLogout(){
      const response = await fetch('http://localhost:3000/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      console.log(data)
    }

  return (
    <div className="dashboard-container">
      <aside className="dashboard-nav">
        <ul>
          <li><Link to="/profile">Perfil</Link></li>
          <li><Link to="/settings">Configuraciones</Link></li>
          <li><Link to="/projects">Proyectos</Link></li>
          <li><Link to="/logIn" onClick={handleLogout}>Cerrar sesión</Link></li>
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
