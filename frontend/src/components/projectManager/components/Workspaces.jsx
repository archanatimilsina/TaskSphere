import React from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import styled from 'styled-components';

function PmWorkspaces() {
    const { data, loading, error } = useFetch("http://localhost:8000/api/workspaceIndex");
    const navigate = useNavigate();

    const handleNavigate = (id) => {
        navigate('/workspaceDash', { state: { workspaceId: id } });
    }

    if (loading) return <StatusBox>Retrieving enterprise workspaces...</StatusBox>;
    if (error) return <StatusBox className="error">Error synchronizing workspaces: {error}</StatusBox>;

    return (
        <WorkspacesContainer>
            <header className="workspace-header">
                <div className="header-content">
                    <h1>Operational Workspaces</h1>
                    <p>Select an environment to manage team discussions and localized task tracking.</p>
                </div>
                <div className="workspace-stats">
                    <span className="count-pill">{data?.data?.length || 0} Total Units</span>
                </div>
            </header>

            <div className="workspace-grid">
                {data?.data?.length > 0 ? (
                    data.data.map((workspace, index) => (
                        <div key={workspace.id} className="workspace-card">
                            <div className="card-accent"></div>
                            <div className="card-body">
                                <div className="card-top">
                                    <div className="icon-box">
                                        <i className="fas fa-cubes"></i>
                                    </div>
                                    <span className="index-tag">#{index + 1}</span>
                                </div>
                                <h3 className="workspace-name">{workspace?.name}</h3>
                                <p className="workspace-meta">Primary Collaboration Hub</p>
                                <button className="open-btn" onClick={() => handleNavigate(workspace.id)}>
                                    Access Hub <i className="fas fa-arrow-right"></i>
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="empty-state">
                        <i className="fas fa-layer-group"></i>
                        <p>No active workspaces found. Initialize a new unit to begin.</p>
                    </div>
                )}
            </div>
        </WorkspacesContainer>
    );
}

export default PmWorkspaces;

const StatusBox = styled.div`
  text-align: center;
  padding: 100px;
  font-family: 'Baloo 2', cursive;
  color: #64748b;
  &.error { color: #ef4444; }
`;

const WorkspacesContainer = styled.div`
  padding: 50px 30px;
  max-width: 1300px;
  margin: 0 auto;
  font-family: 'Baloo 2', cursive;

  .workspace-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 50px;
    border-bottom: 2px solid #f1f5f9;
    padding-bottom: 30px;

    .header-content {
      h1 { font-size: 2.8rem; color: #0f172a; margin: 0; }
      p { color: #64748b; font-size: 1.1rem; margin-top: 5px; }
    }

    .count-pill {
      background: #3b82f6;
      color: white;
      padding: 8px 20px;
      border-radius: 50px;
      font-weight: 800;
      font-size: 0.9rem;
      box-shadow: 0 4px 10px rgba(59, 130, 246, 0.2);
    }
  }

  .workspace-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 30px;
  }

  .workspace-card {
    background: white;
    border-radius: 24px;
    overflow: hidden;
    position: relative;
    box-shadow: 0 4px 20px rgba(0,0,0,0.02);
    border: 1px solid #f1f5f9;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
      transform: translateY(-10px);
      box-shadow: 0 15px 35px rgba(0,0,0,0.06);
      border-color: #3b82f6;
      .card-accent { width: 100%; }
      .icon-box { background: #3b82f6; color: white; }
    }

    .card-accent {
      position: absolute;
      top: 0;
      left: 0;
      height: 4px;
      width: 40px;
      background: #3b82f6;
      transition: 0.3s;
    }

    .card-body {
      padding: 35px;
    }

    .card-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;

      .icon-box {
        width: 50px;
        height: 50px;
        background: #f1f5f9;
        color: #64748b;
        border-radius: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        transition: 0.3s;
      }

      .index-tag {
        font-weight: 800;
        color: #cbd5e1;
        font-size: 1.1rem;
      }
    }

    .workspace-name {
      font-size: 1.6rem;
      color: #1e293b;
      margin: 0 0 8px;
    }

    .workspace-meta {
      color: #94a3b8;
      font-size: 0.95rem;
      margin-bottom: 30px;
    }

    .open-btn {
      width: 100%;
      background: #f8fafc;
      color: #3b82f6;
      border: 2px solid #f1f5f9;
      padding: 12px;
      border-radius: 14px;
      font-weight: 800;
      font-family: inherit;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      transition: 0.2s;

      &:hover {
        background: #3b82f6;
        color: white;
        border-color: #3b82f6;
      }
    }
  }

  .empty-state {
    grid-column: 1 / -1;
    text-align: center;
    padding: 100px;
    background: #f8fafc;
    border-radius: 30px;
    border: 2px dashed #e2e8f0;
    color: #94a3b8;
    i { font-size: 3rem; margin-bottom: 20px; }
    p { font-size: 1.2rem; }
  }

  @media (max-width: 768px) {
    .workspace-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 20px;
      .header-content h1 { font-size: 2.2rem; }
    }
    .workspace-grid { grid-template-columns: 1fr; }
  }
`;