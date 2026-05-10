import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

function AdminProjectDash() {  
    const location = useLocation();
    const navigate = useNavigate();
    
    // Fallback ID if location state is missing
    const selectedProjectId = location.state?.selectedProjectId;
    
    const [projectData, setProjectData] = useState(null);
    const [workspaceData, setWorkspaceData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const WorkspaceDash = (id) => {
        navigate('/react/projectManager/workspaceDash', { state: { workspaceId: id } });
    };

    useEffect(() => {
        if (!selectedProjectId) return;

        const fetchData = async () => {
            setLoading(true);
            try {
                // Fetch Project Details
                const projectRes = await fetch(`http://localhost:8000/api/projectShow/${selectedProjectId}`);
                if (!projectRes.ok) throw new Error('Failed to fetch project details');
                const projectJson = await projectRes.json();
                setProjectData(projectJson.data);

                // Fetch Workspaces
                const workspaceRes = await fetch(`/api/workspaceExtract/${selectedProjectId}`);
                if (!workspaceRes.ok) throw new Error('Failed to fetch workspaces');
                const workspaceJson = await workspaceRes.json();
                setWorkspaceData(workspaceJson.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [selectedProjectId]);

    const CreateWorkspace = () => {
        navigate('/react/projectManager/workspaceCreateForm', { state: { projectId: selectedProjectId } });
    };

    if (loading) return <StatusBox>Analyzing project environment...</StatusBox>;
    if (error) return <StatusBox className="error">Error: {error}</StatusBox>;

    // Helper for Member Parsing
    const renderMembers = () => {
        try {
            if (!projectData?.members) return "No members assigned";
            const members = typeof projectData.members === 'string' ? JSON.parse(projectData.members) : projectData.members;
            return members.map((member, i) => <span key={i} className="member-tag">{member}</span>);
        } catch (e) {
            return projectData.members;
        }
    };

    return (
        <ProjectDashContainer>
            <div className="dash-header">
                <button className="back-btn" onClick={() => navigate(-1)}>
                    <i className="fas fa-chevron-left"></i> Back
                </button>
                <div className="header-content">
                    <h1>{projectData?.name}</h1>
                    <span className={`status-badge ${projectData?.status?.toLowerCase().replace(" ", "-")}`}>
                        {projectData?.status}
                    </span>
                </div>
                <button id="createWorkspace" onClick={CreateWorkspace}>
                    <i className="fas fa-plus"></i> New Workspace
                </button>
            </div>

            <div className="main-grid">
                {/* Left Section: Details */}
                <section className="project-info-card">
                    <div className="card-header">
                        <i className="fas fa-info-circle"></i>
                        <h3>Project Overview</h3>
                    </div>
                    <div className="info-content">
                        <div className="description-block">
                            <label>Objective</label>
                            <p>{projectData?.description || "No description provided."}</p>
                        </div>
                        <div className="details-grid">
                            <div className="detail-item">
                                <label><i className="fas fa-user-tie"></i> Leader</label>
                                <p>{projectData?.leader}</p>
                            </div>
                            <div className="detail-item">
                                <label><i className="fas fa-calendar-alt"></i> Timeline</label>
                                <p>{projectData?.sdate} — {projectData?.edate}</p>
                            </div>
                            <div className="detail-item">
                                <label><i className="fas fa-layer-group"></i> Workspaces</label>
                                <p>{projectData?.workspaceCount || 0} active</p>
                            </div>
                        </div>
                        <div className="members-section">
                            <label>Team Members</label>
                            <div className="members-list">
                                {renderMembers()}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Right Section: Workspaces */}
                <section className="workspaces-section">
                    <div className="card-header">
                        <i className="fas fa-folder-open"></i>
                        <h3>Available Workspaces</h3>
                    </div>
                    <div className="workspace-grid">
                        {workspaceData?.length > 0 ? (
                            workspaceData.map((workspace, index) => (
                                <div key={index} className="workspace-card">
                                    <div className="ws-icon">
                                        <i className="fas fa-columns"></i>
                                    </div>
                                    <div className="ws-info">
                                        <h4>{workspace?.name}</h4>
                                        <p>Click to manage tasks</p>
                                    </div>
                                    <button className="open-ws-btn" onClick={() => WorkspaceDash(workspace.id)}>
                                        Open <i className="fas fa-arrow-right"></i>
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="empty-ws">
                                <i className="fas fa-ghost"></i>
                                <p>No workspaces yet. Create one to get started!</p>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </ProjectDashContainer>
    );
}

export default AdminProjectDash;

const StatusBox = styled.div`
    text-align: center;
    padding: 100px;
    font-family: 'Baloo 2', cursive;
    font-size: 1.2rem;
    color: #64748b;
    &.error { color: #ef4444; }
`;

const ProjectDashContainer = styled.div`
    padding: 30px;
    font-family: 'Baloo 2', cursive;
    max-width: 1400px;
    margin: 0 auto;

    .dash-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 40px;
        background: white;
        padding: 20px 30px;
        border-radius: 20px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.03);

        .header-content {
            text-align: center;
            h1 { font-size: 2.2rem; color: #0f172a; margin: 0; }
        }

        .back-btn {
            background: #f1f5f9;
            border: none;
            padding: 10px 20px;
            border-radius: 12px;
            font-weight: 700;
            cursor: pointer;
            color: #64748b;
            transition: all 0.2s;
            &:hover { background: #e2e8f0; color: #0f172a; }
        }

        #createWorkspace {
            background: #3b82f6;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 12px;
            font-weight: 700;
            cursor: pointer;
            transition: 0.2s;
            display: flex;
            align-items: center;
            gap: 8px;
            &:hover { background: #2563eb; transform: translateY(-2px); }
        }
    }

    .status-badge {
        display: inline-block;
        padding: 4px 15px;
        border-radius: 20px;
        font-size: 0.9rem;
        font-weight: 700;
        background: #f1f5f9;
        &.completed { background: #dcfce7; color: #166534; }
        &.on-hold { background: #fef9c3; color: #854d0e; }
        &.in-progress { background: #dbeafe; color: #1e40af; }
    }

    .main-grid {
        display: grid;
        grid-template-columns: 400px 1fr;
        gap: 30px;
        @media (max-width: 1100px) { grid-template-columns: 1fr; }
    }

    .card-header {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 20px;
        i { color: #3b82f6; font-size: 1.2rem; }
        h3 { font-size: 1.3rem; color: #1e293b; margin: 0; }
    }

    .project-info-card {
        background: white;
        padding: 30px;
        border-radius: 24px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.03);
        height: fit-content;

        label { color: #94a3b8; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; font-weight: 800; display: block; margin-bottom: 5px; }
        p { color: #334155; font-size: 1.1rem; margin-bottom: 20px; }
    }

    .details-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 10px;
    }

    .member-tag {
        display: inline-block;
        background: #f8fafc;
        padding: 5px 12px;
        border-radius: 8px;
        margin: 0 5px 5px 0;
        border: 1px solid #e2e8f0;
        font-size: 0.95rem;
    }

    .workspace-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 20px;
    }

    .workspace-card {
        background: white;
        padding: 20px;
        border-radius: 18px;
        display: flex;
        align-items: center;
        gap: 15px;
        border: 1px solid #f1f5f9;
        transition: 0.3s;
        
        &:hover {
            border-color: #3b82f6;
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(59, 130, 246, 0.05);
        }

        .ws-icon {
            width: 50px;
            height: 50px;
            background: #eff6ff;
            color: #3b82f6;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
        }

        .ws-info {
            flex: 1;
            h4 { margin: 0; color: #1e293b; font-size: 1.15rem; }
            p { margin: 2px 0 0; color: #94a3b8; font-size: 0.85rem; }
        }

        .open-ws-btn {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            padding: 8px 15px;
            border-radius: 8px;
            font-weight: 700;
            cursor: pointer;
            transition: 0.2s;
            &:hover { background: #3b82f6; color: white; border-color: #3b82f6; }
        }
    }

    .empty-ws {
        grid-column: 1 / -1;
        text-align: center;
        padding: 60px;
        background: #f8fafc;
        border-radius: 20px;
        border: 2px dashed #e2e8f0;
        color: #94a3b8;
        i { font-size: 3rem; margin-bottom: 15px; }
    }
`;