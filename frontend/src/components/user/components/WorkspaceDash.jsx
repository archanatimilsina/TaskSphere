import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from 'styled-components';
import Comment from "./Comment";
import WorkspaceTask from "./WorkspaceTask";

function WorkspaceDash() {
    // Default to comment view
    const [activeTab, setActiveTab] = useState("commentSpan");
    const location = useLocation();
    
    // Safety check for location state
    const workspaceId = location.state?.workspaceId;

    if (!workspaceId) {
        return <ErrorState>No Workspace ID found. Please navigate from the workspace list.</ErrorState>;
    }

    return (
        <WorkspaceDashContainer>
            <div className="headBar">
                <span 
                    className={activeTab === "commentSpan" ? "active" : ""} 
                    onClick={() => setActiveTab("commentSpan")}
                >
                    <i className="fas fa-comments"></i> Discussions
                </span>
                <span 
                    className={activeTab === "taskSpan" ? "active" : ""} 
                    onClick={() => setActiveTab("taskSpan")}
                >
                    <i className="fas fa-tasks"></i> Project Tasks
                </span>
            </div>

            <div className="DashMain">
                <div className="content-wrapper">
                    {activeTab === "taskSpan" ? (
                        <WorkspaceTask id={workspaceId} />
                    ) : (
                        <Comment id={workspaceId} />
                    )}
                </div>
            </div>
        </WorkspaceDashContainer>
    );
}

const ErrorState = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    color: #ef4444;
    font-weight: 600;
`;

const WorkspaceDashContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #f8fafc;
  font-family: 'Inter', sans-serif;

  .headBar {
    width: 100%;
    max-width: 600px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    padding-top: 30px;
    gap: 40px;
  }

  .headBar span {
    color: #64748b;
    font-family: 'Baloo 2', cursive;
    font-size: 1.2rem;
    cursor: pointer;
    padding: 8px 16px;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 10px;
    border-bottom: 3px solid transparent;

    i {
        font-size: 1rem;
    }

    &:hover {
      color: #4f46e5;
    }
  }

  .headBar span.active {
    color: #4f46e5;
    border-bottom: 3px solid #4f46e5;
    font-weight: bold;
  }

  .DashMain {
    width: 95%;
    max-width: 1200px;
    margin: 40px auto 0;
    background: white;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
    border-radius: 24px;
    height: 75vh;
    overflow: hidden;
    border: 1px solid #e2e8f0;
  }

  .content-wrapper {
    height: 100%;
    overflow-y: auto;
    padding: 40px;

    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 10px;
    }
  }

  @media (max-width: 768px) {
    .headBar {
        gap: 10px;
    }
    .DashMain {
        padding: 15px;
        margin-top: 20px;
    }
  }
`;

export default WorkspaceDash;