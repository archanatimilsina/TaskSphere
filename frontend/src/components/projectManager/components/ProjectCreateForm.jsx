import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import usePost from "../../../hooks/usePost";
import useFetch from "../../../hooks/useFetch";
import styled from 'styled-components';

export default function ProjectCreateForm() {
  const { postData, loading: isPosting } = usePost();
  const navigate = useNavigate();
  const { data: employees, loading: loadingUsers } = useFetch("http://localhost:8000/api/allUsers");
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    sdate: "",
    edate: "",
    employee: [], 
    leader: ""
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await postData("http://localhost:8000/api/projectCreate", formData);
  
    if (result?.status === true) {
      alert("Project has been successfully initialized.");
      navigate("/projects");
    }
  };

  if (loadingUsers) return <StatusBox>Loading staff directory...</StatusBox>;

  return (
    <ProjectCreateFormContainer>
      <div className="form-card">
        <div className="form-header">
          <div className="icon-circle">
            <i className="fas fa-briefcase"></i>
          </div>
          <div className="header-text">
            <h2>Create New Project</h2>
            <p>Define the scope, timeline, and core team for a new project lifecycle.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="form-content">
          <div className="form-group">
            <label className="form-label">Project Title</label>
            <input
              type="text"
              name="name"
              placeholder="e.g., Enterprise Cloud Migration"
              className="form-input"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Objective & Description</label>
            <textarea
              name="description"
              placeholder="Provide a high-level overview of the project goals..."
              className="form-input"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              required
            />
          </div>

          <div className="date-grid">
            <div className="form-group">
              <label className="form-label"><i className="far fa-calendar-plus"></i> Start Date</label>
              <input
                type="date"
                name="sdate"
                className="form-input"
                value={formData.sdate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label"><i className="far fa-calendar-check"></i> End Date</label>
              <input
                type="date"
                name="edate"
                className="form-input"
                value={formData.edate}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Project Leader (Primary Stakeholder)</label>
            <select
              name="leader"
              className="form-input"
              value={formData.leader}
              onChange={handleChange}
              required
            >
              <option value="">-- Assign a Lead --</option>
              {employees?.data?.map((employee) => (
                <option value={employee.id} key={employee.id}>
                  {employee.fname} {employee.lname}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">
              Team Members 
              <small> (Hold Ctrl/Cmd to select multiple members)</small>
            </label>
            <select
              name="employee"
              className="form-input multi-select"
              value={formData.employee}
              onChange={handleChange}
              multiple
              required
            >
              {employees?.data?.map((employee) => (
                <option value={employee.id} key={employee.id}>
                  {employee.fname} {employee.lname}
                </option>
              ))}
            </select>
          </div>

          <div className="form-button-wrapper">
            <button type="submit" className="form-button" disabled={isPosting}>
              {isPosting ? "Initializing Project..." : "Initialize Project"}
            </button>
            <button type="button" className="cancel-button" onClick={() => navigate(-1)}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </ProjectCreateFormContainer>
  );
}

const StatusBox = styled.div`
  text-align: center;
  padding: 100px;
  font-family: 'Baloo 2', cursive;
  color: #64748b;
`;

const ProjectCreateFormContainer = styled.div`
  max-width: 800px;
  margin: 20px auto;
  font-family: 'Baloo 2', cursive;

  .form-card {
    background: white;
    border-radius: 24px;
    padding: 40px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
    border: 1px solid #f1f5f9;
  }

  .form-header {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 40px;

    .icon-circle {
      width: 60px;
      height: 60px;
      background: #eff6ff;
      color: #3b82f6;
      border-radius: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
    }

    h2 { font-size: 1.8rem; margin: 0; color: #0f172a; }
    p { margin: 5px 0 0; color: #64748b; font-size: 1rem; }
  }

  .form-content {
    display: flex;
    flex-direction: column;
    gap: 25px;
  }

  .date-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    @media (max-width: 600px) { grid-template-columns: 1fr; }
  }

  .form-group {
    display: flex;
    flex-direction: column;

    .form-label {
      margin-bottom: 10px;
      font-weight: 700;
      color: #334155;
      font-size: 1rem;

      small { font-weight: 400; color: #94a3b8; font-size: 0.85rem; }
      i { color: #3b82f6; margin-right: 5px; }
    }

    .form-input {
      padding: 12px 18px;
      border: 2px solid #f1f5f9;
      background: #f8fafc;
      border-radius: 12px;
      font-family: inherit;
      font-size: 1rem;
      transition: all 0.3s;

      &:focus {
        outline: none;
        border-color: #3b82f6;
        background: white;
        box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
      }
    }

    textarea { resize: vertical; min-height: 100px; }

    .multi-select {
      height: 160px;
      padding: 10px;
      option { padding: 8px; border-radius: 8px; margin-bottom: 2px; }
    }
  }

  .form-button-wrapper {
    display: flex;
    gap: 15px;
    margin-top: 20px;

    button {
      flex: 1;
      padding: 16px;
      border-radius: 12px;
      font-weight: 800;
      font-size: 1.1rem;
      cursor: pointer;
      transition: 0.2s;
      border: none;
      font-family: inherit;
    }

    .form-button {
      background: #3b82f6;
      color: white;
      &:hover { background: #2563eb; transform: translateY(-2px); }
      &:disabled { background: #94a3b8; cursor: not-allowed; }
    }

    .cancel-button {
      background: #f1f5f9;
      color: #64748b;
      &:hover { background: #e2e8f0; color: #1e293b; }
    }
  }
`;