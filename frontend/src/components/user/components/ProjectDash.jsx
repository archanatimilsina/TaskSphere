import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

function UserProjectDash() {
    const location = useLocation();
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
            setError("Project context missing. Please select a project from your list.");
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            try {
                setLoading(true);
                // Synchronized parallel fetching
                const [projectRes, workspaceRes] = await Promise.all([
                    fetch(`http://localhost:8000/api/projectShow/${selectedProjectId}`),
                    fetch(`http://localhost:8000/api/workspaceExtract/${selectedProjectId}`)
                ]);

                if (!projectRes.ok || !workspaceRes.ok) {
                    throw new Error('Sync failed: Could not retrieve project architecture.');
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
        navigate('/react/projectManager/workspaceCreateForm', { state: { projectId: selectedProjectId } });
    };

    if (loading) return <StatusMessage>Initialising project environment...</StatusMessage>;
    if (error) return <StatusMessage className="error">{error}</StatusMessage>;

    const renderMembers = () => {
        if (!projectData?.members) return <em>No team members assigned.</em>;
        try {
            const membersArray = typeof projectData.members === 'string' 
                ? JSON.parse(projectData.members) 
                : projectData.members;
            
            return membersArray.map((member, index) => (
                <span key={index} className="member-pill">
                    <i className="fa-solid fa-user-tag"></i> {member}
                </span>
            ));
        } catch (e) {
            return <span>{projectData.members}</span>;
        }
    };

    return (
        <ProjectDashContainer>
            <div className="header-actions">
                <button className="back-btn" onClick={() => navigate(-1)}>
                    <i className="fa-solid fa-chevron-left"></i> Projects
                </button>
                <button id="createWorkspace" onClick={handleCreateWorkspace}>
                    <i className="fa-solid fa-plus"></i> New Workspace
                </button>
            </div>

            <main className="dash-content">
                <section className="project-overview">
                    <div className="title-section">
                        <h1>{projectData?.name}</h1>
                        <span className={`status-badge ${projectData?.status?.toLowerCase()}`}>
                            {projectData?.status}
                        </span>
                    </div>

                    <div className="overview-grid">
                        <div className="info-card description-card">
                            <h3><i className="fa-solid fa-align-left"></i> Scope & Objective</h3>
                            <p>{projectData?.description || "No description provided for this project."}</p>
                        </div>

                        <div className="info-card timeline-card">
                            <h3><i className="fa-solid fa-calendar-days"></i> Project Lifecycle</h3>
                            <div className="date-row">
                                <div className="date-box">
                                    <label>Kickoff</label>
                                    <span>{projectData?.sdate}</span>
                                </div>
                                <div className="date-box">
                                    <label>Deadline</label>
                                    <span>{projectData?.edate}</span>
                                </div>
                            </div>
                        </div>

                        <div className="info-card team-card">
                            <h3><i className="fa-solid fa-people-group"></i> Collaboration Team</h3>
                            <div className="leader-info">
                                <label>Lead:</label> <strong>{projectData?.leader}</strong>
                            </div>
                            <div className="members-wrap">
                                {renderMembers()}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="workspaces-section">
                    <div className="section-header">
                        <h2>Active Workspaces</h2>
                        <span className="count-pill">{workspaceData?.length || 0} Total</span>
                    </div>

                    <div className="workspace-grid">
                        {workspaceData && workspaceData.length > 0 ? (
                            workspaceData.map((workspace, index) => (
                                <div key={workspace.id || index} className="workspace-card">
                                    <div className="card-icon">
                                        <i className="fa-solid fa-layer-group"></i>
                                    </div>
                                    <div className="card-body">
                                        <h4>{workspace?.name}</h4>
                                        <p>Project context: {projectData?.name}</p>
                                    </div>
                                    <button 
                                        className="entry-btn" 
                                        onClick={() => handleWorkspaceDash(workspace.id)}
                                    >
                                        Launch <i className="fa-solid fa-arrow-right-to-bracket"></i>
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="empty-state">
                                <p>No operational units found. Start by creating a workspace.</p>
                            </div>
                        )}
                    </div>
                </section>
            </main>
        </ProjectDashContainer>
    );
}

const StatusMessage = styled.div`
    text-align: center;
    padding: 100px;
    font-size: 1.3rem;
    font-family: 'Baloo 2', cursive;
    color: #64748b;
    &.error { color: #ef4444; }
`;

const ProjectDashContainer = styled.div`
    font-family: 'Baloo 2', cursive;
    max-width: 1200px;
    margin: 0 auto;
    padding-bottom: 50px;

    .header-actions {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 30px;
        padding-top: 10px;

        .back-btn {
            background: none;
            border: none;
            color: #94a3b8;
            font-weight: 800;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 8px;
            &:hover { color: #10b981; }
        }
    }

    #createWorkspace {
        background: #10b981;
        color: white;
        padding: 12px 24px;
        border-radius: 14px;
        border: none;
        font-weight: 800;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 10px;
        box-shadow: 0 4px 15px rgba(16, 185, 129, 0.2);
        transition: 0.3s;

        &:hover {
            background: #059669;
            transform: translateY(-2px);
        }
    }

    .project-overview {
        background: white;
        border-radius: 24px;
        padding: 40px;
        margin-bottom: 40px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.02);

        .title-section {
            display: flex;
            align-items: center;
            gap: 20px;
            margin-bottom: 35px;
            
            h1 { font-size: 2.5rem; color: #0f172a; margin: 0; }
            
            .status-badge {
                padding: 6px 16px;
                border-radius: 50px;
                font-size: 0.85rem;
                font-weight: 800;
                text-transform: uppercase;
                background: #f1f5f9;
                color: #64748b;
                &.ongoing { background: #eff6ff; color: #3b82f6; }
                &.completed { background: #f0fdf4; color: #10b981; }
            }
        }
    }

    .overview-grid {
        display: grid;
        grid-template-columns: 2fr 1fr 1fr;
        gap: 30px;

        @media (max-width: 1024px) { grid-template-columns: 1fr; }
    }

    .info-card {
        h3 {
            font-size: 1rem;
            color: #94a3b8;
            text-transform: uppercase;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 10px;
            i { color: #10b981; font-size: 0.9rem; }
        }
        p { font-size: 1.1rem; color: #334155; line-height: 1.6; }
    }

    .date-row {
        display: flex;
        gap: 20px;
        .date-box {
            label { display: block; font-size: 0.75rem; color: #94a3b8; font-weight: 800; }
            span { font-size: 1.1rem; color: #1e293b; font-weight: 700; }
        }
    }

    .team-card {
        .leader-info { margin-bottom: 12px; color: #475569; }
        .members-wrap {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            .member-pill {
                background: #f8fafc;
                border: 1px solid #e2e8f0;
                padding: 4px 12px;
                border-radius: 8px;
                font-size: 0.85rem;
                color: #64748b;
                i { font-size: 0.7rem; color: #cbd5e1; }
            }
        }
    }

    .workspaces-section {
        .section-header {
            display: flex;
            align-items: center;
            gap: 15px;
            margin-bottom: 25px;
            h2 { font-size: 1.8rem; color: #1e293b; margin: 0; }
            .count-pill {
                background: #1e293b;
                color: white;
                padding: 2px 12px;
                border-radius: 50px;
                font-size: 0.9rem;
            }
        }
    }

    .workspace-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 20px;
    }

    .workspace-card {
        background: white;
        padding: 25px;
        border-radius: 20px;
        display: flex;
        flex-direction: column;
        gap: 20px;
        border: 1px solid #f1f5f9;
        transition: 0.3s;

        &:hover {
            transform: translateY(-5px);
            border-color: #10b981;
            box-shadow: 0 10px 30px rgba(0,0,0,0.04);
        }

        .card-icon {
            width: 50px;
            height: 50px;
            background: #f8fafc;
            color: #10b981;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.3rem;
        }

        .card-body {
            h4 { font-size: 1.25rem; color: #1e293b; margin: 0; }
            p { font-size: 0.9rem; color: #94a3b8; margin-top: 5px; }
        }

        .entry-btn {
            width: 100%;
            padding: 12px;
            background: #f1f5f9;
            color: #475569;
            border: none;
            border-radius: 12px;
            font-weight: 800;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            transition: 0.2s;
            &:hover { background: #10b981; color: white; }
        }
    }

    .empty-state {
        grid-column: 1 / -1;
        text-align: center;
        padding: 60px;
        background: white;
        border-radius: 20px;
        color: #94a3b8;
        border: 2px dashed #f1f5f9;
    }
`;

export default UserProjectDash;