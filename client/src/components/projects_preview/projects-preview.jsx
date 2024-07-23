import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import './projects-preview.css';

function ProjectsPreview({ project }) {
  const navigate = useNavigate();

  if (!project) {
    return <div className='noInfo'>No hay proyectos para mostrar</div>;
  }

  const handleProjectClick = () => {
    navigate(`/projects/${project.id_proyecto}`); // Asegúrate de que `project.id_proyecto` sea el identificador correcto del proyecto
  };

  return (
    <div className="project-preview" onClick={handleProjectClick}>
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
  project: PropTypes.shape({
    id_proyecto: PropTypes.string.isRequired, // Asegúrate de que el id_proyecto esté definido y sea requerido
    nombre_proyecto: PropTypes.string,
    objetivo_proyecto: PropTypes.string,
    estado_proyecto: PropTypes.string,
    cantidad_miembros: PropTypes.string,
  }).isRequired,
};

export default ProjectsPreview;
