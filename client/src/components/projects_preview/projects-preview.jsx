import React from 'react';
import PropTypes from 'prop-types';
import './projects-preview.css'

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
        <p>Objetivo: {project.objetivo_proyecto}</p>
        {/* <p>Fecha de Inicio: {project.startDate}</p>
        <p>Fecha de Fin: {project.endDate}</p> */}
        <p>Estado: {project.estado_proyecto}</p>
        <p>Miembros: {project.cantidad_miembros}</p>
      </div>
    </div>
  );
}

ProjectsPreview.propTypes = {
  projects: PropTypes.shape({
    nombre_proyecto: PropTypes.string,
    objetivo_proyecto: PropTypes.string,
    estado_proyecto: PropTypes.string,
    cantidad_miembros: PropTypes.string,
  }).isRequired,
};

export default ProjectsPreview;
