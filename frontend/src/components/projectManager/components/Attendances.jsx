import React, { useState } from 'react';
import '../assets/css/Attendance.css';
import styled from 'styled-components';

const Attendance = () => {
  const [showAddModal, setShowAddModal] = useState(true);
  const [showUpdateModal, setShowUpdateModal] = useState(true);
  const [showDeleteConfirmModal, setConfirmModal] = useState(true);
  const [attendanceList, setAttendanceList] = useState([
    { id: 1, employee: 'Jane Doe', date: '2025-04-30', status: 'Present' },
  ]);

  const [formData, setFormData] = useState({
    employee: '',
    date: '',
    status: 'Present',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const newAttendance = {
      id: attendanceList.length + 1,
      ...formData,
    };
    setAttendanceList(prev => [...prev, newAttendance]);
    setFormData({ employee: '', date: '', status: 'Present' });
    setShowAddModal(false);
  };

  const openUpdate = (item) => {
    setFormData(item);
    setShowUpdateModal(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedList = attendanceList.map(item =>
      item.id === formData.id ? formData : item
    );
    setAttendanceList(updatedList);
    setShowUpdateModal(false);
  };

  return (
    <div className="AttendanceContainer">
      <h2>Attendance List</h2>
      <button className="btn primary" onClick={() => setShowAddModal(true)}>
        + Add Attendance
      </button>

      <table className="attendance-table">
        <thead>
          <tr>
            <th>S.N</th>
            <th>Employee</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {attendanceList.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.employee}</td>
              <td>{item.date}</td>
              <td>
                <span className={`status ${item.status.toLowerCase()}`}>
                  {item.status}
                </span>
              </td>
              <td>
                <button className="btn edit" onClick={() => openUpdate(item)}>Edit</button>
                <button className="btn delete">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Attendance Modal */}
      {showAddModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowAddModal(false)}>&times;</span>
            <h3>Add Attendance</h3>
            <form onSubmit={handleAdd}>
              
          <label className="form-label">Employee</label>
          <select
            name="employee"
            className="form-input"
            value={formData.employee}
            onChange={handleChange}
            multiple
            required
          >
            {employees?.data?.length > 0 &&
              employees.data.map((employee, index) => (
                <option value={employee.id} key={index}>
                  {employee.fname+" "+employee.lname}
                </option>
              ))}
          </select>
     


              <label>Date</label>
              <input type="date" name="date" value={formData.date} onChange={handleInputChange} required />

              <label>Status</label>
              <div className="radio-group">
                <label>
                  <input type="radio" name="status" value="Present"
                    checked={formData.status === 'Present'}
                    onChange={handleInputChange} />
                  Present
                </label>
                <label>
                  <input type="radio" name="status" value="Absent"
                    checked={formData.status === 'Absent'}
                    onChange={handleInputChange} />
                  Absent
                </label>
              </div>
              <button className="btn primary" type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}

      {/* Update Attendance Modal */}
      {showUpdateModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowUpdateModal(false)}>&times;</span>
            <h3>Update Attendance</h3>
            <form onSubmit={handleUpdate}>
              <label>Employee</label>
              <input name="employee" value={formData.employee} onChange={handleInputChange} required />

              <label>Date</label>
              <input type="date" name="date" value={formData.date} onChange={handleInputChange} required />

              <label>Status</label>
              <div className="radio-group">
                <label>
                  <input type="radio" name="status" value="Present"
                    checked={formData.status === 'Present'}
                    onChange={handleInputChange} />
                  Present
                </label>
                <label>
                  <input type="radio" name="status" value="Absent"
                    checked={formData.status === 'Absent'}
                    onChange={handleInputChange} />
                  Absent
                </label>
              </div>
              <button className="btn primary" type="submit">Update</button>
            </form>
          </div>
        </div>
      )}

{/* 
      {
        showDeleteConfirmModal && (
          <div className="modal">
            <div className="modal-content">
            <span className="close" onClick={() => setConfirmModal(false)}>&times;</span>
            <h3>Are you sure?</h3>
            <div className="answerBtns">
            <button>Yes</button> 
            <button>no</button>
            </div>
            </div>
          </div>
        )
      } */}
    </div>
  );
};

export default Attendance;
const AttendanceContainer = styled.div`
  .AttendanceContainer {
    padding: 2rem;
    max-width: 800px;
    margin: auto;
    font-family: 'Baloo 2', sans-serif;
  }
  
  .attendance-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
  }
  
  .attendance-table th,
  .attendance-table td {
    border: 1px solid #ddd;
    padding: 0.8rem;
    text-align: left;
  }
  
  .attendance-table th {
    background-color: #f5f5f5;
    color: black;
   
    
  }
  
  .status.present {
    color: green;
    font-weight: bold;
  }
  
  .status.absent {
    color: red;
    font-weight: bold;
  }
  
  .btn {
    padding: 6px 12px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.9rem;
  }
  
  .btn.primary {
    background-color: #1e293b;
    color: rgb(255, 255, 255);
  }
  
  .btn.edit {
    background-color: #2196F3;
    color: white;
    margin-right: 10px;
  }
  
  .btn.delete {
    background-color: #f44336;
    color: white;
  }
  
  /* Modal Styles */
  .modal {
    position: fixed;
    z-index: 999;
    padding-top: 60px;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0,0,0,0.4);
  }
  
  .modal-content {
    background-color: white;
    margin: auto;
    padding: 2rem;
    border: 1px solid #888;
    width: 400px;
    border-radius: 8px;
  }
  
  .modal-content h3 {
    margin-bottom: 1rem;
  }
  
  .modal-content label {
    display: block;
    margin: 0.5rem 0 0.3rem;
  }
  
  .modal-content input,
  .modal-content select {
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .radio-group {
    display: flex;
    gap: 1rem;
  }
  
  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
  }
  .answerBtns
  {
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 10px;
  }

`;