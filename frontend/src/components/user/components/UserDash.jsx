import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import usePost from "../../../hooks/usePost";

export default function UserDash() {
  const employeeId = localStorage.getItem("userId") || "86";
  const { postData } = usePost();
  
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/userDashView/${employeeId}`);
        if (!response.ok) throw new Error("Dashboard Synchronization Failed.");
        
        const result = await response.json();

        // Mechanical filtering based on involvement intersection
        const involvedProjects = result.data.projects.filter(p => result.data.projectInvolved.includes(p.id));
        const involvedWorkspaces = result.data.workspaces.filter(w => result.data.workspaceInvolved.includes(w.id));
        const involvedTasks = result.data.tasks.filter(t => result.data.taskInvolved.includes(t.id));

        setData({
          ...result,
          data: {
            ...result.data,
            projects: involvedProjects,
            workspaces: involvedWorkspaces,
            tasks: involvedTasks,
          }
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [employeeId]);

  const handleStatusToggle = async (id, currentStatus) => {
    const newStatus = currentStatus === "pending" ? "completed" : "pending";
    await postData("/api/changeTodoStatus", { id, status: newStatus, employeeId });

    setData(prev => ({
      ...prev,
      data: {
        ...prev.data,
        todo: prev.data.todo.map(t => t.id === id ? { ...t, status: newStatus } : t)
      }
    }));
  };

  if (loading) return <StatusWrapper>Initialising your workspace dashboard...</StatusWrapper>;
  if (error) return <StatusWrapper className="error">{error}</StatusWrapper>;

  return (
    <UserDashContainer>
      <header className="dash-header">
        <div className="welcome-text">
          <h1>Operational Dashboard</h1>
          <p>Logged in as Resource #{employeeId}</p>
        </div>
        <div className="quick-stats">
          <div className="stat-pill">
            <span className="label">Live Projects</span>
            <span className="value">{data.data.projectCount}</span>
          </div>
          <div className="stat-pill">
            <span className="label">Active Tasks</span>
            <span className="value">{data.data.taskCount}</span>
          </div>
        </div>
      </header>

      <section className="metrics-grid">
        <MetricCard>
          <div className="card-icon"><i className="fa-solid fa-diagram-project"></i></div>
          <div className="card-info">
            <h4>Projects</h4>
            <p>{data.data.projectCount} Active Leads</p>
          </div>
        </MetricCard>
        <MetricCard>
          <div className="card-icon"><i className="fa-solid fa-layer-group"></i></div>
          <div className="card-info">
            <h4>Workspaces</h4>
            <p>{data.data.workspaceCount} Operating Environments</p>
          </div>
        </MetricCard>
        <MetricCard>
          <div className="card-icon"><i className="fa-solid fa-list-check"></i></div>
          <div className="card-info">
            <h4>Assigned</h4>
            <p>{data.data.taskCount} Pending Tasks</p>
          </div>
        </MetricCard>
        <MetricCard>
          <div className="card-icon"><i className="fa-solid fa-user-group"></i></div>
          <div className="card-info">
            <h4>Network</h4>
            <p>{data.data.employeeCount} Collaborators</p>
          </div>
        </MetricCard>
      </section>

      <div className="main-content-layout">
        <aside className="todo-panel">
          <div className="panel-header">
            <h3><i className="fa-solid fa-clipboard-list"></i> Personal To-Do</h3>
            <button className="add-todo"><i className="fa-solid fa-plus"></i></button>
          </div>
          <div className="todo-scroll">
            {data.data.todo.map((item, idx) => (
              <div key={item.id} className="todo-card">
                <span className="todo-idx">{idx + 1}</span>
                <p className="todo-text">{item.todo}</p>
                <button 
                  className={`status-toggle ${item.status.toLowerCase()}`}
                  onClick={() => handleStatusToggle(item.id, item.status)}
                >
                  {item.status}
                </button>
              </div>
            ))}
          </div>
        </aside>

        <section className="project-feed">
          <div className="panel-header">
            <h3><i className="fa-solid fa-clock-rotate-left"></i> Recent Projects</h3>
          </div>
          <div className="feed-scroll">
            {data.data.projects.map((proj) => (
              <div key={proj.id} className="feed-item">
                <div className="proj-details">
                  <h4>{proj.name}</h4>
                  <span>Project ID: {proj.id}</span>
                </div>
                <button className="view-btn" onClick={() => navigate('/projectDash', { state: { selectedProjectId: proj.id } })}>
                  Explore <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="task-assignment-table">
        <div className="panel-header">
          <h3><i className="fa-solid fa-tasks"></i> Detailed Task Assignments</h3>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Identity</th>
                <th>Description</th>
                <th>Timeline</th>
                <th>Priority</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.data.tasks.map((task) => (
                <tr key={task.id}>
                  <td className="task-name"><strong>{task.name}</strong></td>
                  <td className="task-desc">{task.description}</td>
                  <td className="task-dates">
                    <small>Start: {task.sdate}</small>
                    <small>End: {task.edate}</small>
                  </td>
                  <td>
                    <span className={`priority-tag ${task.priority?.toLowerCase()}`}>
                      {task.priority}
                    </span>
                  </td>
                  <td>
                    <span className={`status-pill ${task.status?.toLowerCase().replace(/\s+/g, '-')}`}>
                      {task.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </UserDashContainer>
  );
}

const StatusWrapper = styled.div`
  text-align: center;
  padding: 100px;
  font-family: 'Baloo 2', cursive;
  color: #64748b;
  &.error { color: #ef4444; }
`;

const UserDashContainer = styled.div`
  padding: 40px;
  max-width: 1300px;
  margin: 0 auto;
  font-family: 'Baloo 2', cursive;

  .dash-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
    h1 { font-size: 2.5rem; color: #1e293b; margin: 0; }
    p { color: #94a3b8; margin: 5px 0 0; }
    
    .quick-stats {
      display: flex;
      gap: 15px;
      .stat-pill {
        background: white;
        padding: 10px 20px;
        border-radius: 12px;
        border: 1px solid #e2e8f0;
        display: flex;
        flex-direction: column;
        .label { font-size: 0.75rem; color: #94a3b8; font-weight: 800; text-transform: uppercase; }
        .value { font-size: 1.2rem; color: #10b981; font-weight: 800; }
      }
    }
  }

  .metrics-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 25px;
    margin-bottom: 40px;
  }

  .main-content-layout {
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    gap: 30px;
    margin-bottom: 40px;
    @media (max-width: 1024px) { grid-template-columns: 1fr; }
  }

  .panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    h3 { font-size: 1.3rem; color: #1e293b; margin: 0; display: flex; align-items: center; gap: 10px; i { color: #10b981; } }
    .add-todo { background: none; border: none; color: #10b981; font-size: 1.2rem; cursor: pointer; }
  }

  .todo-scroll, .feed-scroll {
    height: 400px;
    overflow-y: auto;
    padding-right: 10px;
    &::-webkit-scrollbar { width: 4px; }
    &::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
  }

  .todo-card {
    background: #1e293b;
    border-radius: 14px;
    padding: 15px 20px;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 15px;
    color: white;
    .todo-idx { color: #475569; font-weight: 800; }
    .todo-text { flex: 1; margin: 0; font-size: 0.95rem; }
    .status-toggle {
      border: none;
      padding: 4px 12px;
      border-radius: 8px;
      font-size: 0.75rem;
      font-weight: 800;
      cursor: pointer;
      text-transform: uppercase;
      &.pending { background: #334155; color: #94a3b8; }
      &.completed { background: #10b981; color: white; }
    }
  }

  .feed-item {
    background: white;
    border: 1px solid #f1f5f9;
    border-radius: 14px;
    padding: 20px;
    margin-bottom: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: 0.2s;
    &:hover { border-color: #10b981; transform: translateX(5px); }
    h4 { margin: 0; color: #1e293b; }
    span { font-size: 0.8rem; color: #94a3b8; }
    .view-btn {
      background: #f8fafc;
      border: none;
      color: #10b981;
      padding: 8px 16px;
      border-radius: 8px;
      font-weight: 800;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      &:hover { background: #10b981; color: white; }
    }
  }

  .task-assignment-table {
    background: white;
    padding: 30px;
    border-radius: 24px;
    border: 1px solid #f1f5f9;
    .table-wrapper { overflow-x: auto; }
    table {
      width: 100%;
      border-collapse: collapse;
      th { text-align: left; padding: 15px; color: #94a3b8; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #f1f5f9; }
      td { padding: 15px; border-bottom: 1px solid #f8fafc; vertical-align: middle; }
      .task-name { color: #1e293b; }
      .task-desc { font-size: 0.9rem; color: #64748b; max-width: 250px; }
      .task-dates { display: flex; flex-direction: column; small { color: #94a3b8; } }
      .priority-tag { font-weight: 800; font-size: 0.8rem; &.high { color: #ef4444; } &.medium { color: #f59e0b; } &.low { color: #10b981; } }
      .status-pill {
        padding: 4px 12px; border-radius: 8px; font-size: 0.75rem; font-weight: 800;
        &.not-started { background: #f1f5f9; color: #64748b; }
        &.ongoing { background: #eff6ff; color: #3b82f6; }
        &.completed { background: #f0fdf4; color: #10b981; }
      }
    }
  }
`;

const MetricCard = styled.div`
  background: white;
  padding: 25px;
  border-radius: 20px;
  border: 1px solid #f1f5f9;
  display: flex;
  align-items: center;
  gap: 20px;
  transition: 0.3s;
  &:hover { transform: translateY(-5px); box-shadow: 0 10px 30px rgba(0,0,0,0.03); border-color: #10b981; }
  .card-icon { width: 50px; height: 50px; background: #f0fdf4; color: #10b981; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; }
  h4 { margin: 0; color: #94a3b8; font-size: 0.9rem; text-transform: uppercase; }
  p { margin: 2px 0 0; font-size: 1.1rem; color: #1e293b; font-weight: 800; }
`;