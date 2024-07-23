import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ifetchWrapper } from '/fetchWrapper.js'; // Asegúrate de que la ruta sea correcta
import './ProjectView.css'; // Usa tu archivo CSS existente

function ProjectView() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        console.log(`Fetching project data from /projects/${projectId}`); // Añadido para depuración
        const response = await ifetchWrapper.fetchMethod({
          endpoint: `projects/${projectId}`,
          method: 'GET',
          credentials: 'include'
        });

        console.log(`Response received: ${response.status}`); // Mensaje de depuración

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const projectData = await response.json();
        console.log('Project data:', projectData); // Mensaje de depuración
        setProject(projectData);
      } catch (error) {
        console.error('Error fetching project data:', error);
        setError(error.message);
      }
    };

    fetchProjectData();
  }, [projectId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div className="project-view">
      <h1>Project Details</h1>
      <p><strong>Project Name:</strong> {project.nombre_proyecto}</p>
      <p><strong>Objective:</strong> {project.objetivo_proyecto}</p>
      <p><strong>Status:</strong> {project.estado_proyecto}</p>
      <p><strong>Members:</strong> {project.cantidad_miembros}</p>
    </div>
  );
}

export default ProjectView;
