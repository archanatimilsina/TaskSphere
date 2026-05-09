import React from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import useFetch from "../../hooks/useFetch";

function UserWorkspaces() {
    const { data, loading, error } = useFetch("/api/workspaceIndex");
    const navigate = useNavigate();

    const handleOpenWorkspace = (id) => {
        navigate('/workspaceDash', { state: { workspaceId: id } });
    };

    if (loading) return <StatusWrapper>Connecting to Workspaces...</StatusWrapper>;
    if (error) return <StatusWrapper isError>Error: {error}</StatusWrapper>;

    return (
        <UserWorkspacesContainer>
            <header className="page-header">
                <h1 id="userWorkspaceHeading">Your Workspaces</h1>
                <p className="sub-heading">Select a workspace to manage your projects and tasks</p>
            </header>

            <div className="workspace-grid">
                {data?.data?.length > 0 ? (
                    data.data.map((workspace) => (
                        <div key={workspace.id} className="workspace-card">
                            <div className="card-content">
                                <div className="workspace-icon">
                                    <i className="fas fa-briefcase"></i>
                                </div>
                                <h3 className="workspace-name">{workspace.name}</h3>
                                <button 
                                    className="open-btn" 
                                    onClick={() => handleOpenWorkspace(workspace.id)}
                                >
                                    Open Workspace
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="empty-state">
                        <i className="fas fa-folder-open"></i>
                        <p>No workspaces found. Create one to get started.</p>
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
    min-height: 300px;
    font-size: 1.2rem;
    color: ${props => props.isError ? '#ef4444' : '#64748b'};
    font-weight: 500;
`;

const UserWorkspacesContainer = styled.div`
    padding: 40px 20px;
    max-width: 1200px;
    margin: 0 auto;
    font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;

    .page-header {
        text-align: center;
        margin-bottom: 50px;

        #userWorkspaceHeading {
            font-size: 2.5rem;
            font-weight: 800;
            color: #0f172a;
            margin: 0;
            letter-spacing: -0.025em;
        }

        .sub-heading {
            color: #64748b;
            margin-top: 10px;
            font-size: 1.1rem;
        }
    }

    .workspace-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 30px;
    }

    .workspace-card {
        background: #1e293b;
        border-radius: 24px;
        padding: 30px;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        border: 1px solid #334155;
        position: relative;
        overflow: hidden;

        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: #10b981;
            opacity: 0;
            transition: opacity 0.3s;
        }

        &:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1);
            border-color: #10b981;

            &::before {
                opacity: 1;
            }

            .workspace-icon {
                background: #10b981;
                color: white;
                transform: scale(1.1);
            }
        }
    }

    .card-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
    }

    .workspace-icon {
        width: 60px;
        height: 60px;
        background: #334155;
        color: #10b981;
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        margin-bottom: 20px;
        transition: all 0.3s;
    }

    .workspace-name {
        color: #f8fafc;
        font-size: 1.25rem;
        font-weight: 600;
        margin-bottom: 25px;
    }

    .open-btn {
        width: 100%;
        padding: 12px;
        background: #10b981;
        color: white;
        border: none;
        border-radius: 12px;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.2s;
        box-shadow: 0 4px 6px -1px rgba(16, 185, 129, 0.2);

        &:hover {
            background: #059669;
        }
    }

    .empty-state {
        grid-column: 1 / -1;
        text-align: center;
        padding: 60px;
        background: #f8fafc;
        border-radius: 24px;
        border: 2px dashed #e2e8f0;
        
        i {
            font-size: 3rem;
            color: #cbd5e1;
            margin-bottom: 15px;
        }

        p {
            color: #64748b;
            font-size: 1.1rem;
        }
    }

    @media (max-width: 768px) {
        padding: 20px;
        
        .page-header #userWorkspaceHeading {
            font-size: 2rem;
        }
    }
`;

export default UserWorkspaces;