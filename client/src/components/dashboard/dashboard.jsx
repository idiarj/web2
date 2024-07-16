import { ifetchWrapper } from '../../../public/fetchWrapper.js';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Select, MenuItem } from '@mui/material';
import { Autocomplete } from '@mui/lab';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import './dashboard.css';
import icon from '../../assets/icon.jpg';

function Dashboard() {
  const [username, setUsername] = useState();
  const [open, setOpen] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [members, setMembers] = useState([{ recurso: '', rol: '' }]);
  const [users, setUsers] = useState([]); 
  const [roles, setRoles] = useState([]); 
  const [savedProjectName, setSavedProjectName] = useState(''); 
  const [savedProjects, setSavedProjects] = useState([]); // lo agregue para poder almacenar proyectos guardados (Burgos)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await ifetchWrapper.fetchMethod({
        endpoint: 'home',
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        setUsername(data.user);
      } else {
        navigate('/login');
      }
    };

    fetchData();
  }, [navigate]);

  useEffect(() => {
    // Fetch users and roles from the backend
    const fetchResourcesAndRoles = async () => {
      try {
        const [usersResponse, rolesResponse] = await Promise.all([
          ifetchWrapper.fetchMethod({
            endpoint: 'users', // Ajusta el endpoint según tu backend
            credentials: 'include'
          }),
          ifetchWrapper.fetchMethod({
            endpoint: 'roles', // Ajusta el endpoint según tu backend
            credentials: 'include'
          })
        ]);

        if (usersResponse.ok && rolesResponse.ok) {
          const usersData = await usersResponse.json();
          const rolesData = await rolesResponse.json();
          setUsers(usersData.users); // Ajusta según la estructura de tus datos
          setRoles(rolesData.roles); // Ajusta según la estructura de tus datos
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchResourcesAndRoles();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleProjectNameChange = (event) => {
    setProjectName(event.target.value);
  };

  const handleMemberChange = (index, field, value) => {
    const newMembers = [...members];
    newMembers[index][field] = value;
    setMembers(newMembers);
  };

  const handleAddMember = () => {
    setMembers([...members, { recurso: '', rol: '' }]);
  };

  const handleRemoveMember = (index) => {
    const newMembers = members.filter((_, i) => i !== index);
    setMembers(newMembers);
  };

  const handleSaveProject = () => {
    // esto es para agregar el proyecto actual al arreglo de proyectos guardados
    setSavedProjects([...savedProjects, projectName]);
    setProjectName('');
    handleClose();
  };

  async function handleLogout() {
    const response = await ifetchWrapper.fetchMethod({
      endpoint: 'logout',
      method: 'post',
      credentials: 'include',
    });
    const data = await response.json();
    navigate('/login');
  }

  return (
    <div className="dashboard-container">
      <aside className="dashboard-nav">
        <ul>
          <li><Link to="/profile">Perfil</Link></li>
          <li><Link to="/calendar">Calendario</Link></li>
          <li><Link to="/projects">Proyectos</Link></li>
          <li><Link to="/login" onClick={handleLogout}>Cerrar sesión</Link></li>
        </ul>
      </aside>
      <main className="dashboard-content">
        <h1>
          <img src={icon} alt="Icon" className="icono-img" />
          ABC ProjectManager
        </h1>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          CREA UN NUEVO PROYECTO!
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Crear Proyecto</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Nombre del Proyecto"
              type="text"
              fullWidth
              value={projectName}
              onChange={handleProjectNameChange}
            />
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Recurso</TableCell>
                  <TableCell>Rol</TableCell>
                  <TableCell align="center">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {members.map((member, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Autocomplete
                        options={users}
                        getOptionLabel={(option) => option} 
                        value={member.recurso}
                        onChange={(event, newValue) => handleMemberChange(index, 'recurso', newValue)}
                        renderInput={(params) => <TextField {...params} label="Recurso" />}
                      />
                    </TableCell>
                    <TableCell>
                      {/* {'hpli'} */}
                      <Select
                        value={member.rol}
                        onChange={(e) => handleMemberChange(index, 'rol', e.target.value)}
                        fullWidth
                      >
                        {roles.map((rol) => (
                          <MenuItem key={rol} value={rol}>
                            {`holi ${rol}`}
                          </MenuItem>
                        ))}
                      </Select>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton onClick={() => handleRemoveMember(index)}>
                        <RemoveCircleOutline />
                      </IconButton>
                      {index === members.length - 1 && (
                        <IconButton onClick={handleAddMember}>
                          <AddCircleOutline />
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleSaveProject} color="primary">
              Guardar
            </Button>
          </DialogActions>
        </Dialog>
        {savedProjects.map((project, index) => (
          <div className="proyecto" >
          <div key={index} className="saved-project">
            <h2>{project}</h2>
          </div>
          </div>
        ))}
      </main>
    </div>
  );
}

export default Dashboard;
