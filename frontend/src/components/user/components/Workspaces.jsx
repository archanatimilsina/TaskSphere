import React from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import useFetch from "../../../hooks/useFetch";

function UserWorkspaces() {
    const { data, loading, error } = useFetch("http://localhost:8000/api/workspaceIndex");
    const navigate = useNavigate();

    const handleOpenWorkspace = (id) => {
        navigate('/workspaceDash', { state: { workspaceId: id } });
    };

    if (loading) return <StatusWrapper>Synchronizing your environments...</StatusWrapper>;
    if (error) return <StatusWrapper isError>Operational Error: {error}</StatusWrapper>;

    return (
        <UserWorkspacesContainer>
            <header className="page-header">
                <div className="title-stack">
                    <h1 id="userWorkspaceHeading">Workspace Nexus</h1>
                    <p className="sub-heading">Access and manage your collaborative operating environments.</p>
                </div>
                <div className="header-action">
                    <button className="create-ws-btn">
                        <i className="fa-solid fa-plus"></i> New Workspace
                    </button>
                </div>
            </header>

            <div className="workspace-grid">
                {data?.data?.length > 0 ? (
                    data.data.map((workspace, index) => (
                        <div key={workspace.id || index} className="workspace-card">
                            <div className="card-accent" />
                            <div className="card-header">
                                <div className="workspace-avatar">
                                    <i className="fa-solid fa-server"></i>
                                </div>
                                <div className="workspace-meta">
                                    <span className="ws-id">WS-{workspace.id}</span>
                                    <h3 className="workspace-name">{workspace.name}</h3>
                                </div>
                            </div>
                            
                            <div className="card-stats">
                                <div className="stat">
                                    <span className="stat-label">Stability</span>
                                    <span className="stat-value">Active</span>
                                </div>
                                <div className="stat">
                                    <span className="stat-label">Access</span>
                                    <span className="stat-value">Authorized</span>
                                </div>
                            </div>

                            <button 
                                className="launch-btn" 
                                onClick={() => handleOpenWorkspace(workspace.id)}
                            >
                                Enter Workspace <i className="fa-solid fa-arrow-right-to-bracket"></i>
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="empty-state">
                        <div className="empty-icon">
                            <i className="fa-solid fa-cubes-stacked"></i>
                        </div>
                        <h3>No Active Workspaces</h3>
                        <p>Your workspace queue is currently empty. Initialize a new environment to begin.</p>
                        <button className="primary-action">Initialize Workspace</button>
                    </div>
                )}
            </div>
        </UserWorkspacesContainer>
    );
}

const StatusWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 400px;
    font-family: 'Baloo 2', cursive;
    font-size: 1.3rem;
    color: ${props => props.isError ? '#ef4444' : '#94a3b8'};
`;

const UserWorkspacesContainer = styled.div`
    padding: 60px 40px;
    max-width: 1300px;
    margin: 0 auto;
    font-family: 'Baloo 2', cursive;

    .page-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        margin-bottom: 60px;
        
        #userWorkspaceHeading {
            font-size: 3rem;
            font-weight: 800;
            color: #1e293b;
            margin: 0;
            line-height: 1;
        }

        .sub-heading {
            color: #94a3b8;
            margin-top: 15px;
            font-size: 1.2rem;
        }

        .create-ws-btn {
            background: #1e293b;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 12px;
            font-weight: 700;
            font-family: inherit;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 10px;
            transition: 0.3s;
            &:hover { background: #0f172a; transform: translateY(-2px); }
        }

        @media (max-width: 768px) {
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
        }
    }

    .workspace-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
        gap: 30px;
    }

    .workspace-card {
        background: white;
        border-radius: 28px;
        padding: 35px;
        border: 1px solid #f1f5f9;
        position: relative;
        overflow: hidden;
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);

        .card-accent {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 6px;
            background: #f1f5f9;
            transition: background 0.3s;
        }

        &:hover {
            transform: translateY(-12px);
            box-shadow: 0 30px 60px -12px rgba(15, 23, 42, 0.08);
            border-color: #10b981;

            .card-accent { background: #10b981; }
            .workspace-avatar { background: #10b981; color: white; }
            .launch-btn { background: #10b981; color: white; border-color: #10b981; }
        }
    }

    .card-header {
        display: flex;
        align-items: center;
        gap: 20px;
        margin-bottom: 30px;

        .workspace-avatar {
            width: 54px;
            height: 54px;
            background: #f8fafc;
            color: #cbd5e1;
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.4rem;
            transition: 0.3s;
        }

        .ws-id { font-size: 0.75rem; font-weight: 800; color: #cbd5e1; text-transform: uppercase; }
        .workspace-name { font-size: 1.4rem; color: #1e293b; margin: 0; font-weight: 700; }
    }

    .card-stats {
        display: grid;
        grid-template-columns: 1fr 1fr;
        background: #f8fafc;
        padding: 15px;
        border-radius: 16px;
        margin-bottom: 30px;

        .stat {
            display: flex;
            flex-direction: column;
            .stat-label { font-size: 0.7rem; text-transform: uppercase; color: #94a3b8; font-weight: 800; }
            .stat-value { font-size: 0.9rem; color: #475569; font-weight: 700; }
        }
    }

    .launch-btn {
        width: 100%;
        padding: 14px;
        background: #f8fafc;
        color: #64748b;
        border: 2px solid #f1f5f9;
        border-radius: 16px;
        font-weight: 800;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        transition: 0.3s;
        font-family: inherit;
        font-size: 1rem;
    }

    .empty-state {
        grid-column: 1 / -1;
        text-align: center;
        padding: 100px 40px;
        background: white;
        border-radius: 40px;
        border: 2px dashed #e2e8f0;

        .empty-icon { font-size: 4rem; color: #f1f5f9; margin-bottom: 20px; }
        h3 { font-size: 2rem; color: #1e293b; margin: 0; }
        p { color: #94a3b8; margin: 15px 0 35px; max-width: 400px; margin-inline: auto; }
        
        .primary-action {
            background: #10b981;
            color: white;
            border: none;
            padding: 14px 40px;
            border-radius: 14px;
            font-weight: 800;
            font-family: inherit;
            cursor: pointer;
            &:hover { background: #059669; }
        }
    }
`;

export default UserWorkspaces;