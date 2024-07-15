import { ifetchWrapper } from '../../public/fetchWrapper.js';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import icon from '../assets/icon.jpg'; 
import './login.css'; 
import '../App.css'; 

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();  

  const handleSubmit = async event => {
    event.preventDefault();

    if (!username || !password) {
      setError('Por favor complete ambos campos.');
      return;
    }

    try {
      const response = await ifetchWrapper.fetchMethod({
        endpoint: 'login',
        method: 'post',
        body: {
          username,
          password
        },
        credentials: 'include'
      });

      const data = await response.json();
      if (response.ok) {
        setError('');
        console.log(data.mensaje);
        navigate('/dashboard');  
      } else {
        if (typeof data.error === 'object' && data.error.issues) {
          setError(data.error.issues.map(issue => issue.message).join(', '));
        } else {
          setError(data.error || 'Ha ocurrido un error desconocido.');
        }
        console.error('Error recibido como objeto:', data.error);
        console.log('Error de inicio de sesión');
      }
    } catch (error) {
      setError('Error de conexión. Inténtalo nuevamente más tarde.');
      console.error('Error de red o de servidor:', error);
    }
  };

  return (
    <div className="login-container">
      <div className="form-section">
        <div className="company-name">
        <img src={icon} alt="Icon" className="icono-img" />
          <h1>ABC ProjectManager</h1>
        </div>

        <h2>Inicia sesión</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <label>
            Nombre de usuario:
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
          </label>
          <label>
            Contraseña:
            <div className="password-container">
              <input 
                type={showPassword ? 'text' : 'password'} 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                className="password-input"
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle-button"
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </label>
          <button type="submit" className="login-submit-button">Iniciar sesión</button>
          {error && <p className="error-message">{error}</p>}
        </form>
        <p className="register-link">
          ¿Olvidaste tu contraseña? <Link to="/forgot-password">Recupérala aquí</Link>
        </p>
        <p className="register-link">¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link></p>
      </div>
    </div>
  );
}

export default Login;
