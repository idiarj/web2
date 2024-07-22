import { ifetchWrapper } from '/fetchWrapper.js';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import icon from '../../assets/icon.jpg'; 
import './register.css'; 
import '../../App.css'; 

function Register() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    cedula: '',
    username: '',
    correo: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [disable, setDisable] = useState(false);
  const [buttonText, setButtonText] = useState('Registrate');
  const navigate = useNavigate();

  useEffect(() => {
    let intervalId;

    if (disable) {
      setButtonText('Registrando, por favor espera');
      let dots = 0;
      intervalId = setInterval(() => {
        dots = (dots + 1) % 4;
        const text = 'Registrando, por favor espera' + '.'.repeat(dots);
        setButtonText(text);
      }, 500); // Cambia el texto cada 500ms
    } else {
      setButtonText('Registrate');
    }

    return () => clearInterval(intervalId); // Limpia el intervalo cuando el componente se desmonta o el estado `disable` cambia
  }, [disable]);

  const handleChange = event => {
    const { name, value } = event.target;
    if (name === 'cedula') {
      const onlyNums = isNaN(parseInt(value)) ? '' : parseInt(value);
      setFormData(prevState => ({
        ...prevState,
        [name]: onlyNums
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();

    if (!formData.nombre || !formData.apellido || !formData.username || !formData.correo || !formData.password || !formData.cedula) {
      setError('Por favor complete todos los campos.');
      return;
    }

    try {
      setDisable(true);
      const response = await ifetchWrapper.fetchMethod({
        endpoint: 'register',
        method: 'post',
        body: formData
      });
      const data = await response.json();
      if (response.ok) {
        setError('');
        navigate('/logIn'); 
      } else {
        setError(`Error al registrar. ${data.error}`);
        setDisable(false);
      }
    } catch (error) {
      setError('Error en la solicitud. Inténtelo de nuevo.');
      setDisable(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-header">
        <img src={icon} alt="icon" className="register-icon" />
        <h1 className="register-title">ABC ProjectManager</h1>
      </div>
      {error && <p className="register-error">{error}</p>}
      <form onSubmit={handleSubmit} className="register-form">
        <div className="register-name-fields">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="apellido"
            placeholder="Apellido"
            value={formData.apellido}
            onChange={handleChange}
            required
          />
        </div>
        <input
          type="text"
          name="cedula"
          placeholder="Cédula"
          value={formData.cedula === null ? '' : formData.cedula}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="username"
          placeholder="Nombre de usuario"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="correo"
          placeholder="Correo electrónico"
          value={formData.correo}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className={disable ? "disabledButton" : "enabledButton"} disabled={disable}>
          {buttonText}
        </button>
      </form>
      <p className="register-footer">
        ¿Ya tienes una cuenta? <Link to="/logIn">Inicia sesión aquí</Link>
      </p>
    </div>
  );
}

export default Register;
