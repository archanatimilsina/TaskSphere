import React, { useEffect } from 'react';
import '../assets/css/projectDash.css';
import { useNavigate,useLocation } from 'react-router-dom';
import { useState } from 'react';
import styled from 'styled-components';


function ProjectDash() {  
    
    // const { data, loading: projectLoading, error: projectError } = useFetch(`/api/projectShow/${selectedProjectId}`);
    //  const {data: workspaceData, loading: workspaceLoading, error: workspaceError }= useFetch(`/api/workspaceExtract/${selectedProjectId}`);
    
    
    const location= useLocation();
    const { selectedProjectId } = location.state; 
    const navigate=useNavigate();
    
    const [projectData, setProjectData] = useState(null);
    const [workspaceData, setWorkspaceData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [workspaceId,setWorkspaceId]=useState(null);
   
        const WorkspaceDash=(id)=>
        {
            setWorkspaceId(id);
            navigate('/workspaceDash',{state:{workspaceId :id}});
        }
    useEffect(() => {
        // Fetch project details
        const fetchProjectData = async () => {
          try {
            const response = await fetch(`http://localhost:8000/api/projectShow/${selectedProjectId}`);
            if (!response.ok) throw new Error('Failed to fetch project data');
            const data = await response.json();
            console.log(data);
            setProjectData(data.data); // assuming data.data is the required info
          } catch (err) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
        };
    
        // Fetch workspaces
        const fetchWorkspaceData = async () => {
            try {
              const response = await fetch(`http://localhost:8000/api/workspaceExtract/${selectedProjectId}`);
              if (!response.ok) throw new Error('Failed to fetch workspaces');
              const data = await response.json();
              console.log(data); // Check that data.data contains the array
              setWorkspaceData(data.data); // Set the array from the `data` property
            } catch (err) {
              setError(err.message);
            } finally {
              setLoading(false);
            }
          };
    
        // Call fetch functions together
        fetchProjectData();
        fetchWorkspaceData();
      }, [selectedProjectId]);
    
   const CreateWorkspace=()=>
   {
    navigate('/workspaceCreateForm');
   }
    return (
    <>
      <div className="project-dash-wrapper">
            <h1>{projectData?.name}</h1>
            <button id="createWorkspace" onClick={CreateWorkspace}>Create Workspace</button>

            <div className="projectIntro">
                <h2>Project Details</h2>
                <div className="details">
                    <div><span>Name:</span><p>{projectData?.name}</p></div>
                    <div><span>Description:</span><p>{projectData?.description}</p></div>
                    <div><span>Start Date:</span><p>{projectData?.sdate}</p></div>
                    <div><span>End Date:</span><p>{projectData?.edate}</p></div>
                    <div><span>Members:</span> 
                    <div>
    {projectData?.members?.includes('[') && (JSON.parse(projectData?.members)?.map((member, index) => (
      <p key={index}>{member}</p>
)))}
  </div>
  </div>
                    <div><span>Leader:</span><p>{projectData?.leader}</p></div>
                    <div><span>Workspace Count:</span><p>{projectData?.workspaceCount}</p></div>
                    <div><span>Status:</span><p>{projectData?.status}</p></div>
                </div>
            </div>

     <h1>Workspaces</h1>  
<div className="projectDashWorkspaceIndex">
    {workspaceData?.length > 0 ? (
        workspaceData.map((workspace, index) => (
            <div key={index} className="ProjectWorkspaceData">
                <ul>
                    <li><strong>{workspace?.name}</strong></li>
                    <li><button className="statusBtn" onClick={() => WorkspaceDash(workspace.id)}>Open</button></li>
                </ul>
            </div>
        ))
    ) : (
        <p>No workspaces available.</p>
    )}
</div>

     </div> 
    </>
  );
}

export default ProjectDash;


const ProjectDashContainer = styled.div`
  
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.project-dash-wrapper {
    background-color: #f4f5f7;
    font-family: 'Baloo 2', cursive;
    color: #333;
    padding: 20px;
    min-height: 100vh;
}

.project-dash-wrapper h1 {
    font-size: 3rem;
    text-align: center;
    color: #10b981;
    margin: 40px 0 30px 0;
}

#createWorkspace {
    background-color: #10b981;
    color: white;
    font-weight: bold;
    font-size: 1rem;
    padding: 10px 20px;
    border-radius: 30px;
    border: none;
    cursor: pointer;
    position: fixed;
    right: 50px;
    top: 50px;
    transition: background-color 0.3s ease;
}

#createWorkspace:hover {
    background-color: #22c55e;
}

.projectIntro {
    width: 80%;
    max-width: 900px;
    background-color: #ffffff;
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    margin: 0 auto 40px auto;
}

.projectIntro h2 {
    font-size: 2.5rem;
    color: #2d3748;
    text-align: center;
    margin-bottom: 20px;
}

.details {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 20px;
    font-size: 1.1rem;
    line-height: 1.8;
}

.details span {
    font-weight: bold;
    color: #2d3748;
}

.details p {
    margin: 0;
    color: #555;
}

.projectDashWorkspaceIndex {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    justify-content: center;
    max-height: 500px;
    overflow-y: auto;
    padding: 10px 20px;
}

.ProjectWorkspaceData {
    background-color: #1e293b;
    border-radius: 15px;
    width: 280px;
    padding: 20px;
    color: white;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.ProjectWorkspaceData:hover {
    transform: translateY(-10px);
    box-shadow: 0 6px 12px rgba(0, 255, 170, 0.3);
}

.ProjectWorkspaceData ul {
    list-style: none;
    padding: 0;
}

.ProjectWorkspaceData ul li {
    margin: 10px 0;
    font-size: 1.2rem;
}

.statusBtn {
    background-color: #10b981;
    color: white;
    border: none;
    border-radius: 20px;
    padding: 10px 20px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.statusBtn:hover {
    background-color: #22c55e;
}

@media (max-width: 768px) {
    .projectDashWorkspaceIndex {
        flex-direction: column;
        align-items: center;
    }

    .ProjectWorkspaceData {
        width: 90%;
    }
}

`;