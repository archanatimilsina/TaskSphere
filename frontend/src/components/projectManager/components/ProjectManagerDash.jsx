import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import usePost from "../../../hooks/usePost";
import styled from 'styled-components';

export default function PmDash() {
  const { postData } = usePost();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const employeeId = 1;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/projectManagerDashView/${employeeId}`);
        if (!response.ok) throw new Error("Cloud synchronization failed");
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

  const OpenWorkspace = (id) => navigate('workspaceDash', { state: { workspaceId: id } });
  const OpenProject = (id) => navigate('projectDash', { state: { selectedProjectId: id } });

  const ChangeTodoStatus = async (id, status, empId) => {
    const updatedStatus = status === "pending" ? "completed" : "pending";
    const input = { id, status: updatedStatus, employeeId: empId };

    await postData("http://localhost:8000/api/changeTodoStatus", input);

    const updatedTodos = data.data.todo.map((todo) => 
      todo.id === id ? { ...todo, status: updatedStatus } : todo
    );

    setData((prev) => ({
      ...prev,
      data: { ...prev.data, todo: updatedTodos },
    }));
  };

  if (loading) return <StatusBox>Initializing Executive Dashboard...</StatusBox>;
  if (error) return <StatusBox className="error">Error: {error}</StatusBox>;

  return (
    <ProjectManagerDashContainer>
      <header className="dash-header">
        <h1>Management Overview</h1>
        <p>Real-time analytics and project tracking</p>
      </header>

      {/* KPI Section */}
      <section className="kpi-section">
        <h3 className="section-label">System Report</h3>
        <div className="kpi-grid">
          <div className="kpi-card">
            <i className="fas fa-layer-group"></i>
            <div className="kpi-info">
              <span>Projects</span>
              <strong>{data.data.projectCount}</strong>
            </div>
          </div>
          <div className="kpi-card">
            <i className="fas fa-th-large"></i>
            <div className="kpi-info">
              <span>Workspaces</span>
              <strong>{data.data.workspaceCount}</strong>
            </div>
          </div>
          <div className="kpi-card">
            <i className="fas fa-tasks"></i>
            <div className="kpi-info">
              <span>Tasks</span>
              <strong>{data.data.taskCount}</strong>
            </div>
          </div>
          <div className="kpi-card">
            <i className="fas fa-users"></i>
            <div className="kpi-info">
              <span>Employees</span>
              <strong>{data.data.employeeCount}</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Horizontal Workspaces */}
      <section className="horizontal-section">
        <h3 className="section-label">Active Workspaces</h3>
        <div className="scroll-wrapper">
          {data.data.workspaces.map((workspace) => (
            <div key={workspace.id} className="workspace-card">
              <div className="card-top">
                <i className="fas fa-briefcase"></i>
                <h4>{workspace.name}</h4>
              </div>
              <button className="open-link" onClick={() => OpenWorkspace(workspace.id)}>
                Access Workspace
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Todo and Projects Side-by-Side */}
      <div className="split-view">
        <section className="glass-panel">
          <div className="panel-header">
            <h3>Focus List (Todo)</h3>
            <i className="fas fa-plus-circle"></i>
          </div>
          <div className="panel-body">
            {data.data.todo.map((todo, index) => (
              <div key={todo.id} className="todo-row">
                <span className="sn">{index + 1}</span>
                <span className="task-text">{todo.todo}</span>
                <span 
                  className={`status-pill ${todo.status.toLowerCase()}`}
                  onDoubleClick={() => ChangeTodoStatus(todo.id, todo.status, todo.employeeId)}
                >
                  {todo.status}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="glass-panel">
          <div className="panel-header">
            <h3>Enterprise Projects</h3>
          </div>
          <div className="panel-body">
            {data.data.projects.map((project, index) => (
              <div key={project.id} className="project-row">
                <span className="sn">{index + 1}</span>
                <span className="project-name">{project.name}</span>
                <button className="view-btn" onClick={() => OpenProject(project.id)}>
                  View Hub
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Master Task Table */}
      <section className="table-section">
        <h3 className="section-label">Global Task Registry</h3>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>S.N</th>
                <th>Task Name</th>
                <th>Assigned To</th>
                <th>Timeline</th>
                <th>Status</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              {data.data.tasks.map((task, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td className="bold-text">{task.name}</td>
                  <td>{task.employee}</td>
                  <td className="date-text">{task.sdate} - {task.edate}</td>
                  <td><span className={`table-status ${task.status.toLowerCase()}`}>{task.status}</span></td>
                  <td><span className={`priority-flag ${task.priority.toLowerCase()}`}>{task.priority}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </ProjectManagerDashContainer>
  );
}

const StatusBox = styled.div`
  text-align: center;
  padding: 100px;
  font-family: 'Baloo 2', cursive;
  color: #64748b;
  &.error { color: #ef4444; }
`;

const ProjectManagerDashContainer = styled.div`
  padding: 30px;
  font-family: 'Baloo 2', cursive;
  background-color: #f8fafc;
  min-height: 100vh;

  .dash-header {
    margin-bottom: 40px;
    h1 { font-size: 2.5rem; color: #0f172a; margin: 0; }
    p { color: #64748b; font-size: 1.1rem; }
  }

  .section-label {
    font-size: 1.2rem;
    color: #1e293b;
    margin-bottom: 20px;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 800;
  }

  /* KPI Grid */
  .kpi-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 20px;
    margin-bottom: 40px;
  }

  .kpi-card {
    background: white;
    padding: 25px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    gap: 20px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.03);
    border: 1px solid #f1f5f9;
    
    i { width: 50px; height: 50px; background: #eff6ff; color: #3b82f6; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.4rem; }
    .kpi-info {
      span { display: block; color: #94a3b8; font-size: 0.9rem; font-weight: 700; }
      strong { font-size: 1.8rem; color: #0f172a; }
    }
  }

  /* Horizontal Scroll */
  .scroll-wrapper {
    display: flex;
    gap: 25px;
    overflow-x: auto;
    padding-bottom: 20px;
    &::-webkit-scrollbar { height: 6px; }
    &::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
  }

  .workspace-card {
    min-width: 280px;
    background: #1e293b;
    color: white;
    padding: 30px;
    border-radius: 24px;
    text-align: center;
    transition: 0.3s;
    
    &:hover { transform: translateY(-5px); box-shadow: 0 10px 25px rgba(30, 41, 59, 0.2); }
    .card-top { i { font-size: 2rem; color: #10b981; margin-bottom: 15px; } h4 { font-size: 1.3rem; margin: 0; } }
    .open-link { margin-top: 20px; background: #10b981; color: white; border: none; padding: 10px 20px; border-radius: 12px; font-weight: 700; cursor: pointer; &:hover { background: #059669; } }
  }

  /* Split View */
  .split-view {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    margin: 40px 0;
    @media (max-width: 900px) { grid-template-columns: 1fr; }
  }

  .glass-panel {
    background: white;
    border-radius: 24px;
    padding: 30px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.02);
    border: 1px solid #f1f5f9;
    height: 500px;
    display: flex;
    flex-direction: column;

    .panel-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; h3 { margin: 0; font-size: 1.5rem; } i { color: #3b82f6; cursor: pointer; font-size: 1.5rem; } }
    .panel-body { overflow-y: auto; flex: 1; padding-right: 10px; }
  }

  /* Shared Rows */
  .todo-row, .project-row {
    display: flex;
    align-items: center;
    background: #f8fafc;
    padding: 15px 20px;
    border-radius: 16px;
    margin-bottom: 12px;
    transition: 0.2s;
    &:hover { background: #f1f5f9; }
    .sn { color: #94a3b8; font-weight: 800; width: 30px; }
    .task-text, .project-name { flex: 1; font-weight: 700; color: #334155; }
  }

  .status-pill { padding: 4px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: 800; text-transform: uppercase; cursor: pointer; &.pending { background: #fee2e2; color: #ef4444; } &.completed { background: #dcfce7; color: #16a34a; } }
  .view-btn { background: #3b82f6; color: white; border: none; padding: 6px 15px; border-radius: 10px; font-weight: 700; cursor: pointer; }

  /* Table */
  .table-section {
    background: #0f172a;
    border-radius: 24px;
    padding: 30px;
    color: white;
    .section-label { color: #3b82f6; }
  }

  .table-container {
    overflow-x: auto;
    table {
      width: 100%;
      border-collapse: collapse;
      th { text-align: left; padding: 15px; color: #64748b; font-size: 0.85rem; border-bottom: 1px solid #1e293b; }
      td { padding: 15px; border-bottom: 1px solid #1e293b; font-size: 1rem; }
      .bold-text { font-weight: 700; }
      .date-text { color: #94a3b8; font-size: 0.9rem; }
    }
  }

  .priority-flag {
    padding: 4px 10px; border-radius: 6px; font-size: 0.75rem; font-weight: 900;
    &.high { background: #450a0a; color: #f87171; }
    &.medium { background: #422006; color: #fbbf24; }
  }
`;