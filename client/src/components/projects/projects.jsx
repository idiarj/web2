import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Select, MenuItem } from '@mui/material';
// import { Autocomplete } from '@mui/lab';
import Autocomplete from '@mui/material/Autocomplete'; // Correct import for Autocomplete from MUI core
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import './projects.css';
import icon from '../../assets/icon.jpg';

import { ifetchWrapper } from '../../../public/fetchWrapper.js';

function Projects() {
  const [open, setOpen] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [members, setMembers] = useState([{ resource: '', roles: [] }]);
  const [resources, setResources] = useState([]);
  const [roles, setRoles] = useState([]);
  const [savedProjects, setSavedProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch users and roles from the backend
    const fetchResourcesAndRoles = async () => {
      try {
        const response = await ifetchWrapper.fetchMethod({
          endpoint: 'recursos',
          credentials: 'include'
        })
        if(response.ok){
          console.log(response)
          const data = await response.json()
          console.log(data)
          console.log(data.recursos)
          setResources(data.recursos)
          console.log('los recursos son', resources)
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
    // Agregar lógica para guardar el proyecto
    setSavedProjects([...savedProjects, projectName]);
    setProjectName('');
    handleClose();
  };

  return (
    
    <div className="dashboard-container">
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
                        options={resources}
                        getOptionLabel={(option) => option.recurso}
                        renderInput={(params) => <TextField {...params} label="Selecciona un miembro" />}
                        onChange={(event, newValue) => {
                          console.log(newValue);
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Select
                        multiple
                        value={member.roles}
                        onChange={(event) => handleRoleChange(index, event)}
                        fullWidth
                        renderValue={(selected) => selected.join(', ')}
                      >
                        {roles.map((role) => (
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
        {savedProjects.map((project, index) => (
          <div className="proyecto" key={index}>
            <div className="saved-project">
              <h2>{project}</h2>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

export default Projects;
