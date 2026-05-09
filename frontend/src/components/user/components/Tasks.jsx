import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import useFetch from "../../hooks/UseFetch";

function Tasks() {
  const { data, loading, error } = useFetch("/api/taskIndex");
  const { data: employees, loading: loading1, error: error1 } = useFetch("/api/allUsers");
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

  // const navigate = useNavigate();

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
      empIds = Array.isArray(task.employee) ? task.employee : JSON.parse(task.employee);
    } catch (e) {
      empIds = [];
    }

    setFormData({
      id: task.id,
      name: task.name || "",
      description: task.description || "",
      employee: empIds.map(String), // Ensure IDs are strings for select matching
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
    console.log("Updating task:", formData);
    // Add your API update logic here
    setShowUpdateModal(false);
  };

  if (loading || loading1) return <div>Loading tasks...</div>;
  if (error || error1) return <div>Error loading data.</div>;

  return (
    <TasksContainer>
      <div className="userWorkspacePublicHeaderBar">
        <h1 id="userWorkspacePublicTaskHeading">Tasks</h1>
        <i className="fa-solid fa-filter" id="userWorkspacePublicFilter" title="Filter"></i>
      </div>

      <div className="userWorkspacePublicTableContainer">
        <table>
          <thead>
            <tr className="rowrowrow">
              <th className="userWorkspacePublicTh">S.N</th>
              <th className="userWorkspacePublicTh">Name</th>
              <th className="userWorkspacePublicTh">Description</th>
              <th className="userWorkspacePublicTh">Assigned To</th>
              <th className="userWorkspacePublicTh">Start Date</th>
              <th className="userWorkspacePublicTh">End Date</th>
              <th className="userWorkspacePublicTh">Status</th>
              <th className="userWorkspacePublicTh">Priority</th>
              <th className="userWorkspacePublicTh">Updated At</th>
              <th className="userWorkspacePublicTh">Actions</th>
            </tr>
          </thead>
          <tbody id="userWorkspacePublicTaskTableBody">
            {data?.data?.length > 0 ? (
              data.data.map((task, index) => (
                <tr key={task.id || index} className="rowrowrow">
                  <td className="userWorkspacePublicTd">{index + 1}</td>
                  <td className="userWorkspacePublicTd">{task.name}</td>
                  <td className="userWorkspacePublicTd">{task.description}</td>
                  <td className="userWorkspacePublicTd">
                    {(() => {
                      let empIds = [];
                      try {
                        empIds = Array.isArray(task.employee) ? task.employee : JSON.parse(task.employee);
                      } catch (e) {
                        empIds = [];
                      }
                      return empIds.map((empId) => {
                        const emp = employees?.data?.find((e) => e.id === parseInt(empId));
                        return emp ? (
                          <span key={empId} className="employeeBadge">
                            {emp.fname} {emp.lname}
                          </span>
                        ) : null;
                      });
                    })()}
                  </td>
                  <td className="userWorkspacePublicTd">{task.sdate}</td>
                  <td className="userWorkspacePublicTd">{task.edate}</td>
                  <td className="userWorkspacePublicTd">{task.status}</td>
                  <td className="userWorkspacePublicTd">{task.priority}</td>
                  <td className="userWorkspacePublicTd">{new Date(task.updated_at).toLocaleDateString()}</td>
                  <td className="userWorkspacePublicResponseTd">
                    <div className="actionButtons">
                      <button 
                        className="userWorkspacePublicTaskResponseBtn userWorkspacePublicUpdateBtn" 
                        onClick={() => openUpdateModal(task)}
                      >
                        Update
                      </button>
                      <button className="userWorkspacePublicTaskResponseBtn userWorkspacePublicDeleteBtn">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" style={{ textAlign: 'center', color: 'black', padding: '20px' }}>No tasks found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showUpdateModal && (
        <div className="userWorkspacePublicModal">
          <div className="userWorkspacePublicModalContent">
            <span className="userWorkspacePublicClose" onClick={() => setShowUpdateModal(false)}>&times;</span>
            <h3>Update Task</h3>
            <form onSubmit={handleUpdate}>
              <div className="formGroup">
                <label htmlFor="name">Task Name</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
              </div>

              <div className="formGroup">
                <label htmlFor="description">Description</label>
                <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} required />
              </div>

              <div className="formGroup">
                <label htmlFor="employee">Assign Employees (Hold Ctrl/Cmd to select multiple)</label>
                <select name="employee" id="employee" className="userWorkspacePublicFormInput" value={formData.employee} onChange={handleInputChange} multiple required>
                  {employees?.data?.map((employee) => (
                    <option value={employee.id} key={employee.id}>
                      {employee.fname} {employee.lname}
                    </option>
                  ))}
                </select>
              </div>

              <div className="dateRow">
                <div className="formGroup">
                  <label htmlFor="sdate">Start Date</label>
                  <input type="date" id="sdate" name="sdate" value={formData.sdate} onChange={handleInputChange} required />
                </div>
                <div className="formGroup">
                  <label htmlFor="edate">End Date</label>
                  <input type="date" id="edate" name="edate" value={formData.edate} onChange={handleInputChange} required />
                </div>
              </div>

              <div className="formGroup">
                <label htmlFor="priority">Priority</label>
                <select id="priority" name="priority" value={formData.priority} onChange={handleInputChange} required className="userWorkspacePublicFormInput">
                    <option value="">Select Priority</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
              </div>

              <button className="userWorkspacePublicBtn primary" type="submit">Save Changes</button>
            </form>
          </div>
        </div>
      )}
    </TasksContainer>
  );
}

const TasksContainer = styled.div`
  padding: 20px;

  .userWorkspacePublicHeaderBar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding: 10px 0;
    border-bottom: 2px solid #334155;
  }

  #userWorkspacePublicTaskHeading {
    font-size: 2rem;
    color: #1e293b;
    font-family: 'Baloo 2', cursive;
  }

  #userWorkspacePublicFilter {
    font-size: 1.5rem;
    color: #64748b;
    cursor: pointer;
    transition: all 0.3s;
    &:hover { color: #1e293b; transform: scale(1.1); }
  }

  .userWorkspacePublicTableContainer {
    max-height: 75vh;
    overflow-y: auto;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    background: white;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  .userWorkspacePublicTh {
    background-color: #f8fafc;
    padding: 15px;
    text-align: left;
    color: #475569 !important;
    font-weight: 600;
    border-bottom: 2px solid #e2e8f0;
    position: sticky;
    top: 0;
  }

  .userWorkspacePublicTd {
    padding: 15px;
    border-bottom: 1px solid #f1f5f9;
    color: #1e293b !important;
    font-size: 0.95rem;
  }

  .employeeBadge {
    display: inline-block;
    background: #e2e8f0;
    padding: 2px 8px;
    border-radius: 4px;
    margin: 2px;
    font-size: 0.85rem;
  }

  .actionButtons {
    display: flex;
    gap: 8px;
  }

  .userWorkspacePublicTaskResponseBtn {
    padding: 6px 12px;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.85rem;
    transition: opacity 0.2s;
    &:hover { opacity: 0.8; }
  }

  .userWorkspacePublicUpdateBtn { background-color: #3b82f6; }
  .userWorkspacePublicDeleteBtn { background-color: #ef4444; }

  /* Modal Styles */
  .userWorkspacePublicModal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(2px);
    z-index: 1000;
  }

  .userWorkspacePublicModalContent {
    background-color: white;
    padding: 30px;
    border-radius: 16px;
    width: 500px;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2);

    h3 { margin-bottom: 20px; color: #1e293b; font-size: 1.5rem; }
  }

  .formGroup {
    margin-bottom: 15px;
    label { display: block; margin-bottom: 5px; font-weight: 500; color: #475569; }
    input, textarea, select {
      width: 100%;
      padding: 10px;
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      font-size: 1rem;
    }
    textarea { height: 80px; resize: vertical; }
  }

  .dateRow {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
  }

  .userWorkspacePublicClose {
    position: absolute;
    top: 15px;
    right: 20px;
    font-size: 1.8rem;
    cursor: pointer;
    color: #94a3b8;
    &:hover { color: #ef4444; }
  }

  .userWorkspacePublicBtn.primary {
    width: 100%;
    background-color: #10b981;
    color: white;
    padding: 12px;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    margin-top: 10px;
    cursor: pointer;
    &:hover { background-color: #059669; }
  }
`;

export default Tasks;