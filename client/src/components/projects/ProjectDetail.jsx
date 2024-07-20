import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchWrapper } from '../../../public/fetchWrapper';

function ProjectDetail() {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null); // Initialize project state here
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await fetchWrapper.fetchMethod({
                endpoint: `/projects/${projectId}`,
                });
                const data = await response.json();
                setProject(data); // Set project data here
            } catch (error) {
                console.error('Error al cargar el proyecto:', error);
                setError('No se pudo cargar el proyecto.');
            }
        };

        fetchProject();
    }, [projectId]);

    const handleSave = async () => {
        try {
            const updatedProject = { ...project, name: projectName, objective: objective };
            await fetchWrapper.put(`/api/projects/${projectId}`, updatedProject);
            navigate('/projects');
        } catch (error) {
            console.error('Error al guardar los cambios del proyecto:', error);
            setError('No se pudieron guardar los cambios.');
        }
    };

    if (!project) return <div>Cargando...</div>;
    if (error) return <div className="register-error">{error}</div>;

    // Ensure you have projectName and objective defined or fetched from project state before using them
    const projectName = project ? project.name : '';
    const objective = project ? project.objective : '';

    return (
        <div>
            <h2>Editar Proyecto</h2>
            <div>
                <label>Nombre del Proyecto:</label>
                <input type="text" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
            </div>
            <div>
                <label>Objetivo:</label>
                <textarea value={objective} onChange={(e) => setObjective(e.target.value)} />
            </div>
            <button onClick={handleSave}>Guardar Cambios</button>
            {error && <div className="register-error">{error}</div>}
        </div>
    );
}

export default ProjectDetail;