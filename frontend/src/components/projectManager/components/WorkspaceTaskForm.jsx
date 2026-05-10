import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import styled from 'styled-components';

function PmWorkspaceTaskForm() { 
  const location = useLocation();
  const navigate = useNavigate();
  const workspaceId = location.state?.id;

  const { data: workspace, loading: loadingWorkspace } = useFetch(`http://localhost:8000/api/OneWorkspace/${workspaceId}`);
  const { data: employees, loading: loadingUsers } = useFetch("http://localhost:8000/api/allUsers");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    sdate: "",
    edate: "",
    employee: [],
    priority: "",
    status: "not started",
    workspaceId: "",
    projectId: "",
  });

  // Sync internal form state with fetched workspace data
  useEffect(() => {
    if (workspace?.data) {
      setFormData(prev => ({
        ...prev,
        workspaceId: workspace.data.id,
        projectId: workspace.data.projectId
      }));
    }
  }, [workspace]);

  const handleChange = (e) => {
    const { name, value, selectedOptions, type } = e.target;

    if (type === "select-multiple") {
      const selectedValues = Array.from(selectedOptions, (opt) => opt.value);
      setFormData((prev) => ({ ...prev, [name]: selectedValues }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // API logic would be implemented here
    alert(`Task "${formData.name}" initialized for Workspace ${workspaceId}`);
    navigate("/workspaces");
  };

  if (loadingWorkspace || loadingUsers) {
    return <StatusBox>Configuring workspace environment...</StatusBox>;
  }

  return (
    <WorkspaceTaskFormContainer>
      <div className="form-card">
        <header className="form-header">
          <div className="icon-badge">
            <i className="fas fa-clipboard-check"></i>
          </div>
          <div className="header-text">
            <h2>Workspace Task Creation</h2>
            <p>Deploying task to: <strong>{workspace?.data?.name || `ID ${workspaceId}`}</strong></p>
          </div>
        </header>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group full-width">
              <label>Objective Title</label>
              <input
                type="text"
                name="name"
                placeholder="e.g., Environment Variable Configuration"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Priority Matrix</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                required
              >
                <option value="" disabled>-- Select Priority --</option>
                {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map(num => (
                  <option key={num} value={num}>Priority Level {num}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Initial Status</label>
              <select name="status" value={formData.status} onChange={handleChange}>
                <option value="not started">Not Started</option>
                <option value="in progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="form-group">
              <label><i className="far fa-calendar-plus"></i> Start Date</label>
              <input type="date" name="sdate" value={formData.sdate} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label><i className="fas fa-calendar-day"></i> Target Deadline</label>
              <input type="date" name="edate" value={formData.edate} onChange={handleChange} required />
            </div>

            <div className="form-group full-width">
              <label>Personnel Assignment <small>(Select multiple with Ctrl/Cmd)</small></label>
              <select
                name="employee"
                className="multi-select"
                value={formData.employee}
                onChange={handleChange}
                multiple
                required
              >
                {employees?.data?.map((emp) => (
                  <option value={emp.fname} key={emp.id}>
                    {emp.fname} {emp.lname}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group full-width">
              <label>Detailed Briefing</label>
              <textarea
                name="description"
                placeholder="Describe specific task requirements and success criteria..."
                value={formData.description}
                onChange={handleChange}
                rows="4"
              />
            </div>
          </div>

          <footer className="form-actions">
            <button type="submit" className="submit-btn">Initialize Task</button>
            <button type="button" className="cancel-btn" onClick={() => navigate(-1)}>Abort</button>
          </footer>
        </form>
      </div>
    </WorkspaceTaskFormContainer>
  );
}

export default PmWorkspaceTaskForm;

const StatusBox = styled.div`
  text-align: center;
  padding: 100px;
  font-family: 'Baloo 2', cursive;
  color: #64748b;
`;

const WorkspaceTaskFormContainer = styled.div`
  max-width: 800px;
  margin: 50px auto;
  font-family: 'Baloo 2', cursive;

  .form-card {
    background: white;
    border-radius: 28px;
    padding: 45px;
    box-shadow: 0 15px 35px rgba(0,0,0,0.05);
    border: 1px solid #f1f5f9;
  }

  .form-header {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 40px;
    
    .icon-badge {
      width: 60px;
      height: 60px;
      background: #f0f7ff;
      color: #3b82f6;
      border-radius: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
    }

    h2 { margin: 0; font-size: 1.8rem; color: #0f172a; }
    p { margin: 5px 0 0; color: #64748b; font-size: 1rem; }
  }

  .form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 25px;
  }

  .full-width { grid-column: span 2; }

  .form-group {
    display: flex;
    flex-direction: column;
    
    label {
      font-weight: 700;
      color: #475569;
      margin-bottom: 8px;
      font-size: 0.95rem;
      i { color: #3b82f6; margin-right: 5px; }
      small { font-weight: 400; color: #94a3b8; }
    }

    input, select, textarea {
      padding: 14px;
      border: 2px solid #f1f5f9;
      background: #f8fafc;
      border-radius: 14px;
      font-family: inherit;
      font-size: 1rem;
      transition: all 0.2s ease;
      
      &:focus {
        outline: none;
        border-color: #3b82f6;
        background: white;
        box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.05);
      }
    }

    .multi-select {
      height: 140px;
      padding: 10px;
    }
  }

  .form-actions {
    margin-top: 40px;
    display: flex;
    gap: 20px;

    button {
      flex: 1;
      padding: 16px;
      border-radius: 14px;
      font-weight: 800;
      font-size: 1.1rem;
      cursor: pointer;
      border: none;
      font-family: inherit;
      transition: all 0.2s;
    }

    .submit-btn {
      background: #3b82f6;
      color: white;
      &:hover { background: #2563eb; transform: translateY(-2px); }
    }

    .cancel-btn {
      background: #f1f5f9;
      color: #64748b;
      &:hover { background: #e2e8f0; color: #1e293b; }
    }
  }

  @media (max-width: 650px) {
    .form-grid { grid-template-columns: 1fr; }
    .full-width { grid-column: auto; }
    .form-card { padding: 30px; }
  }
`;