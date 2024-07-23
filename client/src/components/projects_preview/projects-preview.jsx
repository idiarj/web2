import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './projects-preview.css';

function ProjectsPreview({ project }) {
  if (!project) {
    return <div className='noInfo'>No hay proyectos para mostrar</div>;
  }

  return (
    <div className="project-preview">
      <div className="project-info-container">
        <h3>{project.nombre_proyecto}</h3>
      </div>
      <div className="project-details-container">
        <p><strong>Objetivo:</strong> {project.objetivo_proyecto}</p>
        {/* Descomenta las siguientes líneas si deseas mostrar las fechas */}
        {/* <p><strong>Fecha de Inicio:</strong> {project.startDate}</p>
        <p><strong>Fecha de Fin:</strong> {project.endDate}</p> */}
        <p><strong>Estado:</strong> {project.estado_proyecto}</p>
        <p><strong>Miembros:</strong> {project.cantidad_miembros}</p>
      </div>
      <Link to={`/projects/${project.id_proyecto}`} className="project-view-link">
        Ver Detalles
      </Link>
    </div>
  );
}

ProjectsPreview.propTypes = {
  project: PropTypes.shape({
    id_proyecto: PropTypes.string.isRequired,
    nombre_proyecto: PropTypes.string,
    objetivo_proyecto: PropTypes.string,
    estado_proyecto: PropTypes.string,
    cantidad_miembros: PropTypes.string,
  }).isRequired,
};

export default ProjectsPreview;
