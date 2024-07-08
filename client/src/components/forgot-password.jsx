import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './forgot-password.css'; 

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/forgot-password', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        const data = await response.json();
        setMessage('Por favor, revisa tu correo electrónico para el enlace de restablecimiento de contraseña.');
      } else {
        setMessage('Error al solicitar el restablecimiento de contraseña.');
      }
    } catch (error) {
      setMessage('Error al enviar la solicitud.');
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Restablecer Contraseña</h2>
      <form onSubmit={handleSubmit} className="forgot-password-form">
        <label className='label'>
          Correo electrónico:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <button type="submit">Enviar solicitud</button>
      </form>
      {message && <p>{message}</p>}
      <p className="back-to-login">
        <Link to="/login">Volver al inicio de sesión</Link>
      </p>
    </div>
  );
}

export default ForgotPassword;