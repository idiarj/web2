import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, TextField, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Select, MenuItem } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { AddCircleOutline, ArrowBack, RemoveCircleOutline } from '@mui/icons-material';
import './ProjectView.css'; // Usa tu archivo CSS existente
import { ifetchWrapper } from '../../../fetchWrapper';
import arrow from '../../assets/arrowBack.png'

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
      
      {project ? (
        <>
          <aside className="dashboard-nav">
          <IconButton>
              <ArrowBack onClick={() => navigate('/projects')} /> 
          </IconButton>
            {/* Similar a tu navegación existente */}
          </aside>
          <main className="dashboard-content">
            <h1>Detalles del Proyecto</h1>

            <h2 className='project-title'>Título: {project.projectname}</h2>
            <div className='objectives'>
              <h3>Objetivos</h3>
              {Array.isArray(objectives) ? (
                objectives.map((o, index) => (
                  <p key={index}>{o.objetivo}</p>
                ))
              ) : (
                <p>No hay objetivos disponibles</p>
              )}
            </div>
            <section className='member-container'>
              <h3>Miembros</h3>
              <ul>
                {resources.map((member) => (
                  <li key={member.id_persona}>
                    {member.nombre_completo}
                  </li>
                ))}
              </ul>
            </section>
          </main>
        </>
      ) : (
        <div className="no-project-data">No hay datos del proyecto disponibles</div>
      )}
    </div>
  );
}

export default ProjectView;
