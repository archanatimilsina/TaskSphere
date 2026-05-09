import React, { useState } from "react";
import "../assets/css/taskForm.css"; 
import useFetch from "../../hooks/UseFetch";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

function TaskForm() {
  const navigate=useNavigate();
  const {data:workspaces,loading:loadingWorkspace,error:errorWorkspace}=useFetch("http://localhost:8000/api/workspaceIndex");
  const {data:projects,loading:loadingProject,error:errorProject}=useFetch("http://localhost:8000/api/projectIndex");
  const { data: employees, loading: loading1, error: error1 } = useFetch("http://localhost:8000/api/allUsers");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    sdate: "",
    edate: "",
    employee: [],
    priority: "",
    status: "Not started",
    workspaceId: "none",
    projectId: "",
  });

  const handleChange = (e) => {
    const { name, value, selectedOptions } = e.target;

    if (name === "employee") {
      const selectedValues = Array.from(selectedOptions, (opt) => opt.value);
      setFormData((prev) => ({ ...prev, employee: selectedValues }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Data is taken");
navigate("/tasks");
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h2 className="form-title">Add New Task</h2>

      <div className="form-grid">
        <div className="form-group">
          <label>Task Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Priority</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option disabled value="">-- Select priority number --</option>
            <option value="10">10</option>
            <option value="9">9</option>
            <option value="8">8</option>
            <option value="7">7</option>
            <option value="6">6</option>
            <option value="5">5</option>
            <option value="4">4</option>
            <option value="3">3</option>
            <option value="2">2</option>
            <option value="1">1</option>
          
          </select>
        </div>

        <div className="form-group">
          <label>Start Date</label>
          <input
            type="date"
            name="sdate"
            value={formData.sdate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>End Date</label>
          <input
            type="date"
            name="edate"
            value={formData.edate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="Workspace">Employee</label>
          <select
             name="workspaceId" id="Workspace" 
            value={formData.workspaceId}
            onChange={handleChange}
            required
          >
            <option disabled value="">-- Select Workspace --</option>
            {workspaces?.data?.length > 0 &&
              workspaces.data.map((workspace, index) => (
                <option value={workspace.id} key={index}>
                  {workspace.name}
                </option>
              ))}
          </select>
        </div>

        <div className="form-group">
        <label htmlFor="ProjectId">Employee</label>
          <select
             name="projectId" id="ProjectId" 
             value={formData.projectId}
            onChange={handleChange}
            required
          >
            <option disabled value="">-- Select Project --</option>
            {projects?.data?.length > 0 &&
              projects.data.map((project, index) => (
                <option value={project.id} key={index}>
                  {project.name}
                </option>
              ))}
          </select>
        </div>

        <div className="form-group full-width">
        <label htmlFor="employee">Employee</label>
          <select
            name="employee" id="employee" 
            className="form-input"
            value={formData.employee}
            onChange={handleChange}
            multiple
            required
          >
            {employees?.data?.length > 0 &&
              employees.data.map((employee, index) => (
                <option value={employee.fname} key={index}>
                  {employee.fname+" "+employee.lname}
                </option>
              ))}
          </select>
        </div>

        <div className="form-group full-width">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
          />
        </div>

        <div className="form-group full-width">
          <label>Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="not started">Not Started</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <button type="submit" className="submit-btn">
        Submit Task
      </button>
    </form>
  );
}

export default TaskForm;
const TaskFormContainer = styled.div`
  
/* TaskForm.css */

.task-form {
    max-width: 700px;
    margin: 40px auto;
    padding: 30px;
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
  
  .form-title {
    text-align: center;
    font-size: 28px;
    margin-bottom: 20px;
    color: #333;
  }
  
  .form-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
  }
  
  .form-group label {
    margin-bottom: 6px;
    font-weight: 600;
    color: #555;
  }
  
  .form-group input,
  .form-group select,
  .form-group textarea {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 16px;
  }
  
  .full-width {
    grid-column: span 2;
  }
  
  .submit-btn {
    margin-top: 30px;
    width: 100%;
    padding: 12px;
    background-color: #3498db;
    border: none;
    border-radius: 8px;
    font-size: 18px;
    color: white;
    cursor: pointer;
    transition: background 0.3s;
  }
  
  .submit-btn:hover {
    background-color: #2980b9;
  }
  
`;