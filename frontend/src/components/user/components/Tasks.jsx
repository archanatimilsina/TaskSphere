import React, { useState } from "react";
import styled from 'styled-components';
import useFetch from "../../../hooks/useFetch";

function UserTasks() {
  const { data, loading, error } = useFetch("http://localhost:8000/api/taskIndex");
  const { data: employees, loading: loading1, error: error1 } = useFetch("http://localhost:8000/api/allUsers");
  
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    employee: [],
    sdate: "",
    edate: "",
    status: "Not started",
    priority: "",
    workspaceId: ""
  });

  const handleInputChange = (e) => {
    const { name, value, selectedOptions } = e.target;

    if (name === "employee") {
      const selectedValues = Array.from(selectedOptions, (opt) => opt.value);
      setFormData((prev) => ({ ...prev, employee: selectedValues }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const openUpdateModal = (task) => {
    let empIds = [];
    try {
      empIds = Array.isArray(task.employee) ? task.employee : JSON.parse(task.employee || "[]");
    } catch (e) {
      empIds = [];
    }

    setFormData({
      id: task.id,
      name: task.name || "",
      description: task.description || "",
      employee: empIds.map(String),
      sdate: task.sdate || "",
      edate: task.edate || "",
      status: task.status || "Not started",
      priority: task.priority || "",
      workspaceId: task.workspace_id || ""
    });
    setShowUpdateModal(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    // Integration point for your update API call
    console.log("Saving task changes:", formData);
    setShowUpdateModal(false);
  };

  if (loading || loading1) return <StatusWrapper>Synchronizing task queue...</StatusWrapper>;
  if (error || error1) return <StatusWrapper className="error">Data error: Unable to load workspace tasks.</StatusWrapper>;

  return (
    <TasksContainer>
      <header className="tasks-header">
        <div className="header-text">
          <h1>Workspace Tasks</h1>
          <p>Track progress and manage operational assignments.</p>
        </div>
        <div className="header-actions">
           <i className="fa-solid fa-arrow-down-wide-short" title="Filter & Sort"></i>
        </div>
      </header>

      <div className="table-viewport">
        <table className="task-table">
          <thead>
            <tr>
              <th style={{ width: '50px' }}>#</th>
              <th>Task Identity</th>
              <th>Details</th>
              <th>Assignees</th>
              <th>Timeline</th>
              <th>Status</th>
              <th>Priority</th>
              <th style={{ textAlign: 'right' }}>Management</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.length > 0 ? (
              data.data.map((task, index) => (
                <tr key={task.id || index}>
                  <td className="index-col">{(index + 1).toString().padStart(2, '0')}</td>
                  <td className="name-col">
                    <strong>{task.name}</strong>
                    <span className="updated-at">Ref: T-{task.id}</span>
                  </td>
                  <td className="desc-col">{task.description}</td>
                  <td className="member-col">
                    <div className="avatar-stack">
                      {(() => {
                        let empIds = [];
                        try {
                          empIds = Array.isArray(task.employee) ? task.employee : JSON.parse(task.employee || "[]");
                        } catch (e) { empIds = []; }
                        
                        return empIds.map((empId) => {
                          const emp = employees?.data?.find((e) => e.id === parseInt(empId));
                          return emp ? (
                            <span key={empId} className="user-badge" title={`${emp.fname} ${emp.lname}`}>
                              {emp.fname.charAt(0)}{emp.lname.charAt(0)}
                            </span>
                          ) : null;
                        });
                      })()}
                    </div>
                  </td>
                  <td className="date-col">
                    <div className="date-range">
                      <span>{task.sdate}</span>
                      <i className="fa-solid fa-arrow-right-long"></i>
                      <span>{task.edate}</span>
                    </div>
                  </td>
                  <td className="status-col">
                    <span className={`status-label ${task.status?.toLowerCase().replace(/\s+/g, '-')}`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="priority-col">
                    <span className={`priority-flag ${task.priority?.toLowerCase()}`}>
                      {task.priority}
                    </span>
                  </td>
                  <td className="action-col">
                    <div className="btn-group">
                      <button className="edit-icon" onClick={() => openUpdateModal(task)}>
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                      <button className="del-icon">
                        <i className="fa-solid fa-trash-can"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="empty-row">No active tasks found in this workspace.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showUpdateModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <header className="modal-header">
              <h3>Refine Task Parameters</h3>
              <button className="close-x" onClick={() => setShowUpdateModal(false)}>&times;</button>
            </header>
            <form onSubmit={handleUpdate} className="task-form">
              <div className="field">
                <label>Task Label</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
              </div>

              <div className="field">
                <label>Operational Description</label>
                <textarea name="description" value={formData.description} onChange={handleInputChange} required />
              </div>

              <div className="field">
                <label>Resource Allocation (Select Multiple)</label>
                <select name="employee" value={formData.employee} onChange={handleInputChange} multiple required>
                  {employees?.data?.map((emp) => (
                    <option value={emp.id} key={emp.id}>
                      {emp.fname} {emp.lname}
                    </option>
                  ))}
                </select>
              </div>

              <div className="split-fields">
                <div className="field">
                  <label>Commencement</label>
                  <input type="date" name="sdate" value={formData.sdate} onChange={handleInputChange} required />
                </div>
                <div className="field">
                  <label>Deadline</label>
                  <input type="date" name="edate" value={formData.edate} onChange={handleInputChange} required />
                </div>
              </div>

              <div className="split-fields">
                <div className="field">
                    <label>Priority Tier</label>
                    <select name="priority" value={formData.priority} onChange={handleInputChange} required>
                        <option value="">Select Level</option>
                        <option value="High">High Priority</option>
                        <option value="Medium">Medium Priority</option>
                        <option value="Low">Low Priority</option>
                    </select>
                </div>
                <div className="field">
                    <label>Current Status</label>
                    <select name="status" value={formData.status} onChange={handleInputChange} required>
                        <option value="Not started">Not started</option>
                        <option value="Ongoing">Ongoing</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
              </div>

              <button className="submit-btn" type="submit">Deploy Changes</button>
            </form>
          </div>
        </div>
      )}
    </TasksContainer>
  );
}




const StatusWrapper = styled.div`
  text-align: center;
  padding: 100px;
  font-family: 'Baloo 2', cursive;
  color: #64748b;
  &.error { color: #ef4444; }
`;

const TasksContainer = styled.div`
  padding: 30px;
  font-family: 'Baloo 2', cursive;

  .tasks-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 40px;
    h1 { font-size: 2.5rem; color: #1e293b; margin: 0; }
    p { color: #94a3b8; margin: 5px 0 0; font-size: 1.1rem; }
    .header-actions i { font-size: 1.5rem; color: #cbd5e1; cursor: pointer; transition: 0.2s; &:hover { color: #10b981; } }
  }

  .table-viewport {
    background: white;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0,0,0,0.02);
    border: 1px solid #f1f5f9;
  }

  .task-table {
    width: 100%;
    border-collapse: collapse;
    
    th {
      background: #f8fafc;
      padding: 18px 20px;
      text-align: left;
      font-size: 0.85rem;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #94a3b8;
      border-bottom: 1px solid #f1f5f9;
    }

    td {
      padding: 20px;
      border-bottom: 1px solid #f8fafc;
      vertical-align: middle;
      color: #334155;
    }

    .index-col { font-weight: 800; color: #cbd5e1; }
    .name-col { 
        strong { display: block; font-size: 1.1rem; color: #1e293b; }
        .updated-at { font-size: 0.75rem; color: #94a3b8; font-weight: 700; }
    }
    .desc-col { max-width: 200px; font-size: 0.9rem; color: #64748b; }

    .avatar-stack {
        display: flex;
        .user-badge {
            width: 32px;
            height: 32px;
            background: #10b981;
            color: white;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.7rem;
            font-weight: 800;
            border: 2px solid white;
            margin-right: -10px;
            cursor: default;
        }
    }

    .date-range {
        font-size: 0.85rem;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 8px;
        i { color: #cbd5e1; font-size: 0.7rem; }
    }

    .status-label {
        padding: 4px 12px;
        border-radius: 8px;
        font-size: 0.8rem;
        font-weight: 800;
        text-transform: uppercase;
        &.not-started { background: #f1f5f9; color: #64748b; }
        &.ongoing { background: #eff6ff; color: #3b82f6; }
        &.completed { background: #f0fdf4; color: #10b981; }
    }

    .priority-flag {
        font-weight: 800;
        font-size: 0.85rem;
        &.high { color: #ef4444; &:before { content: '● '; } }
        &.medium { color: #f59e0b; &:before { content: '● '; } }
        &.low { color: #10b981; &:before { content: '● '; } }
    }

    .action-col .btn-group {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
        button {
            background: none; border: none; cursor: pointer; padding: 8px; border-radius: 8px; transition: 0.2s;
            &.edit-icon { color: #3b82f6; &:hover { background: #eff6ff; } }
            &.del-icon { color: #ef4444; &:hover { background: #fef2f2; } }
        }
    }

    .empty-row { text-align: center; padding: 60px; color: #cbd5e1; }
  }

  /* Modal Mechanics */
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(15, 23, 42, 0.6);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .modal-box {
    background: white;
    width: 100%;
    max-width: 550px;
    border-radius: 28px;
    padding: 40px;
    max-height: 90vh;
    overflow-y: auto;
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    h3 { font-size: 1.5rem; color: #1e293b; margin: 0; }
    .close-x { background: none; border: none; font-size: 2rem; color: #94a3b8; cursor: pointer; &:hover { color: #ef4444; } }
  }

  .task-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    
    .field {
        label { display: block; font-size: 0.85rem; font-weight: 800; color: #94a3b8; margin-bottom: 8px; text-transform: uppercase; }
        input, textarea, select {
            width: 100%; padding: 12px; border: 2px solid #f1f5f9; border-radius: 12px; font-family: inherit; font-size: 1rem;
            &:focus { outline: none; border-color: #10b981; }
        }
        textarea { height: 100px; resize: none; }
        select[multiple] { height: 120px; }
    }

    .split-fields { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    
    .submit-btn {
        background: #10b981;
        color: white;
        padding: 16px;
        border: none;
        border-radius: 16px;
        font-weight: 800;
        font-size: 1.1rem;
        cursor: pointer;
        margin-top: 10px;
        transition: 0.3s;
        &:hover { background: #059669; transform: translateY(-2px); box-shadow: 0 10px 20px rgba(16, 185, 129, 0.2); }
    }
  }
`;

export default UserTasks;