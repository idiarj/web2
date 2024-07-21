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
        <h3>{project.nombre_proyecto}</h3>
      </div>
      <div className="project-details-container">
        <p>Objetivo: {project.objetivo_proyecto}</p>
        {/* <p>Fecha de Inicio: {project.startDate}</p>
        <p>Fecha de Fin: {project.endDate}</p> */}
        <p>Estado: {project.estado_proyecto}</p>
        <p>Miembros: {project.cantidad_miembros}</p>
      </div>
    </div>
  );
}

export default ProjectsPreview;