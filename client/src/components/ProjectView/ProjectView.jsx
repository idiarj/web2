import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, TextField, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Select, MenuItem } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import './ProjectView.css'; // Usa tu archivo CSS existente
import { ifetchWrapper } from '../../../fetchWrapper';

function ProjectView() {
  const { projectId } = useParams();
  const [project, setProject] = useState({});
  const [resources, setResources] = useState([]);
  const [roles, setRoles] = useState([]);
  const [activities, setActivities] = useState([]);
  const [newActivity, setNewActivity] = useState('');
  const [objectives, setObjective] = useState('')
  const navigate = useNavigate();


  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        console.log('holi')
        const [projectResponse, activitiesResponse] = await Promise.all([
          ifetchWrapper.fetchMethod({
            endpoint: `projects/${projectId}`,
            credentials: 'include'
          }),
          // ifetchWrapper.fetchMethod({
          //   endpoint: `activities/${projectId}`,
          // }),
        ])
        console.log('hola')
        // const activitiesData = await activitiesResponse.json();
        const {projectInfo, members, objectives} = await projectResponse.json();
        console.log(projectResponse)
        console.log('projectData', projectInfo);
        console.log('membersData', members)
        console.log('objectivesData', objectives)
        if(projectResponse.ok){
          setProject(projectInfo)
          setResources(members) // Actualizado para usar la respuesta del backend
          setObjective(objectives) // Actualizado para usar la respuesta del backend
          console.log('project es', project)
          console.log('resources', resources)
          console.log('objetivos',objectives)
        }

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

  // if (!project) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="dashboard-container">
     { project ? (
      <><aside className="dashboard-nav">
          {/* Similar a tu navegación existente */}
        </aside><main className="dashboard-content">
            <h1>Detalles del Proyecto</h1>
            {/* <TextField
              margin="dense"
              label="Nombre del Proyecto"
              type="text"
              fullWidth
              value={project.projectName}
              disabled />
            <TextField
              margin="dense"
              label="Descripción del Proyecto"
              type="text"
              fullWidth
              value={objectives.objetivo}
              disabled />
            <div className="date-fields">
              <TextField
                margin="dense"
                label="Fecha de Inicio"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={project.startDate}
                disabled />
              <TextField
                margin="dense"
                label="Fecha de Fin"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={project.endDate}
                disabled />
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
                {resources.map((member, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Autocomplete
                        options={resources}
                        getOptionLabel={(option) => option.nombre_completo}
                        renderInput={(params) => <TextField {...params} label="Recurso" />}
                        value={member.resource}
                        onChange={(event, newValue) => handleResourceChange(index, newValue)} />
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
                  onChange={(e) => setNewActivity(e.target.value)} />
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
            <Button onClick={handleSaveChanges}>Guardar Cambios</Button> */}
            <h2>Titulo: {project.projectname}</h2>
            <div>
              <h3 style={{color: 'black'}}>Objetivos</h3>
              {
                Array.isArray(objectives) ? objectives.map((o)=>{
                  return <p>{o.objetivo}</p>
                }) : <p>No objectives available</p>
              }
            </div>
            <section style={{backgroundColor: 'black'}}>
              Miembros
              <ul>
                {resources.map((member) => (
                  <li key={member.id_persona}>
                    {member.nombre_completo}
                  </li>
                ))}
                </ul>
            </section>
          </main></>) : (
      <div>No project data available</div>
      )}
    </div>
  );
}

export default ProjectView;
