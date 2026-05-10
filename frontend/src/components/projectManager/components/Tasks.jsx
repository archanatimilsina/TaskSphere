import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useDelete from "../../../hooks/useDelete";
import useFetch from "../../../hooks/useFetch";
import styled from 'styled-components';

function PmTasks() {
  const navigate = useNavigate();
  const { DeleteData, loading: isDeleting } = useDelete();
  const { data, loading, error } = useFetch("http://localhost:8000/api/taskIndex");
  const { data: employees } = useFetch("http://localhost:8000/api/allUsers");

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    employee: [],
    sdate: "",
    edate: "",
    status: "Not started",
    priority: "",
  });

  const handleInputChange = (e) => {
    const { name, value, selectedOptions, type } = e.target;
    if (type === "select-multiple") {
      const selectedValues = Array.from(selectedOptions, (opt) => opt.value);
      setFormData((prev) => ({ ...prev, [name]: selectedValues }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleTriggerUpdate = (task) => {
    setFormData({
      name: task.name,
      description: task.description,
      employee: task.employee || [],
      sdate: task.sdate,
      edate: task.edate,
      status: task.status,
      priority: task.priority,
    });
    setSelectedTaskId(task.id);
    setShowUpdateModal(true);
  };

  const confirmDeleteTrigger = (id) => {
    setSelectedTaskId(id);
    setShowDeleteModal(true);
  };

  const executeDelete = async () => {
    const result = await DeleteData(`http://localhost:8000/api/taskDelete/${selectedTaskId}`);
    if (result?.status === true) {
      alert("Task successfully purged from system.");
      window.location.reload(); // Refresh to reflect changes
    }
    setShowDeleteModal(false);
  };

  if (loading) return <StatusBox>Synchronizing task registry...</StatusBox>;
  if (error) return <StatusBox className="error">Error loading tasks: {error}</StatusBox>;

  return (
    <TasksContainer>
      <header className="task-header">
        <div className="title-section">
          <h1>Master Task List</h1>
          <p>Global view of all project deliverables and status tracking.</p>
        </div>
        <div className="action-section">
          <button className="assign-btn" onClick={() => navigate("/TaskCreateForm")}>
            <i className="fas fa-plus-circle"></i> Assign Task
          </button>
          <div className="filter-icon" title="Filter Results">
            <i className="fas fa-filter"></i>
          </div>
        </div>
      </header>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Task Details</th>
              <th>Timeline</th>
              <th>Status</th>
              <th>Priority</th>
              <th className="text-right">Management</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.length > 0 ? data.data.map((task, index) => (
              <tr key={task.id}>
                <td className="index-col">{(index + 1).toString().padStart(2, '0')}</td>
                <td>
                  <div className="task-info">
                    <span className="task-name">{task.name}</span>
                    <span className="task-desc">{task.description}</span>
                  </div>
                </td>
                <td>
                  <div className="timeline-info">
                    <span>{task.sdate}</span>
                    <i className="fas fa-long-arrow-alt-right"></i>
                    <span>{task.edate}</span>
                  </div>
                </td>
                <td>
                  <span className={`status-tag ${task.status.toLowerCase().replace(/\s+/g, '')}`}>
                    {task.status}
                  </span>
                </td>
                <td>
                  <span className={`priority-flag p-${task.priority}`}>
                    Level {task.priority}
                  </span>
                </td>
                <td className="text-right">
                  <div className="btn-group">
                    <button className="icon-btn edit" onClick={() => handleTriggerUpdate(task)} title="Edit Task">
                      <i className="fas fa-edit"></i>
                    </button>
                    <button className="icon-btn delete" onClick={() => confirmDeleteTrigger(task.id)} title="Delete Task">
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr><td colSpan="6" className="empty-row">No operational tasks found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Update Modal */}
      {showUpdateModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-header">
              <h3>Refine Task Parameters</h3>
              <button className="close-btn" onClick={() => setShowUpdateModal(false)}>&times;</button>
            </div>
            <form className="modal-form" onSubmit={(e) => { e.preventDefault(); setShowUpdateModal(false); }}>
              <div className="form-row">
                <div className="form-input-group">
                  <label>Task Title</label>
                  <input name="name" value={formData.name} onChange={handleInputChange} required />
                </div>
                <div className="form-input-group">
                  <label>Priority Rank</label>
                  <input name="priority" value={formData.priority} onChange={handleInputChange} required />
                </div>
              </div>

              <div className="form-input-group">
                <label>Deliverable Description</label>
                <textarea name="description" value={formData.description} onChange={handleInputChange} rows="3" required />
              </div>

              <div className="form-row">
                <div className="form-input-group">
                  <label>Start Date</label>
                  <input type="date" name="sdate" value={formData.sdate} onChange={handleInputChange} />
                </div>
                <div className="form-input-group">
                  <label>End Date</label>
                  <input type="date" name="edate" value={formData.edate} onChange={handleInputChange} />
                </div>
              </div>

              <div className="modal-footer">
                <button type="submit" className="save-btn">Commit Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-card delete-prompt">
            <div className="icon-alert"><i className="fas fa-exclamation-triangle"></i></div>
            <h3>Verify Deletion</h3>
            <p>Are you sure you want to permanently remove this task from the project lifecycle? This action cannot be undone.</p>
            <div className="modal-footer gap-15">
              <button className="confirm-delete" onClick={executeDelete} disabled={isDeleting}>
                {isDeleting ? "Purging..." : "Confirm Deletion"}
              </button>
              <button className="cancel-btn" onClick={() => setShowDeleteModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </TasksContainer>
  );
}

export default PmTasks;

const StatusBox = styled.div`
  text-align: center;
  padding: 100px;
  font-family: 'Baloo 2', cursive;
  color: #64748b;
  &.error { color: #ef4444; }
`;

const TasksContainer = styled.div`
  padding: 30px;
  font-family: 'Baloo 2', cursive;

  .task-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    h1 { font-size: 2.2rem; color: #0f172a; margin: 0; }
    p { color: #64748b; margin: 5px 0 0; }

    .action-section {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .assign-btn {
      background: #1e293b;
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 12px;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 10px;
      transition: 0.2s;
      &:hover { background: #334155; transform: translateY(-2px); }
    }

    .filter-icon {
      font-size: 1.4rem;
      color: #94a3b8;
      cursor: pointer;
      &:hover { color: #3b82f6; }
    }
  }

  .table-wrapper {
    background: white;
    border-radius: 20px;
    padding: 10px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.03);
    border: 1px solid #f1f5f9;
    overflow-x: auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    th { text-align: left; padding: 18px; color: #64748b; font-size: 0.85rem; text-transform: uppercase; border-bottom: 2px solid #f8fafc; }
    td { padding: 18px; border-bottom: 1px solid #f8fafc; vertical-align: middle; }
  }

  .task-info {
    display: flex;
    flex-direction: column;
    .task-name { font-weight: 800; color: #1e293b; font-size: 1.05rem; }
    .task-desc { font-size: 0.85rem; color: #94a3b8; max-width: 300px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  }

  .timeline-info {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #64748b;
    font-size: 0.9rem;
    i { color: #cbd5e1; }
  }

  .status-tag {
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 800;
    text-transform: uppercase;
    background: #f1f5f9;
    &.notstarted { background: #fee2e2; color: #ef4444; }
    &.inprogress { background: #fef9c3; color: #a16207; }
    &.completed { background: #dcfce7; color: #15803d; }
  }

  .priority-flag {
    font-weight: 700;
    font-size: 0.9rem;
    &.p-10, &.p-9 { color: #b91c1c; }
    &.p-1, &.p-2 { color: #059669; }
  }

  .btn-group {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
  }

  .icon-btn {
    width: 38px;
    height: 38px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    transition: 0.2s;
    background: #f8fafc;
    &.edit { color: #3b82f6; &:hover { background: #dbeafe; } }
    &.delete { color: #ef4444; &:hover { background: #fee2e2; } }
  }

  /* Modals */
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(15, 23, 42, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    backdrop-filter: blur(4px);
  }

  .modal-card {
    background: white;
    width: 90%;
    max-width: 600px;
    border-radius: 24px;
    padding: 35px;
    box-shadow: 0 20px 50px rgba(0,0,0,0.2);

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 25px;
      h3 { margin: 0; font-size: 1.5rem; }
      .close-btn { background: none; border: none; font-size: 2rem; cursor: pointer; color: #94a3b8; }
    }
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 20px;
  }

  .form-input-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
    label { font-weight: 700; margin-bottom: 8px; color: #475569; }
    input, textarea {
      padding: 12px;
      border: 2px solid #f1f5f9;
      border-radius: 12px;
      background: #f8fafc;
      font-family: inherit;
      &:focus { outline: none; border-color: #3b82f6; }
    }
  }

  .modal-footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 30px;
    &.gap-15 { gap: 15px; }
  }

  .save-btn, .confirm-delete {
    padding: 12px 30px;
    border-radius: 12px;
    border: none;
    font-weight: 800;
    cursor: pointer;
    font-family: inherit;
  }

  .save-btn { background: #3b82f6; color: white; &:hover { background: #2563eb; } }
  .confirm-delete { background: #ef4444; color: white; &:hover { background: #dc2626; } }
  .cancel-btn { background: #f1f5f9; color: #64748b; padding: 12px 30px; border-radius: 12px; border: none; font-weight: 700; cursor: pointer; }

  .delete-prompt {
    text-align: center;
    .icon-alert { font-size: 3rem; color: #f59e0b; margin-bottom: 20px; }
    p { color: #64748b; line-height: 1.6; }
    .modal-footer { justify-content: center; }
  }
`;