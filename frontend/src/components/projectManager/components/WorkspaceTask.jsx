import React from "react";
import '../assets/css/workspaceTask.css'
import useFetch from "../../hooks/UseFetch";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function WorkspaceTask({id})
{
    const location= useLocation();
    const {workspaceId}= location.state;
    const {data,loading,error}=useFetch(`/api/workspaceTask/${workspaceId}`);
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