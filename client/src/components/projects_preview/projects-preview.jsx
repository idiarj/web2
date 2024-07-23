import React from 'react';
import PropTypes from 'prop-types';

function ProjectsPreview({ projects }) {
  if (!projects || projects.length === 0) {
    return <div>No hay proyectos para mostrar</div>;
  }

  return (
    <div className="projects-preview">
      {projects.map((project, index) => (
        project && project.nombre_proyecto ? (
          <div key={index} className="project-card">
            <h3>{project.nombre_proyecto}</h3>
            <p>{project.descripcion}</p>
          </div>
        ) : (
          <div key={index} className="project-card">
            <h3>Nombre del proyecto no disponible</h3>
            <p>Descripción no disponible</p>
          </div>
        )
      ))}
    </div>
  );
}

ProjectsPreview.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.shape({
    nombre_proyecto: PropTypes.string,
    descripcion: PropTypes.string,
  })).isRequired,
};

export default ProjectsPreview;
