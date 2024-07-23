import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, TextField, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Select, MenuItem } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import './ProjectView.css'; // Usa tu archivo CSS existente

function ProjectView() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [resources, setResources] = useState([]);
  const [roles, setRoles] = useState([]);
  const [activities, setActivities] = useState([]);
  const [newActivity, setNewActivity] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const projectResponse = await fetch(`/api/projects/${projectId}`);
        const projectData = await projectResponse.json();
        setProject(projectData);

        const resourcesResponse = await fetch('/api/recursos');
        const resourcesData = await resourcesResponse.json();
        setResources(resourcesData.recursos);

        const rolesResponse = await fetch('/api/profiles/bussines');
        const rolesData = await rolesResponse.json();
        setRoles(rolesData.perfiles);

        // Aquí también puedes obtener actividades si es necesario
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchProjectData();
  }, [projectId]);

  const handleResourceChange = (index, newValue) => {
    if (newValue) {
      const updatedMembers = [...project.members];
      updatedMembers[index].resource = newValue;
      setProject({ ...project, members: updatedMembers });
    }
  };

  const handleRoleChange = (index, event) => {
    const updatedMembers = [...project.members];
    updatedMembers[index].roles = event.target.value;
    setProject({ ...project, members: updatedMembers });
  };

  const handleAddActivity = () => {
    if (newActivity) {
      setActivities([...activities, newActivity]);
      setNewActivity('');
    }
  };

  const handleRemoveActivity = (index) => {
    setActivities(activities.filter((_, i) => i !== index));
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...project, activities })
      });
      const result = await response.json();
      console.log('Project updated:', result);
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <aside className="dashboard-nav">
        {/* Similar a tu navegación existente */}
      </aside>
      <main className="dashboard-content">
        <h1>Detalles del Proyecto</h1>
        <TextField
          margin="dense"
          label="Nombre del Proyecto"
          type="text"
          fullWidth
          value={project.projectName}
          disabled
        />
        <TextField
          margin="dense"
          label="Descripción del Proyecto"
          type="text"
          fullWidth
          value={project.projectDescription}
          disabled
        />
        <div className="date-fields">
          <TextField
            margin="dense"
            label="Fecha de Inicio"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={project.startDate}
            disabled
          />
          <TextField
            margin="dense"
            label="Fecha de Fin"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={project.endDate}
            disabled
          />
        </div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Recurso</TableCell>
              <TableCell>Rol</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {project.members.map((member, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Autocomplete
                    options={resources}
                    getOptionLabel={(option) => option.recurso}
                    renderInput={(params) => <TextField {...params} label="Recurso" />}
                    value={member.resource}
                    onChange={(event, newValue) => handleResourceChange(index, newValue)}
                  />
                </TableCell>
                <TableCell>
                  <Select
                    multiple
                    value={member.roles}
                    onChange={(event) => handleRoleChange(index, event)}
                    renderValue={(selected) => selected.join(', ')}
                  >
                    {roles.map((role, roleIndex) => (
                      <MenuItem key={roleIndex} value={role}>
                        {role}
                      </MenuItem>
                    ))}
                  </Select>
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleRemoveMember(index)}>
                    <RemoveCircleOutline />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div>
          <h2>Actividades</h2>
          <div>
            <TextField
              margin="dense"
              label="Nueva Actividad"
              type="text"
              value={newActivity}
              onChange={(e) => setNewActivity(e.target.value)}
            />
            <Button onClick={handleAddActivity}>Agregar Actividad</Button>
          </div>
          <ul>
            {activities.map((activity, index) => (
              <li key={index}>
                {activity}
                <IconButton onClick={() => handleRemoveActivity(index)}>
                  <RemoveCircleOutline />
                </IconButton>
              </li>
            ))}
          </ul>
        </div>
        <Button onClick={handleSaveChanges}>Guardar Cambios</Button>
      </main>
    </div>
  );
}

export default ProjectView;
