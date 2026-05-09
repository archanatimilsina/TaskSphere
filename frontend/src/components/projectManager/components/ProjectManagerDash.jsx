import React, { useState, useEffect } from "react";
import "../assets/css/projectManagerDash.css";
// import useFetch from "../../../hooks/UseFetch";
import { useNavigate } from "react-router-dom";
import usePost from "../../../hooks/usePost";
import styled from 'styled-components';

export default function ProjectManagerDash() {
 const { postData } = usePost();
  const [data, setData] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  const [showDash, setShowDash] = useState(true);
  const [selectedWorkspace,setselectedWorkspace] =useState(null);
  const [selectedTodo,setselectedTodo]=useState(null);
  const [selectedProject,setselectedProject]=useState(null);
  const employeeId = 1; 
  const navigate=useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/projectManagerDashView/${employeeId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [employeeId]); 

const OpenWorkspace=(id)=>
{
  setselectedWorkspace(id);
  navigate('workspaceDash', { state: { workspaceId: id } });
}
const OpenProject=(id)=>
{
  setselectedProject(id);
  navigate('projectDash', { state: { selectedProjectId: id } });
}
const ChangeTodoStatus = async (id, status, employeeId) => {
  setselectedTodo(id);

  const updatedStatus = status === "pending" ? "completed" : "pending";

  const input = {
    id: id,
    status: updatedStatus,
    employeeId: employeeId,
  };

  await postData("http://localhost:8000/api/changeTodoStatus", input);

  const updatedTodos = data.data.todo.map((todo) => {
    if (todo.id === id) {
      return { ...todo, status: updatedStatus }; 
    }
    return todo;
  });

  setData((prevData) => ({
    ...prevData,
    data: {
      ...prevData.data,
      todo: updatedTodos, 
    },
  }));
};

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {showDash && (
        <>


<h3 className="ReportHead">Report</h3>
          <div className="ReportIndex">
              <div  className="reportRow">
                <ul>
                  <li><strong>Project Count:</strong></li>
                  <li>
                   {data.data.projectCount}
                  </li>
                </ul>
              </div>

              <div  className="reportRow">
                <ul>
                  <li><strong>Workspaces Count:</strong></li>
                  <li>
                {data.data.workspaceCount}
                  </li>
                </ul>
              </div>

              <div  className="reportRow">
                <ul>
                  <li><strong>Tasks Count:</strong></li>
                  <li>
               {data.data.taskCount}
                  </li>
                </ul>
              </div>

              <div  className="reportRow">
                <ul>
                  <li><strong>Employee Count:</strong></li>
                  <li>
                    {data.data.employeeCount}
                  </li>
                </ul>
              </div>

          </div>
          <h3 className="workspaceHead">Workspaces</h3>
          <div className="workspaceIndex">
            {data.data.workspaces.map((workspace, index) => (
              <div key={index} className="projectRow">
                <ul>
                  <li><strong>{workspace.name}</strong></li>
                  <li><button className="statusBtn" onClick={()=>OpenWorkspace(workspace.id)}>Open</button></li>
                </ul>
              </div>
            ))}
          </div>

          <div className="secondDiv">
            <div className="todo">
              <div className="todoBar">
                <h1 className="todoHead">Todo</h1>
                <i className="fa-solid fa-plus btn btn-link" id="filter"></i>
              </div>

              <div className="todoBody">
              
                {data.data.todo.map((todo, index) => (
                  <div key={index} className="todolist">
                    <div className="todoItem">
                      <span className="todoSerial">{index+1}</span>
                      <span className="todoName">{todo.todo}</span>
                      <span 
          className={`todoStatus ${todo.status.toLowerCase()}`} 
          onDoubleClick={(e) => {
            e.preventDefault(); 
            ChangeTodoStatus(todo.id, todo.status, todo.employeeId);
          }}
        >{todo.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="project">
              <div className="projectBar">
                <h1 className="projectHead">Projects</h1>
              </div>
              <div className="projectBody">
                {data.data.projects.map((project, index) => (
                  <div key={index} className="projectlist">
                    <div className="projectItem">
                      <span className="projectSNO">{index + 1}</span>
                      <span className="projectTitle">{project.name}</span>
                      <span className="ProjectOpenBtn">
                        <button onClick={()=>OpenProject(project.id)}>Open</button>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pmthirdDiv">
            <h1 id="pmheading">Tasks</h1>
            <div className="pmtable-container">
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
                  </tr>
                </thead>
                <tbody>
                  {data.data.tasks.map((task, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{task.name}</td>
                      <td>{task.description}</td>
                      <td>
                        {task.employee}
                      </td>
                      <td>{task.sdate}</td>
                      <td>{task.edate}</td>
                      <td>{task.status}</td>
                      <td>{task.priority}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}


const ProjectManagerDashContainer = styled.div`
  
.workspaceIndex {
    display: flex;
    flex-wrap: nowrap; /* ✨ Change: No wrap */
    gap: 30px;
    overflow-x: auto; /* ✨ Enable horizontal scroll */
    padding: 20px;
    margin-top: 10px;
  }

  .projectRow {
    min-width: 280px; /* ✨ Ensure width for horizontal scroll */
    background-color: #1e293b;
    border-radius: 15px;
    padding: 20px;
    color: white;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    flex-shrink: 0; /* ✨ Prevent shrinking on scroll */
  }

  .projectRow:hover {
    transform: translateY(-10px);
    box-shadow: 0 6px 12px rgba(0, 255, 170, 0.3);
  }

  .projectRow ul {
    list-style: none;
    padding: 0;
  }

  .projectRow ul li {
    margin: 10px 0;
    font-size: 1.2rem;
  }

  .statusBtn {
    background-color: #10b981;
    color: white;
    border: none;
    border-radius: 20px;
    padding: 10px 20px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .statusBtn:hover {
    background-color: #22c55e;
  }
  .workspaceHead
  {
    font-family: Arial, sans-serif;
font-size: 1.4rem;
  }
  .secondDiv
  {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 40px;
  }
  .todoHead
  {
    font-family: 'Baloo 2', cursive;
 
  }
  .todo
  {
    width: 45%;
    height: 500px;
  position: relative;
    box-shadow: 0 4px 4px 4px rgba(0,0,0,0.1);
    border-radius: 10px;
    padding: 20px;
    
  }
.todoBody
{
width: 92%;
height: 80%;
overflow-y: auto;
position: absolute;
margin: auto;
}
.projectBody
{
width: 92%;
height: 80%;
overflow-y: auto;
position: absolute;
margin: auto;
}
  .project
  {
    width: 45%;
    height: 500px;
position: relative;
    box-shadow: 0 4px 4px 4px rgba(0,0,0,0.1);
    border-radius: 10px;
    padding: 20px;
  }
  .projectHead
  {
    font-family: 'Baloo 2', cursive;

  }
  .todolist
  {
    width: 98%;
    margin: auto;
    background-color: #1e293b;
    border: 1px solid black;
    border-radius: 20px;
    height: 70px;
    margin-top: 10px;
    
  }
  .projectlist
  {
    width: 98%;
    margin: auto;
    border: 1px solid black;
    background-color: #1e293b;
    border-radius: 20px;
    height: 70px;
    margin-top: 10px;

  }
  .todoBar
  {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: 1px solid gray;
  }
  .projectBar
  {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: 1px solid gray;
  }
  .todoItem {
display: flex;
justify-content: space-between;
align-items: center;
height: 100%;
padding: 0 20px;
color: white;
font-family: 'Arial', sans-serif;
}
.projectItem {
display: flex;
justify-content: space-between;
align-items: center;
height: 100%;
padding: 0 20px;
color: white;
font-family: 'Arial', sans-serif;
font-size: 1rem;
}
.projectlist:hover{
transform: translateY(-2px);
}
.todolist:hover{
transform: translateY(-2px);

}


.todoSerial {
width: 30px;
font-weight: bold;
}
.todoName {
flex: 1;
margin-left: 10px;
}
.todoStatus {
padding: 5px 10px;
border-radius: 15px;
font-size: 0.9rem;
font-weight: bold;
cursor: pointer;
user-select: none;
}
.todoStatus.pending {
background-color: red; /* yellow */
color: black;
}
.todoStatus.completed {
  background-color: green; /* yellow */
  color: black;
  }
.todoStatus.done {
background-color: #10b981; /* green */
color: white;
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

      #filter:hover {
          color: #94a3b8;
          transform: scale(1.2);
      }

      .pmtable-container {
          max-height: 70vh;
          overflow-y: auto;
          border: 1px solid #334155;
          border-radius: 10px;
          background-color: #0f172a;
          padding: 10px;
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
        color: white;
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
.pmthirdDiv
{

box-shadow: 0 4px 4px 4px rgba(0,0,0,0.1);
    border-radius: 10px;
    padding: 20px;
    height: fit-content;
}
#pmTaskTableBody tr{
background-color: white;
}
#pmTaskTableBody tr:hover{
background-color: #334155;
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


.ReportIndex {
  display: flex;
  flex-wrap: nowrap; /* ✨ Change: No wrap */
  gap: 30px;
  overflow-x: auto; /* ✨ Enable horizontal scroll */
  padding: 20px;
  margin-top: 10px;
}

.reportRow {
  min-width: 280px; /* ✨ Ensure width for horizontal scroll */
  background-color: #1e293b;
  border-radius: 15px;
  padding: 20px;
  color: white;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  flex-shrink: 0; /* ✨ Prevent shrinking on scroll */
}

.reportRow:hover {
  transform: translateY(-10px);
  box-shadow: 0 6px 12px rgba(0, 255, 170, 0.3);
}

.reportRow ul {
  list-style: none;
  padding: 0;
}

.reportRow ul li {
  margin: 10px 0;
  font-size: 1.2rem;
}

.ReportHead
{
  font-size: 1.4rem;
  font-family: 'Baloo 2';
}
`;