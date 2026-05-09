import React from "react";
import '../assets/css/workspaceTask.css'
import useFetch from "../../hooks/UseFetch";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

function WorkspaceTask({id})
{
    const location= useLocation();
    const {workspaceId}= location.state;
    const {data,loading,error}=useFetch(`http://localhost:8000/api/workspaceTask/${workspaceId}`);
    const navigate=useNavigate();
    const assignTask=(workspaceId)=>
    {
        navigate("/workspaceTaskForm", { state: { id: workspaceId } });

    }
    return(
        <>
  <h1 id="pmheading">Tasks</h1>
  <button className="assignTaskWorkspace" onClick={() => assignTask(workspaceId)}>Assign Task</button>
        <div className="pmthirdDiv">
        <table>
            <thead>
                <tr>
                    <th>S.N</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Employee Username</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Status</th>
                    <th>Priority</th>
                    <th>Updated At</th>
                </tr>
            </thead>
            <tbody id="pmTaskTableBody">
                {data?.data?.length>0 && data?.data?.map((task,index)=>
                {
                    return(
                       <tr key={index}>
                    <td>{index+1}</td>
                    <td>{task.name}</td>
                    <td>{task.description}</td>
                    <td>{task.employee}</td>
                    <td>{task.sdate}</td>
                    <td>{task.edate}</td>
                    <td>{task.status}</td>
                    <td>{task.priority}</td>
                    <td>{task.created_at}</td>
                </tr>  
                    );
                })}
               
            </tbody>
        </table>
    </div>


        </>
    )
}
export default WorkspaceTask;

const WorkspaceTaskContainer = styled.div`
  .pmthirdDiv
{
  box-shadow: 0 4px 4px 4px rgba(0,0,0,0.1);
      border-radius: 10px;
      padding: 10px;
      height: 100%;
width: 100%;
overflow: auto;
}
#pmTaskTableBody tr{
  background-color: white;
}

.ProjectOpenBtn button{
  width: 100px;
    height: 40px;
    color: white;
    background-color: green;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s;
}
#pmheading {
    font-size: 2.5rem;
    color: black;
   border-bottom: 1px solid gray;
   margin-bottom: 20px;
}

#filter {
    font-size: 1.8rem;
    color: #f1f5f9;
    cursor: pointer;
    transition: color 0.3s, transform 0.3s;
}
.pmtable-container table {
    width: 100%;
    border-collapse: collapse;
}

.pmtable-container table thead {
    position: sticky;
    top: 0;
    background-color: #1e293b;
    z-index: 1;
}

th, td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #334155;
}

th {
    color: #cbd5e1;
}


@media screen and (max-width: 768px) {
    #heading {
        font-size: 2rem;
    }

    th, td {
        font-size: 0.9rem;
        padding: 8px 10px;
    }

    #filter {
        font-size: 1.5rem;
    }
}
.assignTaskWorkspace
{
    width: 160px;
    height: 50px;
    border: 1px solid black;
    border-radius: 10px;
    font-size: 20px;
    background-color: #1e293b;
    color: white;
    position: absolute;
    right: 70px;

}
.assignTaskWorkspace:hover{
    background-color: white;
    color: black;
    box-shadow: 0 6px 10px rgba(0,0,0,0.4);
    border: none;
}

.button-container {
    display: flex;
    justify-content: flex-end; 
    margin-top: 1rem;
  }
  

`;