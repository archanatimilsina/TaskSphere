import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import usePost from "../../../hooks/usePost";
import styled from 'styled-components';

export default function UserDash() {
  // Try to get actual ID from storage, fallback to "86" for testing
  const employeeId = localStorage.getItem("userId") || "86";
  const { postData } = usePost();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDash, setShowDash] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/userDashView/${employeeId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch dashboard data.");
        }
        const result = await response.json();

        // Filter projects, workspaces, and tasks based on involvement arrays
        const involvedProjects = result.data.projects.filter(project =>
          result.data.projectInvolved.includes(project.id)
        );

        const involvedWorkspaces = result.data.workspaces.filter(workspace =>
          result.data.workspaceInvolved.includes(workspace.id)
        );

        const involvedTasks = result.data.tasks.filter(task =>
          result.data.taskInvolved.includes(task.id)
        );

        const filteredData = {
          ...result,
          data: {
            ...result.data,
            projects: involvedProjects,
            workspaces: involvedWorkspaces,
            tasks: involvedTasks,
          }
        };

        setData(filteredData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [employeeId]);

  const OpenWorkspace = (id) => {
    navigate('/workspaceDash', { state: { workspaceId: id } });
  };

  const OpenProject = (id) => {
    navigate('/projectDash', { state: { selectedProjectId: id } });
  };

  const ChangeTodoStatus = async (id, status, empId) => {
    const updatedStatus = status === "pending" ? "completed" : "pending";
    const input = { id: id, status: updatedStatus, employeeId: empId };

    await postData("/api/changeTodoStatus", input);

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

  if (loading) return <div className="loading">Loading Dashboard...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <UserDashContainer>
      {showDash && (
        <>
          <h3 className="ReportHead">Report Overview</h3>
          <div className="ReportIndex">
            <div className="reportRow">
              <ul>
                <li><strong>Project Count</strong></li>
                <li>{data.data.projectCount}</li>
              </ul>
            </div>
            <div className="reportRow">
              <ul>
                <li><strong>Workspaces</strong></li>
                <li>{data.data.workspaceCount}</li>
              </ul>
            </div>
            <div className="reportRow">
              <ul>
                <li><strong>Tasks</strong></li>
                <li>{data.data.taskCount}</li>
              </ul>
            </div>
            <div className="reportRow">
              <ul>
                <li><strong>Team Members</strong></li>
                <li>{data.data.employeeCount}</li>
              </ul>
            </div>
          </div>

          <h3 className="workspaceHead">Workspaces</h3>
          <div className="workspaceIndex">
            {data.data.workspaces.map((workspace, index) => (
              <div key={index} className="projectRow">
                <ul>
                  <li><strong>{workspace.name}</strong></li>
                  <li>
                    <button className="statusBtn" onClick={() => OpenWorkspace(workspace.id)}>
                      Open Workspace
                    </button>
                  </li>
                </ul>
              </div>
            ))}
          </div>

          <div className="secondDiv">
            <div className="todo">
              <div className="todoBar">
                <h1 className="todoHead">To-Do List</h1>
                <i className="fa-solid fa-plus btn btn-link" id="filter"></i>
              </div>
              <div className="todoBody">
                {data.data.todo.map((todo, index) => (
                  <div key={index} className="todolist">
                    <div className="todoItem">
                      <span className="todoSerial">{index + 1}</span>
                      <span className="todoName">{todo.todo}</span>
                      <span
                        className={`todoStatus ${todo.status.toLowerCase()}`}
                        onDoubleClick={() => ChangeTodoStatus(todo.id, todo.status, todo.employeeId)}
                      >
                        {todo.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="project">
              <div className="projectBar">
                <h1 className="projectHead">Recent Projects</h1>
              </div>
              <div className="projectBody">
                {data.data.projects.map((project, index) => (
                  <div key={index} className="projectlist">
                    <div className="projectItem">
                      <span className="projectSNO">{index + 1}</span>
                      <span className="projectTitle">{project.name}</span>
                      <span className="ProjectOpenBtn">
                        <button onClick={() => OpenProject(project.id)}>View</button>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pmthirdDiv">
            <h1 id="pmheading">Assigned Tasks</h1>
            <div className="pmtable-container">
              <table>
                <thead>
                  <tr>
                    <th>S.N</th>
                    <th>Task Name</th>
                    <th>Description</th>
                    <th>Assigned To</th>
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
                      <td>{task.employee}</td>
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
    </UserDashContainer>
  );
}

const UserDashContainer = styled.div`
  padding: 20px;
  background-color: #f8fafc;
  min-height: 100vh;

  .ReportIndex, .workspaceIndex {
    display: flex;
    flex-wrap: nowrap;
    gap: 25px;
    overflow-x: auto;
    padding: 15px 5px;
    scrollbar-width: thin;
    &::-webkit-scrollbar { height: 6px; }
    &::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
  }

  .reportRow, .projectRow {
    min-width: 260px;
    background-color: #1e293b;
    border-radius: 16px;
    padding: 24px;
    color: white;
    text-align: center;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    flex-shrink: 0;
    ul { list-style: none; padding: 0; margin: 0; }
    li { margin: 8px 0; font-size: 1.1rem; }
    &:hover { transform: translateY(-5px); box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2); }
  }

  .statusBtn, .ProjectOpenBtn button {
    background-color: #10b981;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 10px 20px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
    &:hover { background-color: #059669; }
  }

  .workspaceHead, .ReportHead {
    font-family: 'Baloo 2', cursive;
    font-size: 1.5rem;
    margin: 20px 0 10px;
    color: #1e293b;
  }

  .secondDiv {
    display: flex;
    gap: 30px;
    margin: 40px 0;
    @media (max-width: 1024px) { flex-direction: column; }
  }

  .todo, .project {
    flex: 1;
    height: 500px;
    background: white;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    padding: 25px;
    display: flex;
    flex-direction: column;
  }

  .todoBody, .projectBody {
    flex: 1;
    overflow-y: auto;
    margin-top: 15px;
    padding-right: 5px;
  }

  .todolist, .projectlist {
    background-color: #1e293b;
    border-radius: 12px;
    margin-bottom: 12px;
    padding: 15px 20px;
    color: white;
    transition: transform 0.2s;
    &:hover { transform: scale(1.01); }
  }

  .todoItem, .projectItem {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .todoStatus {
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.85rem;
    text-transform: uppercase;
    font-weight: 700;
    cursor: pointer;
    &.pending { background: #ef4444; color: white; }
    &.completed { background: #10b981; color: white; }
  }

  .pmthirdDiv {
    background: white;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    padding: 30px;
    margin-top: 30px;
  }

  .pmtable-container {
    overflow-x: auto;
    margin-top: 20px;
    table {
      width: 100%;
      border-collapse: collapse;
      th { background: #f1f5f9; color: #475569; font-weight: 600; }
      th, td { padding: 16px; text-align: left; border-bottom: 1px solid #e2e8f0; color: #1e293b; }
      tbody tr:hover { background: #f8fafc; }
    }
  }

  #pmheading {
    font-family: 'Baloo 2', cursive;
    font-size: 1.8rem;
    color: #1e293b;
    padding-bottom: 10px;
    border-bottom: 2px solid #e2e8f0;
  }
`;