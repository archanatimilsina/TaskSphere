import React, { useEffect } from 'react';
import '../assets/css/projectDash.css';
import { useNavigate,useLocation } from 'react-router-dom';
import { useState } from 'react';
import styled from 'styled-components';


function ProjectDash() {  
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
            navigate('/react/projectManager/workspaceDash',{state:{workspaceId :id}});
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
              const response = await fetch(`/api/workspaceExtract/${selectedProjectId}`);
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
    navigate('/react/projectManager/workspaceCreateForm');
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
  


  .project-detail {
    padding: 20px;
    max-width: 700px;
    margin: auto;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .project-title {
    font-size: 28px;
    color: #1e293b;
    margin-bottom: 10px;
  }

  .project-description {
    color: #475569;
    margin-bottom: 20px;
  }

  .detail-row {
    margin-bottom: 10px;
    color: #334155;
  }

  .status-badge {
    padding: 4px 10px;
    border-radius: 8px;
    font-size: 12px;
    font-weight: bold;
  }

  .status-completed {
    background: #4ade80;
    color: #065f46;
  }

  .status-on-hold {
    background: #facc15;
    color: #78350f;
  }

  .status-not-started {
    background: #f87171;
    color: #7f1d1d;
  }

`;