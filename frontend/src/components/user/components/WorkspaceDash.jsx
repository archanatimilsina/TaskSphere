import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from 'styled-components';
import Comment from "./Comment";
import WorkspaceTask from "./WorkspaceTask";

function UserWorkspaceDash() {
    // Persistent state for switching between operational views
    const [activeTab, setActiveTab] = useState("discussions");
    const location = useLocation();
    
    // Extract workspace identity from the routing state
    const workspaceId = location.state?.workspaceId;

    // Safety fallback for direct URL access without state
    if (!workspaceId) {
        return (
            <ErrorState>
                <div className="error-box">
                    <i className="fa-solid fa-triangle-exclamation"></i>
                    <h2>Session Lost</h2>
                    <p>No Workspace ID detected. Please return to the dashboard and re-select your workspace.</p>
                    <button onClick={() => window.history.back()}>Go Back</button>
                </div>
            </ErrorState>
        );
    }

    return (
        <WorkspaceDashContainer>
            <nav className="navigation-tabs">
                <button 
                    className={activeTab === "discussions" ? "tab-btn active" : "tab-btn"} 
                    onClick={() => setActiveTab("discussions")}
                >
                    <i className="fa-solid fa-comment-dots"></i>
                    <span>Team Discussions</span>
                </button>
                
                <button 
                    className={activeTab === "tasks" ? "tab-btn active" : "tab-btn"} 
                    onClick={() => setActiveTab("tasks")}
                >
                    <i className="fa-solid fa-list-check"></i>
                    <span>Operational Tasks</span>
                </button>
            </nav>

            <main className="dashboard-viewport">
                <div className="inner-scroll-container">
                    {activeTab === "tasks" ? (
                        <WorkspaceTask id={workspaceId} />
                    ) : (
                        <Comment id={workspaceId} />
                    )}
                </div>
            </main>
        </WorkspaceDashContainer>
    );
}

const ErrorState = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f8fafc;
    font-family: 'Baloo 2', cursive;

    .error-box {
        text-align: center;
        background: white;
        padding: 50px;
        border-radius: 30px;
        box-shadow: 0 20px 50px rgba(0,0,0,0.05);
        
        i { font-size: 4rem; color: #f59e0b; margin-bottom: 20px; }
        h2 { color: #1e293b; margin: 0; font-size: 2rem; }
        p { color: #94a3b8; max-width: 300px; margin: 15px auto; }
        
        button {
            background: #4f46e5;
            color: white;
            border: none;
            padding: 12px 30px;
            border-radius: 12px;
            font-weight: 700;
            cursor: pointer;
            transition: 0.3s;
            &:hover { background: #4338ca; transform: translateY(-2px); }
        }
    }
`;

const WorkspaceDashContainer = styled.div`
  min-height: 100vh;
  background-color: #f8fafc;
  display: flex;
  flex-direction: column;
  font-family: 'Baloo 2', cursive;

  .navigation-tabs {
    display: flex;
    justify-content: center;
    gap: 30px;
    padding: 40px 20px 20px;
    
    @media (max-width: 600px) { gap: 10px; }
  }

  .tab-btn {
    background: transparent;
    border: none;
    padding: 12px 25px;
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 1.1rem;
    font-weight: 700;
    color: #94a3b8;
    cursor: pointer;
    transition: all 0.3s ease;
    border-radius: 15px;
    font-family: inherit;

    i { font-size: 1.2rem; }

    &:hover {
      color: #4f46e5;
      background: #eef2ff;
    }

    &.active {
      color: #4f46e5;
      background: #eef2ff;
      box-shadow: inset 0 0 0 2px #c7d2fe;
    }
  }

  .dashboard-viewport {
    flex: 1;
    width: 95%;
    max-width: 1300px;
    margin: 20px auto 40px;
    background: white;
    border-radius: 35px;
    border: 1px solid #e2e8f0;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.03);
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .inner-scroll-container {
    flex: 1;
    overflow-y: auto;
    padding: 40px;
    
    /* Custom Scrollbar Logic */
    &::-webkit-scrollbar {
      width: 8px;
    }
    &::-webkit-scrollbar-track {
      background: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background: #e2e8f0;
      border-radius: 10px;
      &:hover { background: #cbd5e1; }
    }

    @media (max-width: 768px) {
        padding: 20px;
    }
  }
`;

export default UserWorkspaceDash;