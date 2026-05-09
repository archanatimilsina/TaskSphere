import React, { useState } from "react";
import useFetch from "../../hooks/UseFetch";
import '../assets/css/workspaceDash.css';
import Comment from "./Comment";
import Members from "./Members";
import WorkspaceTask from "./WorkspaceTask";
import { useNavigate, useLocation } from "react-router-dom";
import styled from 'styled-components';


// Create simple small components


function WorkspaceDash() {
    const [activeTab, setActiveTab] = useState(null);
    const location= useLocation();
    const { workspaceId } = location.state;
    const navigate = useNavigate();
    const renderComment = () => {
        setActiveTab("commentSpan");
    }
    const renderTask = () => {
        setActiveTab("taskSpan");
    }
    const renderMember = () => {
        setActiveTab("memberSpan");
    }
    const goBack = () => {
        navigate(-1); // navigates to previous page
    };

    // function to choose which content to show
    const renderContent = () => {
        if (activeTab === "commentSpan") return <Comment id={workspaceId}/>;
        if (activeTab === "taskSpan") return <WorkspaceTask id={workspaceId}/>;
        if (activeTab === "memberSpan") return <Members id={workspaceId}/>;
        return <Comment id={workspaceId}/> 
    }
    return (
        <>
        <button className="backButton" onClick={goBack}>Back</button>

            <div className="headBar">
                <span className={activeTab === "commentSpan" ? "active" : ""} onClick={renderComment}>Comment</span>
                <span className={activeTab === "taskSpan" ? "active" : ""} onClick={renderTask}>Tasks</span>
                <span className={activeTab === "memberSpan" ? "active" : ""} onClick={renderMember}>Members</span>
            </div>
            <div className="DashMain">
                {renderContent()}
            </div>
        </>
    );
}

export default WorkspaceDash;

const WorkspaceDashContainer = styled.div`
  
.headBar
{
  width: 500px;
  display: flex ;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin: auto;
  margin-top: 20px;
  
  
}
.headBar span{
  color: black;
  font-family: 'Baloo 2', cursive;
  cursor: pointer;
}

.headBar span.active {
    border-bottom: 2px solid gray; /* Change the color as needed */
}
.DashMain
{
    width: 100%;
box-shadow: 0 2px 8px rgb(0,0,0,0.5);
height: 86%;
overflow-y: auto;
margin-top: 50px;
padding: 50px;

}

.backButton {
  margin: 20px;
  padding: 10px 20px;
  background-color: #64748b; /* slate-500 */
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.backButton:hover {
  background-color: #475569; /* slate-600 */
}

`;