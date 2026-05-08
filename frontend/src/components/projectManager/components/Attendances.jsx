import React, { useState } from 'react';
import '../assets/css/Attendance.css';

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
