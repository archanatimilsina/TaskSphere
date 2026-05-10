import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import styled from 'styled-components';

function PmTaskForm() {
  const navigate = useNavigate();
  const { data: workspaces, loading: loadingWorkspace } = useFetch("http://localhost:8000/api/workspaceIndex");
  const { data: projects, loading: loadingProject } = useFetch("http://localhost:8000/api/projectIndex");
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
    // Logic for task submission would go here
    alert("Task has been successfully logged in the system.");
    navigate("/tasks");
  };

  if (loadingWorkspace || loadingProject || loadingUsers) {
    return <StatusBox>Synchronizing project resources...</StatusBox>;
  }

  return (
    <TaskFormContainer>
      <div className="form-card">
        <div className="form-header">
          <div className="icon-wrap">
            <i className="fas fa-tasks"></i>
          </div>
          <div>
            <h2>Task Allocation</h2>
            <p>Define deliverables, assign personnel, and set operational priorities.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group full-width">
              <label>Task Nomenclature</label>
              <input
                type="text"
                name="name"
                placeholder="e.g., API Endpoint Security Audit"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Criticality Level</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                required
              >
                <option value="" disabled>-- Set Priority --</option>
                {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map(num => (
                  <option key={num} value={num}>Level {num} {num > 7 ? '(High)' : num < 4 ? '(Low)' : '(Medium)'}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Operational Status</label>
              <select name="status" value={formData.status} onChange={handleChange}>
                <option value="not started">Not Started</option>
                <option value="in progress">In Progress</option>
                <option value="review">Under Review</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="form-group">
              <label><i className="far fa-calendar-alt"></i> Commencement Date</label>
              <input type="date" name="sdate" value={formData.sdate} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label><i className="fas fa-calendar-check"></i> Deadline</label>
              <input type="date" name="edate" value={formData.edate} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Associated Project</label>
              <select name="projectId" value={formData.projectId} onChange={handleChange} required>
                <option value="" disabled>-- Select Project --</option>
                {projects?.data?.map((project) => (
                  <option value={project.id} key={project.id}>{project.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Target Workspace</label>
              <select name="workspaceId" value={formData.workspaceId} onChange={handleChange} required>
                <option value="" disabled>-- Select Workspace --</option>
                {workspaces?.data?.map((workspace) => (
                  <option value={workspace.id} key={workspace.id}>{workspace.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group full-width">
              <label>Assigned Personnel <small>(Hold Cmd/Ctrl for multiple)</small></label>
              <select
                name="employee"
                className="multi-select"
                value={formData.employee}
                onChange={handleChange}
                multiple
                required
              >
                {employees?.data?.map((emp) => (
                  <option value={emp.fname} key={emp.id}>{emp.fname} {emp.lname}</option>
                ))}
              </select>
            </div>

            <div className="form-group full-width">
              <label>Technical Brief / Description</label>
              <textarea
                name="description"
                placeholder="Outline the specific requirements and expected outcomes..."
                value={formData.description}
                onChange={handleChange}
                rows="4"
              />
            </div>
          </div>

          <div className="actions">
            <button type="submit" className="submit-btn">Initialize Task</button>
            <button type="button" className="cancel-btn" onClick={() => navigate(-1)}>Discard</button>
          </div>
        </form>
      </div>
    </TaskFormContainer>
  );
}

export default PmTaskForm;

const StatusBox = styled.div`
  text-align: center;
  padding: 100px;
  font-family: 'Baloo 2', cursive;
  color: #64748b;
`;

const TaskFormContainer = styled.div`
  max-width: 850px;
  margin: 40px auto;
  font-family: 'Baloo 2', cursive;

  .form-card {
    background: white;
    border-radius: 24px;
    padding: 40px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.04);
    border: 1px solid #f1f5f9;
  }

  .form-header {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 40px;
    .icon-wrap {
      width: 55px;
      height: 55px;
      background: #eff6ff;
      color: #3b82f6;
      border-radius: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.4rem;
    }
    h2 { margin: 0; font-size: 1.8rem; color: #0f172a; }
    p { margin: 5px 0 0; color: #64748b; }
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
      color: #334155;
      margin-bottom: 8px;
      font-size: 0.95rem;
      small { color: #94a3b8; font-weight: 400; margin-left: 5px; }
      i { color: #3b82f6; margin-right: 5px; }
    }
    input, select, textarea {
      padding: 12px 16px;
      border: 2px solid #f1f5f9;
      background: #f8fafc;
      border-radius: 12px;
      font-family: inherit;
      font-size: 1rem;
      transition: 0.3s;
      &:focus {
        outline: none;
        border-color: #3b82f6;
        background: white;
        box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
      }
    }
    .multi-select { height: 120px; padding: 10px; }
  }

  .actions {
    margin-top: 40px;
    display: flex;
    gap: 15px;
    button {
      flex: 1;
      padding: 16px;
      border-radius: 12px;
      font-weight: 800;
      font-size: 1.1rem;
      cursor: pointer;
      border: none;
      font-family: inherit;
      transition: 0.2s;
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

  @media (max-width: 600px) {
    .form-grid { grid-template-columns: 1fr; }
    .full-width { grid-column: auto; }
  }
`;