import { useState } from 'react';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [auth, setAuth] = useState(false)

  const handleSubmit = async event => {
    event.preventDefault();

    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      // Aquí puedes manejar la respuesta del servidor, por ejemplo, guardar el token de autenticación
      setAuth(true)
      console.log(data);
    } else {
      // Aquí puedes manejar los errores, por ejemplo, mostrar un mensaje de error
      console.log('Error de inicio de sesión');
    }
  };

  return (
    !auth ? 
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <button type="submit">Login</button>
    </form>
    : <section>
        <h1>Bienvenido, {username}</h1>
    </section>
  );
}

export default Login;