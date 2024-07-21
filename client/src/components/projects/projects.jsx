import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Select, MenuItem } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import './projects.css';
import icon from '../../assets/icon.jpg';
import { ifetchWrapper } from '../../../public/fetchWrapper.js';
import ProjectsPreview from '../projects_preview/projects-preview.jsx';

function Projects() {
  const [open, setOpen] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectObjective, setProjectObjective] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [members, setMembers] = useState([{ resource: '', roles: [] }]);
  const [resources, setResources] = useState([]);
  const [roles, setRoles] = useState([]);
  const [projectStatus, setProjectStatus] = useState('activo');
  const [savedProjects, setSavedProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResourcesAndRolesAndProjects = async () => {
      try {
        const fetchResources = ifetchWrapper.fetchMethod({
          endpoint: 'recursos',
          credentials: 'include'
        });
        const fetchRoles = ifetchWrapper.fetchMethod({
          endpoint: 'profiles/bussines',
          credentials: 'include'
        });

        const fetchProjects = ifetchWrapper.fetchMethod({
          endpoint: 'projects',
          credentials: 'include'
        })

        const [resourcesResponse, rolesResponse, projectsResponse] = await Promise.all([fetchResources, fetchRoles, fetchProjects]);

        if (resourcesResponse.ok && rolesResponse.ok && projectsResponse) {
          const resourcesData = await resourcesResponse.json();
          const rolesData = await rolesResponse.json();
          const projectsData = await projectsResponse.json()
          console.log(projectsData)
          setResources(resourcesData.recursos);
          setRoles(rolesData.perfiles);
          setSavedProjects(projectsData.projects)
          console.log(savedProjects)
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchResourcesAndRolesAndProjects();
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
    const newMembers = [...members];
    newMembers[index].resource = newValue;
    setMembers(newMembers);
  };

  const handleRoleChange = (index, event) => {
    const newMembers = [...members];
    newMembers[index].roles = event.target.value;
    setMembers(newMembers);
  };

  const handleAddMember = () => {
    setMembers([...members, { resource: '', roles: [] }]);
  };

  const handleRemoveMember = (index) => {
    const newMembers = members.filter((_, i) => i !== index);
    setMembers(newMembers);
  };

  const handleSaveProject = () => {
    setSavedProjects([...savedProjects, {
      name: projectName,
      description: projectDescription,
      objective: projectObjective,
      startDate,
      endDate,
      status: projectStatus,
      members: members.map(member => ({
        resourceId: member.resource.id,
        roles: member.roles
      }))
    }]);
    setProjectName('');
    setProjectDescription('');
    setProjectObjective('');
    setStartDate('');
    setEndDate('');
    setProjectStatus('activo');
    setMembers([{ resource: '', roles: [] }]);
    handleClose();
  };

  // Eliminar roles duplicados
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
        onChange={(event) => setProjectStatus(event.target.value)}
        className="estado-input"
        fullWidth
      >
        <MenuItem value="activo">Activo</MenuItem>
        <MenuItem value="en pausa">En Pausa</MenuItem>
        <MenuItem value="terminado">Terminado</MenuItem>
        <MenuItem value="cancelado">Cancelado</MenuItem>
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
        getOptionLabel={(option) => option.recurso}
        renderInput={(params) => <TextField {...params} label="Miembros" />}
        className='members-select'
        onChange={(event, newValue) => handleMemberChange(index, newValue)}
        disableCloseOnSelect />
        </TableCell>
            <TableCell>
              <Select
                multiple
                value={member.roles}
                onChange={(event) => handleRoleChange(index, event)}
                fullWidth
                renderValue={(selected) => selected.length === 0 ? "Roles" : selected.join(', ')}
                className='roles-select'
                displayEmpty
                autoComplete="off"
              >
                <MenuItem disabled value="">
                  Selecciona roles
                </MenuItem>
                {uniqueRoles.map((role) => (
                  <MenuItem key={role} value={role}>
                    {role}
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
        <div>
          <div>
            <h2>Proyectos Guardados</h2>
            <div className="projects-grid">
              {savedProjects.length === 0 ? (
                <p>No hay proyectos guardados</p>
              ) : (
                savedProjects.map((project) => (
                  <ProjectsPreview key={project.id} project={project} />
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Projects;
