import useFetch from "../../hooks/UseFetch";
import '../assets/css/projects.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


function Projects() {
    const {data, loading, error } = useFetch("/api/projectIndex");
    const [selectedProjectId, setSelectedProjectId] = useState(null);
    const navigate = useNavigate(); 

    const handleOpenProject = (id) => {
        setSelectedProjectId(id);
        navigate('/projectDash', { state: { selectedProjectId: id } });
      };
      const goToProjectForm=()=>
      {
        navigate('/projectCreateForm');

      }
    return (
        <>
            <h1 id="projectHeading">Projects</h1>
            <button className="createProject" onClick={goToProjectForm} >Create Project</button>
            <div className="topBar">
                <i className="fa-solid fa-filter btn btn-link" id="filter"></i>
            </div>
            {data?.data?.length > 0 ? (
      data.data.map((project, index) => (
        <div key={project.id} className="projectCard">
          <ul>
            <li>{index + 1}</li>
            <li>{project.name}</li>
            <li>{project.status}</li>
            <li>
              <button className="projectBtn" onClick={() => handleOpenProject(project.id)}>Open</button>
            </li>
          </ul>
        </div>
      ))
    ) : (
      <p>No projects found.</p>
    )}

        </>
    );
}

export default Projects;
