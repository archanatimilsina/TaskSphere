import React, { useEffect } from 'react';
import '../assets/css/projectDash.css';
import { useNavigate,useLocation } from 'react-router-dom';
import { useState } from 'react';


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
            const response = await fetch(`/api/projectShow/${selectedProjectId}`);
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
