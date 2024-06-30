import { useState } from 'react';
import { Link } from 'react-router-dom';
import './login.css'; 
import '../App.css'; 

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [auth, setAuth] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async event => {
    event.preventDefault();

    // Validación de campos vacíos
    if (!username || !password) {
      setError('Por favor complete ambos campos.');
      return;
    }

    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      setAuth(true);
      setError('');  // Limpiar cualquier error previo
      console.log(data);
    } else {
      setError('Usuario y/o contraseña inválidos');
      console.log('Error de inicio de sesión');
    }
  };

  return (
    <div className="login-container">
      <div className="image-section">
        <img src="/src/assets/image.jpeg" alt="Decorative" /> 
      </div>
      <div className="form-section">
        <div className="company-name">
          <h1>VIB ProjectManager</h1>
        </div>
        {!auth ? (
          <>
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
            <p className="register-link">¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link></p>
          </>
        ) : (
          <section>
            <h1>Bienvenido, {username}</h1>
          </section>
        )}
      </div>
    </div>
  );
}

export default Login;
