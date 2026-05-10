import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from 'styled-components';
import Comment from "./Comment";
import Members from "./Members";
import WorkspaceTask from "./WorkspaceTask";

function PmWorkspaceDash() {
    const [activeTab, setActiveTab] = useState("commentSpan");
    const location = useLocation();
    const navigate = useNavigate();
    
    // Ensure workspaceId exists to prevent crashes
    const workspaceId = location.state?.workspaceId;

    const goBack = () => navigate(-1);

    const renderContent = () => {
        switch (activeTab) {
            case "commentSpan": return <Comment id={workspaceId} />;
            case "taskSpan": return <WorkspaceTask id={workspaceId} />;
            case "memberSpan": return <Members id={workspaceId} />;
            default: return <Comment id={workspaceId} />;
        }
    };

    if (!workspaceId) {
        return (
            <WorkspaceDashContainer>
                <div className="error-state">
                    <i className="fas fa-exclamation-circle"></i>
                    <p>No workspace context detected. Please return to the dashboard.</p>
                    <button onClick={() => navigate('/projectManagerDash')}>Return Home</button>
                </div>
            </WorkspaceDashContainer>
        );
    }

    return (
        <WorkspaceDashContainer>
            <header className="workspace-header">
                <button className="back-link" onClick={goBack}>
                    <i className="fas fa-arrow-left"></i> Back to Dashboard
                </button>
                <div className="workspace-title">
                    <h1>Workspace Hub</h1>
                    <p>Monitoring Workspace ID: <span className="highlight">#{workspaceId}</span></p>
                </div>
            </header>

            <div className="navigation-tab-bar">
                <nav className="tabs">
                    <button 
                        className={activeTab === "commentSpan" ? "active" : ""} 
                        onClick={() => setActiveTab("commentSpan")}
                    >
                        <i className="far fa-comments"></i> Discussions
                    </button>
                    <button 
                        className={activeTab === "taskSpan" ? "active" : ""} 
                        onClick={() => setActiveTab("taskSpan")}
                    >
                        <i className="fas fa-list-check"></i> Workspace Tasks
                    </button>
                    <button 
                        className={activeTab === "memberSpan" ? "active" : ""} 
                        onClick={() => setActiveTab("memberSpan")}
                    >
                        <i className="fas fa-users-gear"></i> Team Members
                    </button>
                </nav>
            </div>

            <main className="dashboard-content-area">
                <div className="content-card">
                    {renderContent()}
                </div>
            </main>
        </WorkspaceDashContainer>
    );
}

export default PmWorkspaceDash;

const WorkspaceDashContainer = styled.div`
  min-height: 100vh;
  background-color: #f8fafc;
  font-family: 'Baloo 2', cursive;

  .workspace-header {
    background: #1e293b;
    padding: 40px 60px;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .back-link {
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        color: white;
        padding: 10px 20px;
        border-radius: 12px;
        cursor: pointer;
        transition: 0.3s;
        display: flex;
        align-items: center;
        gap: 8px;
        &:hover { background: rgba(255, 255, 255, 0.2); }
    }

    .workspace-title {
        text-align: right;
        h1 { margin: 0; font-size: 2rem; }
        p { margin: 5px 0 0; color: #94a3b8; }
        .highlight { color: #3b82f6; font-weight: 800; }
    }
  }

  .navigation-tab-bar {
    display: flex;
    justify-content: center;
    margin-top: -30px; /* Overlap effect */
    
    .tabs {
        background: white;
        padding: 10px;
        border-radius: 20px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.05);
        display: flex;
        gap: 10px;
        border: 1px solid #f1f5f9;

        button {
            background: none;
            border: none;
            padding: 12px 30px;
            border-radius: 14px;
            font-family: inherit;
            font-size: 1.1rem;
            font-weight: 700;
            color: #64748b;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 10px;

            i { font-size: 1rem; }

            &:hover { color: #3b82f6; background: #f0f7ff; }

            &.active {
                background: #3b82f6;
                color: white;
                box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
            }
        }
    }
  }

  .dashboard-content-area {
    max-width: 1200px;
    margin: 40px auto;
    padding: 0 20px;
    
    .content-card {
        background: white;
        border-radius: 24px;
        padding: 40px;
        min-height: 500px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.02);
        border: 1px solid #f1f5f9;
        overflow-y: auto;
    }
  }

  .error-state {
    text-align: center;
    padding: 100px;
    i { font-size: 4rem; color: #ef4444; margin-bottom: 20px; }
    p { font-size: 1.2rem; color: #64748b; margin-bottom: 20px; }
    button {
        background: #3b82f6;
        color: white;
        border: none;
        padding: 12px 30px;
        border-radius: 12px;
        font-weight: 700;
        cursor: pointer;
    }
  }

  @media (max-width: 768px) {
    .workspace-header {
        flex-direction: column;
        text-align: center;
        gap: 20px;
        .workspace-title { text-align: center; }
    }
    .tabs {
        flex-direction: column;
        width: 90%;
        button { width: 100%; justify-content: center; }
    }
  }
`;