import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  Autocomplete,
  Typography
} from '@mui/material';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import './projects.css';
import icon from '../../assets/icon.jpg';
import { ifetchWrapper } from '/fetchWrapper.js';
import ProjectsPreview from '../projects_preview/projects-preview.jsx';

function Projects() {
  const [open, setOpen] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectObjective, setProjectObjective] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [members, setMembers] = useState([{ resource: null, roles: [] }]);
  const [resources, setResources] = useState([]);
  const [roles, setRoles] = useState([]);
  const [projectStatus, setProjectStatus] = useState('');
  const [savedProjects, setSavedProjects] = useState([]);
  const [states, setStates] = useState([])
  const navigate = useNavigate();
      const fetchResourcesAndRolesAndProjectsAndStates = async () => {
      try {
        const [resourcesResponse, rolesResponse, projectsResponse, statesResponse] = await Promise.all([
          ifetchWrapper.fetchMethod({ endpoint: 'recursos', credentials: 'include' }),
          ifetchWrapper.fetchMethod({ endpoint: 'profiles/bussines', credentials: 'include' }),
          ifetchWrapper.fetchMethod({ endpoint: 'projects', credentials: 'include' }),
          ifetchWrapper.fetchMethod({ endpoint: 'status', credentials: 'include' })
        ]);
  
        if (resourcesResponse.ok && rolesResponse.ok && projectsResponse.ok && statesResponse.ok) {
          const resourcesData = await resourcesResponse.json();
          const rolesData = await rolesResponse.json();
          const projectsData = await projectsResponse.json();
          const statesData = await statesResponse.json();
  
          // Imprime los datos de recursos para ver si hay duplicados
          console.log('Resources Data:', resourcesData.recursos);
  
          // Filtrar recursos únicos
          const uniqueResources = Array.from(new Set(resourcesData.recursos.map(item => item.cedula)))
            .map(cedula => {
              return resourcesData.recursos.find(item => item.cedula === cedula);
            });
  
          console.log('Unique Resources:', uniqueResources); // Imprime los recursos únicos
  
          setResources(uniqueResources);
          setRoles(rolesData.perfiles);
          setSavedProjects(projectsData.projects);
          setStates(statesData.status);
  
          if (statesData.status.length > 0) {
            setProjectStatus(statesData.status[0]); // Establece el valor inicial
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchResourcesAndRolesAndProjectsAndStates();
  }, []);
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError(''); // Clear errors on close
  };

  const handleProjectNameChange = (event) => {
    setProjectName(event.target.value);
  };

  const handleProjectDescriptionChange = (event) => {
    setProjectDescription(event.target.value);
  };

  const handleProjectObjectiveChange = (event) => {
    setProjectObjective(event.target.value);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleProjectStatusChange = (event) => {
    setProjectStatus(event.target.value);
  };

  const handleMemberChange = (index, newValue) => {
    if (newValue) {
      const newMembers = [...members];
      newMembers[index].resource = newValue;
      setMembers(newMembers);
    } else {
      console.warn('Selected value is null or undefined');
    }
  };

  const handleRoleChange = (index, event) => {
    const newMembers = [...members];
    newMembers[index].roles = event.target.value;
    setMembers(newMembers);
  };

  const handleAddMember = () => {
    setMembers([...members, { resource: null, roles: [] }]);
  };

  const handleRemoveMember = (index) => {
    const newMembers = members.filter((_, i) => i !== index);
    setMembers(newMembers);
  };

  const handleSaveProject = async () => {
    if (!projectName || !projectObjective || !startDate || !endDate || !projectStatus) {
      setError('Please fill all required fields.');
      return;
    }

    const projectData = {
      name: projectName,
      description: projectDescription,
      objective: projectObjective,
      startDate,
      endDate,
      status: projectStatus,
      members: members.map(member => ({
        cedula: member.resource?.cedula || '',
        profiles: member.roles
      }))
    };

    try {
      const response = await ifetchWrapper.fetchMethod({
        endpoint: 'projects',
        method: 'post',
        body: projectData,
        credentials: 'include'
      });

      const data = await response.json();
      if (response.ok) {
        setOpen(false);
        setSavedProjects([...savedProjects, data.project]); // Assuming the response contains the new project
        setError('');
      } else {
        setError('Failed to save project.');
      }
    } catch (error) {
      setError('Failed to save project.');
    }
  };

  const uniqueRoles = [...new Set(roles)];

  async function handleLogout() {
    navigate('/login');
  }

  return (
    <div className="dashboard-container">
      <aside className="dashboard-nav">
        <ul>
          <li><Link to="/dashboard">Home</Link></li>
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
        <Button variant="contained" color="primary" onClick={handleClickOpen} className="create-project-btn">
          CREA UN NUEVO PROYECTO!
        </Button>
        <Dialog open={open} onClose={handleClose} PaperProps={{ style: { width: '80%', maxWidth: '750px' } }}>
          <DialogTitle>Crear Proyecto</DialogTitle>
          <DialogContent>
            <div className="name-status-container">
              <TextField
                autoFocus
                margin="dense"
                label="Nombre del Proyecto"
                type="text"
                fullWidth
                value={projectName}
                onChange={handleProjectNameChange}
                className="normal-input"
              />
              <Select
                margin="dense"
                label="Estado del Proyecto"
                value={projectStatus}
                onChange={handleProjectStatusChange}
                className="estado-input"
                fullWidth
              >
                {states.map((state, index) => (
                  <MenuItem key={`${state}-${index}`} value={state}>
                    {state}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <TextField
              margin="dense"
              label="Objetivo del Proyecto"
              type="text"
              fullWidth
              value={projectObjective}
              onChange={handleProjectObjectiveChange}
              className="normal-input"
            />
            <div className="date-fields">
              <TextField
                margin="dense"
                label="Fecha de Inicio"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={startDate}
                onChange={handleStartDateChange}
                className="small-input"
              />
              <TextField
                margin="dense"
                label="Fecha de Fin"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={endDate}
                onChange={handleEndDateChange}
                className="small-input"
              />
            </div>
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
  options={resources}
  getOptionLabel={(option) => option.recurso || ''} // Asegúrate de que option.recurso esté definido
  renderInput={(params) => <TextField {...params} label="Recurso" />}
  value={member.resource || null}
  onChange={(event, newValue) => handleMemberChange(index, newValue)}
/>

                    </TableCell>
                    <TableCell>
                      <Select
                        multiple
                        value={member.roles}
                        onChange={(event) => handleRoleChange(index, event)}
                        renderValue={(selected) => selected.join(', ')}
                      >
                        {uniqueRoles.map((role, roleIndex) => (
                          <MenuItem key={`${role}-${roleIndex}`} value={role}>
                            {role}
                          </MenuItem>
                        ))}
                      </Select>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton onClick={handleAddMember}>
                        <AddCircleOutline />
                      </IconButton>
                      {members.length > 1 && (
                        <IconButton onClick={() => handleRemoveMember(index)}>
                          <RemoveCircleOutline />
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {error && <Typography color="error">{error}</Typography>}
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
        <ProjectsPreview projects={savedProjects} />
      </main>
    </div>
  );
}

export default Projects;
