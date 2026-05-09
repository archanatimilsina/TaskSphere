import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import usePost from "../../../hooks/usePost";
import useFetch from '../../../hooks/useFetch'
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: #f0f2f5;
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
`;

export default function AdminDash() {
  const { postData } = usePost();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedWorkspace, setselectedWorkspace] = useState(null);
  const [selectedTodo, setselectedTodo] = useState(null);
  const [selectedProject, setselectedProject] = useState(null);
  
  const { data: applications, loading: loading1, error: error1 } = useFetch("http://localhost:8000/api/allApplication");
  const employeeId = 96;
  const navigate = useNavigate();

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

  const ChangeTodoStatus = async (id, status, employeeId) => {
    setselectedTodo(id);
    const updatedStatus = status === "pending" ? "completed" : "pending";
    const input = { id, status: updatedStatus, employeeId };

    await postData("http://localhost:8000/api/changeTodoStatus", input);

    const updatedTodos = data.data.todo.map((todo) => {
      if (todo.id === id) return { ...todo, status: updatedStatus };
      return todo;
    });

    setData((prevData) => ({
      ...prevData,
      data: { ...prevData.data, todo: updatedTodos },
    }));
  };

  if (loading) return <LoadingScreen><div className="spinner"></div><p>Syncing Dashboard...</p></LoadingScreen>;
  if (error) return <ErrorScreen><h2>Connection Error</h2><p>{error}</p></ErrorScreen>;

  return (
    <>
      <GlobalStyle />
      <AdminDashContainer>
        <header className="main-header">
          <div className="header-content">
            <h1>Admin Management System</h1>
            <p>Overview of organizational metrics and services</p>
          </div>
          <div className="header-actions">
            <span className="date-display">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
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
              <button className="add-btn"><i className="fas fa-plus"></i></button>
            </div>
            <div className="panel-body">
              {data.data.todo.map((todo, index) => (
                <div key={index} className="task-row">
                  <div className="task-main">
                    <span className="task-index">{index + 1}</span>
                    <span className="task-title">{todo.todo}</span>
                  </div>
                  <StatusBadge 
                    className={todo.status.toLowerCase()} 
                    onDoubleClick={() => ChangeTodoStatus(todo.id, todo.status, todo.employeeId)}
                  >
                    {todo.status}
                  </StatusBadge>
                </div>
              ))}
            </div>
          </DataPanel>

          <DataPanel>
            <div className="panel-head">
              <h2><i className="fas fa-id-card"></i> Incoming Applications</h2>
            </div>
            <div className="panel-body">
              {applications?.data?.map((app, index) => (
                <div key={app.id} className="app-row">
                  <div className="app-main">
                    <div className="avatar">{app.fname.charAt(0)}</div>
                    <div className="app-info">
                      <span className="app-name">{app.fname}</span>
                      <span className="app-meta">Submission ID: {app.id}</span>
                    </div>
                  </div>
                  <button className="view-link"><i className="fas fa-chevron-right"></i></button>
                </div>
              ))}
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
  background: white;
  .spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #4f46e5;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  p { margin-top: 15px; color: #64748b; font-family: sans-serif; }
  @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
`;

const ErrorScreen = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: #b91c1c;
  font-family: sans-serif;
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
    h1 { font-size: 2rem; color: #0f172a; margin: 0; font-weight: 800; }
    p { color: #64748b; margin: 5px 0 0 0; }
    .date-display { background: white; padding: 10px 20px; border-radius: 12px; color: #4f46e5; font-weight: 600; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
  }

  .section-title { font-size: 1.1rem; color: #475569; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 20px; }

  .service-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
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
    width: 60px;
    height: 60px;
    background: ${props => props.color}15;
    color: ${props => props.color};
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 15px;
    font-size: 1.5rem;
  }

  h3 { margin: 0; font-size: 1.1rem; color: #1e293b; font-weight: 700; }
  span { font-size: 0.85rem; color: #94a3b8; margin-top: 5px; display: block; }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    background: ${props => props.color};
    .icon-box { background: white; }
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
    h2 { font-size: 1.25rem; margin: 0; color: #0f172a; display: flex; align-items: center; gap: 10px; }
    .add-btn { background: #f1f5f9; border: none; width: 36px; height: 36px; border-radius: 10px; color: #4f46e5; cursor: pointer; &:hover { background: #4f46e5; color: white; } }
  }

  .panel-body {
    overflow-y: auto;
    flex: 1;
    padding-right: 5px;
  }

  .task-row, .app-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 18px;
    background: #f8fafc;
    border-radius: 16px;
    margin-bottom: 12px;
    transition: all 0.2s;
    &:hover { background: white; box-shadow: 0 4px 12px rgba(0,0,0,0.05); transform: scale(1.01); }
  }

  .task-main { display: flex; align-items: center; gap: 15px; }
  .task-index { background: #e2e8f0; color: #475569; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; border-radius: 8px; font-size: 0.8rem; font-weight: bold; }
  .task-title { font-weight: 500; color: #1e293b; }

  .app-main { display: flex; align-items: center; gap: 15px; }
  .avatar { width: 40px; height: 40px; background: #4f46e5; color: white; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-weight: bold; }
  .app-info { display: flex; flex-direction: column; }
  .app-name { font-weight: 600; color: #1e293b; }
  .app-meta { font-size: 0.75rem; color: #94a3b8; }
  .view-link { background: none; border: none; color: #94a3b8; cursor: pointer; &:hover { color: #4f46e5; } }
`;

const StatusBadge = styled.span`
  padding: 6px 16px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  cursor: pointer;
  user-select: none;
  &.pending { background: #fef2f2; color: #dc2626; border: 1px solid #fee2e2; }
  &.completed { background: #ecfdf5; color: #059669; border: 1px solid #d1fae5; }
`;