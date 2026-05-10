import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

function ProjectDash() {
    const location = useLocation();
    const navigate = useNavigate();
    const { selectedProjectId } = location.state || {};
    
    const [projectData, setProjectData] = useState(null);
    const [workspaceData, setWorkspaceData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!selectedProjectId) {
            setError("No Project ID found. Please select a project from the dashboard.");
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            try {
                // Fetch project and workspaces in parallel for better performance
                const [projectRes, workspaceRes] = await Promise.all([
                    fetch(`http://localhost:8000/api/projectShow/${selectedProjectId}`),
                    fetch(`http://localhost:8000/api/workspaceExtract/${selectedProjectId}`)
                ]);

                if (!projectRes.ok || !workspaceRes.ok) throw new Error('Data retrieval failed');

                const pData = await projectRes.json();
                const wData = await workspaceRes.json();

                setProjectData(pData.data);
                setWorkspaceData(wData.data || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [selectedProjectId]);

    const handleOpenWorkspace = (id) => {
        navigate('/workspaceDash', { state: { workspaceId: id } });
    };

    const handleCreateWorkspace = () => {
        // Passing the selectedProjectId so the creation form knows which project it belongs to
        navigate('/workspaceCreateForm', { state: { projectId: selectedProjectId } });
    };

    if (loading) return <StatusBox>Loading project ecosystem...</StatusBox>;
    if (error) return <StatusBox className="error">{error}</StatusBox>;

    return (
        <ProjectDashContainer>
            <header className="dashboard-header">
                <div className="title-section">
                    <span className="breadcrumb">Projects / {projectData?.name}</span>
                    <h1>Project Management Hub</h1>
                </div>
                <button className="create-workspace-btn" onClick={handleCreateWorkspace}>
                    <i className="fas fa-plus-circle"></i> New Workspace
                </button>
            </header>

            <div className="dashboard-grid">
                {/* Main Project Details Card */}
                <section className="project-info-card">
                    <div className="card-header">
                        <i className="fas fa-info-circle"></i>
                        <h2>Project Overview</h2>
                    </div>
                    <div className="info-content">
                        <div className="info-row">
                            <span className="label">Full Name</span>
                            <span className="value">{projectData?.name}</span>
                        </div>
                        <div className="info-row">
                            <span className="label">Objective</span>
                            <p className="description">{projectData?.description}</p>
                        </div>
                        <div className="stats-row">
                            <div className="stat-box">
                                <span className="stat-label">Timeline</span>
                                <span className="stat-value">{projectData?.sdate} to {projectData?.edate}</span>
                            </div>
                            <div className="stat-box">
                                <span className="stat-label">Workspaces</span>
                                <span className="stat-value">{projectData?.workspaceCount} Total</span>
                            </div>
                        </div>
                        <div className="team-section">
                            <span className="label">Project Personnel</span>
                            <div className="member-chips">
                                {projectData?.members && JSON.parse(projectData.members).map((member, i) => (
                                    <span key={i} className="chip">{member}</span>
                                ))}
                                <span className="chip leader-chip">Lead: {projectData?.leader}</span>
                            </div>
                        </div>
                        <div className={`status-badge ${projectData?.status?.toLowerCase()}`}>
                            {projectData?.status}
                        </div>
                    </div>
                </section>

                {/* Workspace List Section */}
                <section className="workspaces-section">
                    <div className="section-header">
                        <h2>Active Workspaces</h2>
                    </div>
                    <div className="workspace-scroll-area">
                        {workspaceData.length > 0 ? (
                            workspaceData.map((workspace) => (
                                <div key={workspace.id} className="workspace-item">
                                    <div className="workspace-icon">
                                        <i className="fas fa-folder-open"></i>
                                    </div>
                                    <div className="workspace-text">
                                        <h4>{workspace?.name}</h4>
                                        <p>Click to manage tasks and deliverables</p>
                                    </div>
                                    <button className="open-btn" onClick={() => handleOpenWorkspace(workspace.id)}>
                                        Open
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="empty-state">
                                <i className="fas fa-inbox"></i>
                                <p>No operational workspaces found for this project.</p>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </ProjectDashContainer>
    );
}

export default ProjectDash;

const StatusBox = styled.div`
    text-align: center;
    padding: 100px;
    font-family: 'Baloo 2', cursive;
    color: #64748b;
    &.error { color: #ef4444; }
`;

const ProjectDashContainer = styled.div`
    font-family: 'Baloo 2', cursive;
    padding: 20px;

    .dashboard-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 40px;

        .breadcrumb {
            color: #3b82f6;
            font-weight: 700;
            font-size: 0.9rem;
            text-transform: uppercase;
        }

        h1 { font-size: 2.2rem; color: #0f172a; margin: 0; }

        .create-workspace-btn {
            background: #10b981;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 12px;
            font-weight: 800;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 10px;
            transition: all 0.2s;
            &:hover { background: #059669; transform: translateY(-2px); }
        }
    }

    .dashboard-grid {
        display: grid;
        grid-template-columns: 1.5fr 1fr;
        gap: 30px;
        @media (max-width: 1024px) { grid-template-columns: 1fr; }
    }

    .project-info-card {
        background: white;
        border-radius: 24px;
        padding: 35px;
        border: 1px solid #e2e8f0;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
        position: relative;

        .card-header {
            display: flex;
            align-items: center;
            gap: 15px;
            margin-bottom: 25px;
            i { color: #3b82f6; font-size: 1.5rem; }
            h2 { margin: 0; font-size: 1.5rem; color: #1e293b; }
        }

        .info-row {
            margin-bottom: 20px;
            .label { display: block; color: #94a3b8; font-weight: 700; margin-bottom: 5px; }
            .value { font-size: 1.2rem; color: #0f172a; font-weight: 800; }
            .description { color: #64748b; line-height: 1.6; }
        }

        .stats-row {
            display: flex;
            gap: 20px;
            margin: 30px 0;
            background: #f8fafc;
            padding: 20px;
            border-radius: 16px;
            .stat-box {
                flex: 1;
                .stat-label { display: block; color: #64748b; font-size: 0.8rem; text-transform: uppercase; }
                .stat-value { font-weight: 800; color: #1e293b; font-size: 1.1rem; }
            }
        }

        .team-section {
            .label { display: block; color: #94a3b8; font-weight: 700; margin-bottom: 10px; }
            .member-chips {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
                .chip {
                    background: #f1f5f9;
                    color: #475569;
                    padding: 4px 14px;
                    border-radius: 20px;
                    font-size: 0.9rem;
                    font-weight: 700;
                    &.leader-chip { background: #dbeafe; color: #1d4ed8; }
                }
            }
        }

        .status-badge {
            position: absolute;
            top: 35px;
            right: 35px;
            padding: 6px 16px;
            border-radius: 20px;
            font-weight: 800;
            font-size: 0.8rem;
            text-transform: uppercase;
            background: #e2e8f0;
            &.active { background: #dcfce7; color: #15803d; }
        }
    }

    .workspaces-section {
        background: #1e293b;
        border-radius: 24px;
        padding: 30px;
        color: white;
        display: flex;
        flex-direction: column;
        max-height: 700px;

        .section-header h2 { font-size: 1.5rem; margin-bottom: 25px; }

        .workspace-scroll-area {
            overflow-y: auto;
            flex: 1;
            padding-right: 10px;
            
            &::-webkit-scrollbar { width: 5px; }
            &::-webkit-scrollbar-thumb { background: #475569; border-radius: 10px; }
        }

        .workspace-item {
            background: rgba(255, 255, 255, 0.05);
            padding: 20px;
            border-radius: 16px;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 15px;
            transition: 0.3s;

            &:hover { background: rgba(255, 255, 255, 0.1); transform: scale(1.02); }

            .workspace-icon {
                width: 45px;
                height: 45px;
                background: rgba(16, 185, 129, 0.2);
                color: #10b981;
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.2rem;
            }

            .workspace-text {
                flex: 1;
                h4 { margin: 0; font-size: 1.1rem; }
                p { margin: 2px 0 0; font-size: 0.8rem; color: #94a3b8; }
            }

            .open-btn {
                background: #10b981;
                color: white;
                border: none;
                padding: 8px 16px;
                border-radius: 10px;
                font-weight: 700;
                cursor: pointer;
                &:hover { background: #059669; }
            }
        }

        .empty-state {
            text-align: center;
            padding: 50px 0;
            color: #64748b;
            i { font-size: 3rem; margin-bottom: 15px; }
        }
    }
`;