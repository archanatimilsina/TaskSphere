import React, { useState } from 'react';
import styled from 'styled-components';
import useFetch from '../../../hooks/useFetch'; // Assuming your hook path
import usePost from '../../../hooks/usePost';
import useDelete from '../../../hooks/useDelete';

const PmAttendances = () => {
  // Data Fetching
  const { data: employees } = useFetch("http://localhost:8000/api/allEmployees");
  const { postData, loading: postLoading } = usePost();
  const { DeleteData } = useDelete();

  // Modal States
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  // Data States
  const [attendanceList, setAttendanceList] = useState([
    { id: 1, employee: 'Jane Doe', date: '2026-05-10', status: 'Present' },
  ]);
  const [selectedId, setSelectedId] = useState(null);
  const [formData, setFormData] = useState({
    employee: '',
    date: new Date().toISOString().split('T')[0],
    status: 'Present',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    // Simulate API call or use postData hook
    const newEntry = { id: Date.now(), ...formData };
    setAttendanceList([...attendanceList, newEntry]);
    setShowAddModal(false);
    resetForm();
  };

  const openUpdate = (item) => {
    setFormData(item);
    setShowUpdateModal(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setAttendanceList(attendanceList.map(item => 
      item.id === formData.id ? formData : item
    ));
    setShowUpdateModal(false);
    resetForm();
  };

  const confirmDelete = (id) => {
    setSelectedId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    setAttendanceList(attendanceList.filter(item => item.id !== selectedId));
    setShowDeleteModal(false);
  };

  const resetForm = () => {
    setFormData({ employee: '', date: new Date().toISOString().split('T')[0], status: 'Present' });
  };

  return (
    <AttendanceWrapper>
      <div className="header-flex">
        <div>
          <h2>Attendance Management</h2>
          <p>Track and manage project team daily logs</p>
        </div>
        <button className="btn-add" onClick={() => { resetForm(); setShowAddModal(true); }}>
          <i className="fas fa-plus"></i> Mark Attendance
        </button>
      </div>

      <div className="table-card">
        <table className="attendance-table">
          <thead>
            <tr>
              <th>SN</th>
              <th>Employee Name</th>
              <th>Date</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {attendanceList.length > 0 ? (
              attendanceList.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td className="emp-name">{item.employee}</td>
                  <td>{item.date}</td>
                  <td>
                    <StatusBadge className={item.status.toLowerCase()}>
                      {item.status}
                    </StatusBadge>
                  </td>
                  <td className="text-center">
                    <button className="action-btn edit" onClick={() => openUpdate(item)}>
                      <i className="fas fa-edit"></i>
                    </button>
                    <button className="action-btn delete" onClick={() => confirmDelete(item.id)}>
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="empty-row">No attendance records found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <ModalOverlay>
          <div className="modal-card">
            <div className="modal-header">
              <h3>Log New Attendance</h3>
              <button className="close-btn" onClick={() => setShowAddModal(false)}>&times;</button>
            </div>
            <form onSubmit={handleAdd}>
              <div className="form-group">
                <label>Select Employee</label>
                <select name="employee" value={formData.employee} onChange={handleInputChange} required>
                  <option value="">-- Choose Member --</option>
                  {employees?.data?.map((emp) => (
                    <option key={emp.id} value={`${emp.fname} ${emp.lname}`}>
                      {emp.fname} {emp.lname}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Date</label>
                <input type="date" name="date" value={formData.date} onChange={handleInputChange} required />
              </div>

              <div className="form-group">
                <label>Attendance Status</label>
                <div className="radio-container">
                  <label className="radio-label">
                    <input type="radio" name="status" value="Present" checked={formData.status === 'Present'} onChange={handleInputChange} />
                    <span>Present</span>
                  </label>
                  <label className="radio-label">
                    <input type="radio" name="status" value="Absent" checked={formData.status === 'Absent'} onChange={handleInputChange} />
                    <span>Absent</span>
                  </label>
                </div>
              </div>
              <button type="submit" className="submit-btn">Save Attendance</button>
            </form>
          </div>
        </ModalOverlay>
      )}

      {/* Update Modal */}
      {showUpdateModal && (
        <ModalOverlay>
          <div className="modal-card">
            <div className="modal-header">
              <h3>Update Record</h3>
              <button className="close-btn" onClick={() => setShowUpdateModal(false)}>&times;</button>
            </div>
            <form onSubmit={handleUpdate}>
              <div className="form-group">
                <label>Employee</label>
                <input type="text" name="employee" value={formData.employee} disabled />
              </div>
              <div className="form-group">
                <label>Date</label>
                <input type="date" name="date" value={formData.date} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Status</label>
                <div className="radio-container">
                  <label className="radio-label">
                    <input type="radio" name="status" value="Present" checked={formData.status === 'Present'} onChange={handleInputChange} />
                    <span>Present</span>
                  </label>
                  <label className="radio-label">
                    <input type="radio" name="status" value="Absent" checked={formData.status === 'Absent'} onChange={handleInputChange} />
                    <span>Absent</span>
                  </label>
                </div>
              </div>
              <button type="submit" className="submit-btn update">Update Record</button>
            </form>
          </div>
        </ModalOverlay>
      )}

      {/* Delete Confirmation */}
      {showDeleteModal && (
        <ModalOverlay>
          <div className="modal-card mini">
            <h3>Delete Record?</h3>
            <p>Are you sure you want to remove this attendance entry? This action cannot be undone.</p>
            <div className="confirm-flex">
              <button className="confirm-yes" onClick={handleDelete}>Yes, Delete</button>
              <button className="confirm-no" onClick={() => setShowDeleteModal(false)}>Cancel</button>
            </div>
          </div>
        </ModalOverlay>
      )}
    </AttendanceWrapper>
  );
};

export default PmAttendances;

const StatusBadge = styled.span`
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 700;
  &.present { background: #dcfce7; color: #166534; }
  &.absent { background: #fee2e2; color: #991b1b; }
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  .modal-card {
    background: white;
    width: 90%;
    max-width: 450px;
    padding: 30px;
    border-radius: 20px;
    box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1);

    &.mini { text-align: center; p { color: #64748b; margin: 15px 0 25px; } }

    .modal-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 25px;
      h3 { margin: 0; color: #1e293b; }
      .close-btn { background: none; border: none; font-size: 1.5rem; cursor: pointer; color: #94a3b8; }
    }

    .form-group {
      margin-bottom: 20px;
      label { display: block; margin-bottom: 8px; font-weight: 700; color: #475569; font-size: 0.9rem; }
      input, select {
        width: 100%;
        padding: 12px;
        border-radius: 10px;
        border: 1px solid #e2e8f0;
        font-family: inherit;
        &:focus { border-color: #3b82f6; outline: none; }
      }
    }

    .radio-container {
      display: flex;
      gap: 20px;
      .radio-label {
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        font-weight: 600;
      }
    }

    .submit-btn {
      width: 100%;
      padding: 14px;
      background: #1e293b;
      color: white;
      border: none;
      border-radius: 12px;
      font-weight: 700;
      cursor: pointer;
      margin-top: 10px;
      &.update { background: #3b82f6; }
    }

    .confirm-flex {
      display: flex;
      gap: 15px;
      button {
        flex: 1;
        padding: 12px;
        border-radius: 10px;
        border: none;
        font-weight: 700;
        cursor: pointer;
      }
      .confirm-yes { background: #ef4444; color: white; }
      .confirm-no { background: #f1f5f9; color: #475569; }
    }
  }
`;

const AttendanceWrapper = styled.div`
  padding: 40px;
  max-width: 1100px;
  margin: 0 auto;
  font-family: 'Baloo 2', cursive;

  .header-flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
    h2 { margin: 0; font-size: 2.2rem; color: #1e293b; }
    p { margin: 5px 0 0; color: #64748b; }

    .btn-add {
      background: #3b82f6;
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
      &:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3); }
    }
  }

  .table-card {
    background: white;
    border-radius: 20px;
    box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05);
    overflow: hidden;
    border: 1px solid #f1f5f9;
  }

  .attendance-table {
    width: 100%;
    border-collapse: collapse;
    
    th {
      background: #f8fafc;
      padding: 18px 20px;
      text-align: left;
      color: #64748b;
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    td {
      padding: 16px 20px;
      border-bottom: 1px solid #f1f5f9;
      color: #334155;
      font-size: 1.05rem;
    }

    .emp-name { font-weight: 700; color: #1e293b; }
    .text-center { text-align: center; }
    
    .action-btn {
      background: none;
      border: none;
      font-size: 1.1rem;
      cursor: pointer;
      margin: 0 5px;
      &.edit { color: #3b82f6; }
      &.delete { color: #ef4444; }
      &:hover { opacity: 0.7; }
    }

    .empty-row { text-align: center; padding: 40px; color: #94a3b8; font-style: italic; }
  }
`;