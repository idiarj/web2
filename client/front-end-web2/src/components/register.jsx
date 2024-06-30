import { useState } from 'react';
import { Link } from 'react-router-dom';
import './register.css'; 
import '../App.css'; 

function Register() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    username: '',
    correo: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = event => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async event => {
    event.preventDefault();

    // Validación de campos vacíos
    if (!formData.nombre || !formData.apellido || !formData.username || !formData.correo || !formData.password) {
      setError('Por favor complete todos los campos.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Registro exitoso:', data);
        setError(''); 
      } else {
        console.error('Error al registrar');
        setError('Error al registrar. Inténtelo de nuevo.');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setError('Error en la solicitud. Inténtelo de nuevo.');
    }
  };

  return (
    <div className="register-container">
      <div className="image-section">
        <img src="/src/assets/register.jpg" alt="Decorative" /> 
      </div>
      <div className="form-section">
        <div className="company-name">
          <h1>VIB ProjectManager</h1>
        </div>
        <h2>Registro</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <label>
            Nombre:
            <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
          </label>
          <label>
            Apellido:
            <input type="text" name="apellido" value={formData.apellido} onChange={handleChange} />
          </label>
          <label>
            Nombre de usuario:
            <input type="text" name="username" value={formData.username} onChange={handleChange} />
          </label>
          <label>
            Correo electrónico:
            <input type="email" name="correo" value={formData.correo} onChange={handleChange} />
          </label>
          <label>
            Contraseña:
            <input type="password" name="password" value={formData.password} onChange={handleChange} />
          </label>
          <button type="submit">Registrarse</button>
          {error && <p className="error-message">{error}</p>}
        </form>
        <p className="login-link">¿Ya tienes una cuenta? <Link to="/logIn">Inicia sesión aquí</Link></p>
      </div>
    </div>
  );
}

export default Register;
