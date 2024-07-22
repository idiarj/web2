import { useEffect, useState } from 'react'; // Add useEffect import
import { useNavigate } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
import { ifetchWrapper } from '/fetchWrapper.js';
import './not-done.css'


export function NotDone(){
    const [username, setUsername] = useState('')
    const navigate = useNavigate();
    function handleClick(){
        
        navigate('/dashboard')
    }

    useEffect(() => {
        // Esta función se ejecutará solo una vez cuando el componente se monte
        const fetchData = async () => {
          const response = await ifetchWrapper.fetchMethod({
            endpoint: 'home',
            credentials: 'include'
          });
          if(!response.ok){
            console.log('estoy aqui')
            navigate('/login')
          }

          const data = await response.json();
          setUsername(data.user);
          console.log(data)
          console.log(data.user)
  
        };
    
        fetchData();
      }, [navigate])

    return (
        <div className='notDoneDiv'>
            Vista no hecha, disculpe las molestias, {username}.
            <button className='notDoneButton' onClick={handleClick}>Volver al dashboard</button>
        </div>
    )
}