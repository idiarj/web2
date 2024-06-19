import { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/users')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setUsers(data))
      .catch(error => setError(error.toString()));
  }, []); // The empty array means this effect runs only once, after the first render

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {users.map(user => (
        <div key={user.id}>
          <h1>{user.name}</h1>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
