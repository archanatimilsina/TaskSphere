import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { createGlobalStyle } from 'styled-components';
import usePost from "../../../hooks/usePost";
import useFetch from '../../../hooks/useFetch';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: #f8fafc;
  }
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
  }
`;

export default function AdminDash() {
  const navigate = useNavigate();
  const { postData } = usePost();
  

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  const { data: applications, loading: appsLoading, error: appsError } = useFetch("http://localhost:8000/api/allApplication");
  

  const employeeId = 96;

  
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/projectManagerDashView/${employeeId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch dashboard data");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, [employeeId]);

  const ChangeTodoStatus = async (id, currentStatus, empId) => {
    const updatedStatus = currentStatus === "pending" ? "completed" : "pending";

    setData((prevData) => {
      const updatedTodos = prevData.data.todo.map((todo) => {
        if (todo.id === id) return { ...todo, status: updatedStatus };
        return todo;
      });
      return { ...prevData, data: { ...prevData.data, todo: updatedTodos } };
    });

    try {
      const input = { id, status: updatedStatus, employeeId: empId };
      const res = await postData("http://localhost:8000/api/changeTodoStatus", input);
      
      if (res && res.error) {
        throw new Error("API rejected the status change");
      }
    } catch (err) {
      console.error("Failed to update status, reverting...", err);
      setData((prevData) => {
        const revertedTodos = prevData.data.todo.map((todo) => {
          if (todo.id === id) return { ...todo, status: currentStatus };
          return todo;
        });
        return { ...prevData, data: { ...prevData.data, todo: revertedTodos } };
      });
    }
  };

  if (loading) {
    return (
      <LoadingScreen>
        <div className="spinner"></div>
        <p>Syncing Dashboard...</p>
      </LoadingScreen>
    );
  }

  if (error) {
    return (
      <ErrorScreen>
        <i className="fas fa-exclamation-triangle"></i>
        <h2>Connection Error</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry Connection</button>
      </ErrorScreen>
    );
  }

  const todos = data?.data?.todo || [];
  const apps = applications?.data || [];

  return (
    <>
      <GlobalStyle />
      <AdminDashContainer>
        {/* Header */}
        <header className="main-header">
          <div className="header-content">
            <h1>Admin Management System</h1>
            <p>Overview of organizational metrics and services</p>
          </div>
          <div className="header-actions">
            <span className="date-display">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </span>
          </div>
        </header>

        <section className="service-section">
          <h2 className="section-title">Quick Services</h2>
          <div className="service-grid">
            <ServiceCard onClick={() => navigate("sendEmail")} color="#4f46e5">
              <div className="icon-box"><i className="fas fa-envelope"></i></div>
              <h3>Send Email</h3>
              <span>Contact Staff</span>
            </ServiceCard>

            <ServiceCard onClick={() => navigate("createNotices")} color="#7c3aed">
              <div className="icon-box"><i className="fas fa-edit"></i></div>
              <h3>Create Notice</h3>
              <span>Announcements</span>
            </ServiceCard>

            <ServiceCard onClick={() => navigate("employees")} color="#059669">
              <div className="icon-box"><i className="fas fa-users-cog"></i></div>
              <h3>Employee Data</h3>
              <span>Staff Management</span>
            </ServiceCard>

            <ServiceCard onClick={() => navigate("registerApplication")} color="#ea580c">
              <div className="icon-box"><i className="fas fa-plus-square"></i></div>
              <h3>Register App</h3>
              <span>New Entries</span>
            </ServiceCard>

            <ServiceCard onClick={() => navigate("notices")} color="#db2777">
              <div className="icon-box"><i className="fas fa-clipboard-list"></i></div>
              <h3>Notices</h3>
              <span>Archive</span>
            </ServiceCard>
          </div>
        </section>

        <div className="dashboard-main-grid">
          
          <DataPanel>
            <div className="panel-head">
              <h2><i className="fas fa-check-circle"></i> Operational Tasks</h2>
              <button className="add-btn" title="Add new task">
                <i className="fas fa-plus"></i>
              </button>
            </div>
            <div className="panel-body">
              {todos.length > 0 ? (
                todos.map((todo, index) => (
                  <div key={todo.id || index} className="task-row">
                    <div className="task-main">
                      <span className="task-index">{index + 1}</span>
                      <span className="task-title" style={{ textDecoration: todo.status === 'completed' ? 'line-through' : 'none', color: todo.status === 'completed' ? '#94a3b8' : '#1e293b' }}>
                        {todo.todo}
                      </span>
                    </div>
                    <StatusBadge 
                      className={todo.status.toLowerCase()} 
                      onDoubleClick={() => ChangeTodoStatus(todo.id, todo.status, todo.employeeId)}
                      title="Double click to toggle status"
                    >
                      {todo.status}
                    </StatusBadge>
                  </div>
                ))
              ) : (
                <div className="empty-state">No pending tasks for today.</div>
              )}
            </div>
          </DataPanel>

          <DataPanel>
            <div className="panel-head">
              <h2><i className="fas fa-id-card"></i> Incoming Applications</h2>
            </div>
            <div className="panel-body">
              {appsLoading ? (
                <div className="empty-state">Loading applications...</div>
              ) : appsError ? (
                <div className="empty-state error">Failed to load applications.</div>
              ) : apps.length > 0 ? (
                apps.map((app) => (
                  <div key={app.id} className="app-row">
                    <div className="app-main">
                      <div className="avatar">{app.fname ? app.fname.charAt(0).toUpperCase() : '?'}</div>
                      <div className="app-info">
                        <span className="app-name">{app.fname}</span>
                        <span className="app-meta">Submission ID: {app.id}</span>
                      </div>
                    </div>
                    <button className="view-link" title="View Application">
                      <i className="fas fa-chevron-right"></i>
                    </button>
                  </div>
                ))
              ) : (
                <div className="empty-state">No new applications at the moment.</div>
              )}
            </div>
          </DataPanel>

        </div>
      </AdminDashContainer>
    </>
  );
}


const LoadingScreen = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f8fafc;
  
  .spinner {
    width: 45px;
    height: 45px;
    border: 4px solid #e2e8f0;
    border-top: 4px solid #4f46e5;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  p { 
    margin-top: 20px; 
    color: #64748b; 
    font-family: 'Inter', system-ui, sans-serif; 
    font-weight: 500;
  }
  
  @keyframes spin { 
    0% { transform: rotate(0deg); } 
    100% { transform: rotate(360deg); } 
  }
`;

const ErrorScreen = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f8fafc;
  color: #ef4444;
  font-family: 'Inter', system-ui, sans-serif;

  i { font-size: 3rem; margin-bottom: 15px; }
  h2 { margin: 0 0 10px 0; color: #1e293b; }
  p { color: #64748b; margin-bottom: 20px; }
  
  button {
    background: #4f46e5;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    transition: background 0.2s;
    
    &:hover { background: #4338ca; }
  }
`;

const AdminDashContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: 'Inter', system-ui, sans-serif;

  .main-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 40px;
    flex-wrap: wrap;
    gap: 20px;

    h1 { 
      font-size: 2.2rem; 
      color: #0f172a; 
      margin: 0; 
      font-weight: 800; 
      letter-spacing: -0.5px;
    }
    
    p { 
      color: #64748b; 
      margin: 8px 0 0 0; 
      font-size: 1.05rem;
    }
    
    .date-display { 
      background: white; 
      padding: 12px 24px; 
      border-radius: 12px; 
      color: #4f46e5; 
      font-weight: 600; 
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); 
      border: 1px solid #f1f5f9;
      display: inline-block;
    }
  }

  .section-title { 
    font-size: 1.1rem; 
    color: #475569; 
    text-transform: uppercase; 
    letter-spacing: 1.5px; 
    margin-bottom: 20px; 
    font-weight: 700;
  }

  .service-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 20px;
    margin-bottom: 50px;
  }

  .dashboard-main-grid {
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
    gap: 30px;
    @media (max-width: 1024px) { grid-template-columns: 1fr; }
  }
`;

const ServiceCard = styled.div`
  background: white;
  padding: 30px 20px;
  border-radius: 20px;
  text-align: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  border: 1px solid #f1f5f9;

  .icon-box {
    width: 65px;
    height: 65px;
    background: ${props => props.color}15;
    color: ${props => props.color};
    border-radius: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 18px;
    font-size: 1.6rem;
    transition: all 0.3s ease;
  }

  h3 { margin: 0; font-size: 1.15rem; color: #1e293b; font-weight: 700; transition: color 0.3s; }
  span { font-size: 0.9rem; color: #94a3b8; margin-top: 6px; display: block; transition: color 0.3s; }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    background: ${props => props.color};
    border-color: ${props => props.color};
    
    .icon-box { 
      background: rgba(255, 255, 255, 0.2); 
      color: white; 
    }
    h3, span { color: white; }
  }
`;

const DataPanel = styled.div`
  background: white;
  border-radius: 24px;
  padding: 30px;
  height: 600px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.04);
  border: 1px solid #f1f5f9;

  .panel-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
    padding-bottom: 15px;
    border-bottom: 1px solid #f1f5f9;
    
    h2 { 
      font-size: 1.3rem; 
      margin: 0; 
      color: #0f172a; 
      display: flex; 
      align-items: center; 
      gap: 12px; 
      i { color: #4f46e5; }
    }
    
    .add-btn { 
      background: #f1f5f9; 
      border: none; 
      width: 38px; 
      height: 38px; 
      border-radius: 10px; 
      color: #4f46e5; 
      cursor: pointer; 
      transition: all 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
      
      &:hover { 
        background: #4f46e5; 
        color: white; 
        transform: scale(1.05);
      } 
    }
  }

  .panel-body {
    overflow-y: auto;
    flex: 1;
    padding-right: 8px;
    
    .empty-state {
      text-align: center;
      color: #94a3b8;
      padding: 40px 0;
      font-style: italic;
      
      &.error { color: #ef4444; }
    }
  }

  .task-row, .app-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px;
    background: #f8fafc;
    border-radius: 16px;
    margin-bottom: 12px;
    border: 1px solid transparent;
    transition: all 0.2s ease;
    
    &:hover { 
      background: white; 
      box-shadow: 0 4px 12px rgba(0,0,0,0.05); 
      border-color: #e2e8f0;
      transform: translateY(-2px); 
    }
  }

  .task-main { display: flex; align-items: center; gap: 16px; }
  
  .task-index { 
    background: #e2e8f0; 
    color: #475569; 
    min-width: 30px; 
    height: 30px; 
    display: flex; 
    align-items: center; 
    justify-content: center; 
    border-radius: 8px; 
    font-size: 0.85rem; 
    font-weight: 700; 
  }
  
  .task-title { font-weight: 500; transition: color 0.3s; }

  .app-main { display: flex; align-items: center; gap: 16px; }
  
  .avatar { 
    width: 45px; 
    height: 45px; 
    background: linear-gradient(135deg, #4f46e5, #7c3aed); 
    color: white; 
    border-radius: 14px; 
    display: flex; 
    align-items: center; 
    justify-content: center; 
    font-weight: 700; 
    font-size: 1.2rem;
  }
  
  .app-info { display: flex; flex-direction: column; gap: 4px; }
  .app-name { font-weight: 600; color: #1e293b; font-size: 1.05rem; }
  .app-meta { font-size: 0.8rem; color: #64748b; }
  
  .view-link { 
    background: white; 
    border: 1px solid #e2e8f0; 
    width: 35px;
    height: 35px;
    border-radius: 10px;
    color: #64748b; 
    cursor: pointer; 
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    
    &:hover { 
      color: #4f46e5; 
      border-color: #4f46e5;
      background: #f5f3ff;
    } 
  }
`;

const StatusBadge = styled.span`
  padding: 6px 16px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  cursor: pointer;
  user-select: none;
  transition: all 0.2s;
  
  &.pending { 
    background: #fef2f2; 
    color: #ef4444; 
    border: 1px solid #fecaca; 
    
    &:hover { background: #fee2e2; }
  }
  
  &.completed { 
    background: #ecfdf5; 
    color: #10b981; 
    border: 1px solid #a7f3d0; 
    
    &:hover { background: #d1fae5; }
  }
`;