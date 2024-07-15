import { ifetchWrapper } from '../../public/fetchWrapper.js';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import icon from '../assets/icon.jpg'; 
import './register.css'; 
import '../App.css'; 

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
  const [disable, setDisable] = useState(false)
  const [buttonText, setButtonText] = useState('Registrate');

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
  const navigate = useNavigate(); 

  const handleChange = event => {
    const { name, value } = event.target;
    console.log(name, value)
    if (name === 'cedula') {
      console.log(typeof name)
      // Asegura que solo se ingresen números
      const onlyNums = parseInt(value)
      console.log(onlyNums)
      console.log(typeof onlyNums)
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
      setDisable(true)
      const response = await ifetchWrapper.fetchMethod({
        endpoint: 'register',
        method: 'post',
        body: formData
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Registro exitoso:', data);
        setError(''); 
        navigate('/logIn'); 
      } else {
        console.error('Error al registrar', data);
        setError(`Error al registrar. ${data.error}`);
        setDisable(false)
      }
    } catch (error) {
      setDisable(false)
      console.error('Error en la solicitud:', error);
      setError('Error en la solicitud. Inténtelo de nuevo.');
    }
  };

  return (
    <div className="register-container">
      <div className="form-section">
        <div className="company-name">
          <img src={icon} alt="Icon" className="icono-img" />
          <h1>ABC ProjectManager</h1>
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
          Cedula de identiddad:
            <input type="number" name="cedula" value={formData.cedula} onChange={handleChange} />
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
          <button type="submit"  className={disable ? "disabledButton" : "enabledButton"} disabled={disable} >{buttonText}</button>
          {error && <p className="error-message">{error}</p>}
        </form>
        <p className="login-link">¿Ya tienes una cuenta? <Link to="/logIn">Inicia sesión aquí</Link></p>
      </div>
    </div>
  );
}

export default Register;
