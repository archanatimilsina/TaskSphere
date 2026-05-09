import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

function ProjectDash() {
    const location = useLocation();
    // Safely extract selectedProjectId from location state
    const selectedProjectId = location.state?.selectedProjectId;
    const navigate = useNavigate();

    const [projectData, setProjectData] = useState(null);
    const [workspaceData, setWorkspaceData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleWorkspaceDash = (id) => {
        navigate('/workspaceDash', { state: { workspaceId: id } });
    };

    useEffect(() => {
        if (!selectedProjectId) {
            setError("No project ID found. Please go back and select a project.");
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            try {
                setLoading(true);
                // Fetch project details and workspaces in parallel
                const [projectRes, workspaceRes] = await Promise.all([
                    fetch(`/api/projectShow/${selectedProjectId}`),
                    fetch(`/api/workspaceExtract/${selectedProjectId}`)
                ]);

                if (!projectRes.ok || !workspaceRes.ok) {
                    throw new Error('Failed to fetch project or workspace data');
                }

                const projectJson = await projectRes.json();
                const workspaceJson = await workspaceRes.json();

                setProjectData(projectJson.data);
                setWorkspaceData(workspaceJson.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [selectedProjectId]);

    const handleCreateWorkspace = () => {
        navigate('/react/projectManager/workspaceCreateForm');
    };

    if (loading) return <StatusMessage>Loading Project Dashboard...</StatusMessage>;
    if (error) return <StatusMessage className="error">Error: {error}</StatusMessage>;

    // Helper to safely parse members
    const renderMembers = () => {
        if (!projectData?.members) return "No members assigned";
        try {
            const membersArray = typeof projectData.members === 'string' 
                ? JSON.parse(projectData.members) 
                : projectData.members;
            
            return membersArray.map((member, index) => (
                <p key={index} className="member-item">{member}</p>
            ));
        } catch (e) {
            return <p>{projectData.members}</p>;
        }
    };

    return (
        <ProjectDashContainer>
            <div className="project-dash-wrapper">
                <button id="createWorkspace" onClick={handleCreateWorkspace}>
                    + Create Workspace
                </button>

                <h1>{projectData?.name || "Project Dashboard"}</h1>

                <div className="projectIntro">
                    <h2>Project Details</h2>
                    <div className="details">
                        <span>Name:</span>
                        <p>{projectData?.name}</p>

                        <span>Description:</span>
                        <p>{projectData?.description}</p>

                        <span>Start Date:</span>
                        <p>{projectData?.sdate}</p>

                        <span>End Date:</span>
                        <p>{projectData?.edate}</p>

                        <span>Members:</span>
                        <div className="members-list">
                            {renderMembers()}
                        </div>

                        <span>Leader:</span>
                        <p>{projectData?.leader}</p>

                        <span>Workspaces:</span>
                        <p>{projectData?.workspaceCount}</p>

                        <span>Status:</span>
                        <p className={`status-text ${projectData?.status?.toLowerCase()}`}>
                            {projectData?.status}
                        </p>
                    </div>
                </div>

                <h1>Workspaces</h1>
                <div className="projectDashWorkspaceIndex">
                    {workspaceData && workspaceData.length > 0 ? (
                        workspaceData.map((workspace, index) => (
                            <div key={workspace.id || index} className="ProjectWorkspaceData">
                                <ul>
                                    <li><strong>{workspace?.name}</strong></li>
                                    <li>
                                        <button 
                                            className="statusBtn" 
                                            onClick={() => handleWorkspaceDash(workspace.id)}
                                        >
                                            Open Workspace
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        ))
                    ) : (
                        <p className="no-data">No workspaces available for this project.</p>
                    )}
                </div>
            </div>
        </ProjectDashContainer>
    );
}

const StatusMessage = styled.div`
    text-align: center;
    padding: 50px;
    font-size: 1.5rem;
    font-family: 'Baloo 2', cursive;
    &.error { color: #ef4444; }
`;

const ProjectDashContainer = styled.div`
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
        padding: 12px 24px;
        border-radius: 30px;
        border: none;
        cursor: pointer;
        position: fixed;
        right: 30px;
        top: 30px;
        z-index: 10;
        box-shadow: 0 4px 10px rgba(16, 185, 129, 0.4);
        transition: all 0.3s ease;

        &:hover {
            background-color: #059669;
            transform: scale(1.05);
        }
    }

    .projectIntro {
        width: 90%;
        max-width: 900px;
        background-color: #ffffff;
        padding: 30px;
        border-radius: 15px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
        margin: 0 auto 40px auto;

        h2 {
            font-size: 2.2rem;
            color: #1e293b;
            text-align: center;
            margin-bottom: 25px;
            border-bottom: 2px solid #f1f5f9;
            padding-bottom: 10px;
        }
    }

    .details {
        display: grid;
        grid-template-columns: 150px 1fr;
        gap: 15px;
        font-size: 1.1rem;
        line-height: 1.6;

        span {
            font-weight: bold;
            color: #64748b;
        }

        p {
            color: #1e293b;
        }

        .members-list {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            .member-item {
                background: #f1f5f9;
                padding: 2px 10px;
                border-radius: 5px;
                font-size: 0.95rem;
            }
        }
    }

    .projectDashWorkspaceIndex {
        display: flex;
        flex-wrap: wrap;
        gap: 25px;
        justify-content: center;
        padding: 20px;
    }

    .ProjectWorkspaceData {
        background-color: #1e293b;
        border-radius: 15px;
        width: 280px;
        padding: 25px;
        color: white;
        text-align: center;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease, box-shadow 0.3s ease;

        &:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 25px -5px rgba(16, 185, 129, 0.2);
        }

        ul {
            list-style: none;
            padding: 0;
            li {
                margin: 15px 0;
                font-size: 1.3rem;
            }
        }
    }

    .statusBtn {
        background-color: #10b981;
        color: white;
        border: none;
        border-radius: 10px;
        padding: 10px 25px;
        font-weight: bold;
        cursor: pointer;
        transition: background 0.3s ease;

        &:hover {
            background-color: #059669;
        }
    }

    .no-data {
        text-align: center;
        color: #94a3b8;
        font-style: italic;
    }

    @media (max-width: 768px) {
        #createWorkspace {
            position: static;
            display: block;
            margin: 20px auto;
        }
        .details {
            grid-template-columns: 1fr;
            gap: 5px;
            span { margin-top: 10px; }
        }
    }
`;

export default ProjectDash;