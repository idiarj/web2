import React from 'react';
import { useNavigate } from 'react-router-dom';
import './projects-preview.css';


function ProjectsPreview({ project }) {
  const navigate = useNavigate();

  const handleOpenProject = () => {
    navigate(`/projects/${project.id}`);
  };

  return (
    <div className="project-preview" onClick={handleOpenProject}>
      <div className="project-info-container">
        <h3>{project.name}</h3>
        <p>{project.description}</p>
      </div>
      <div className="project-details-container">
        <p>Objetivo: {project.objective}</p>
        <p>Fecha de Inicio: {project.startDate}</p>
        <p>Fecha de Fin: {project.endDate}</p>
        <p>Estado: {project.status}</p>
        <p>Miembros: {project.members.length}</p>
      </div>
    </div>
  );
}

export default ProjectsPreview;