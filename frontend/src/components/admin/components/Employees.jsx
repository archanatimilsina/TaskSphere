import React, { useState } from 'react';
import styled from 'styled-components';
import useFetch from '../../../hooks/useFetch';
import usePost from '../../../hooks/usePost';
import useDelete from '../../../hooks/useDelete';

function AdminEmployees() {
    const { postData, loading: updating } = usePost();
    const { DeleteData } = useDelete();
    const { data, loading, error, reFetch } = useFetch("http://localhost:8000/api/allUsers");

    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedAppId, setSelectedAppId] = useState(null);
    const [formData, setFormData] = useState({
        scode: "",
        role: "User"
    });

    const HandleUpdate = (employee) => {
        setFormData({ scode: "", role: employee.role });
        setSelectedAppId(employee.id);
        setShowUpdateModal(true);
    };

    const HandleDelete = (id) => {
        setSelectedAppId(id);
        setShowDeleteModal(true);
    };

    const ConfirmDelete = async () => {
        const result = await DeleteData(`http://localhost:8000/api/deleteUserData/${selectedAppId}`);
        if (result?.status === true) {
            alert("Employee record removed.");
            window.location.reload();
        } else {
            alert("Failed to delete record.");
            window.location.reload();
        }
        setShowDeleteModal(false);
    };

    const HandleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const HandleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.scode || !formData.role) {
            alert("Please fill in both the secret code and role.");
            return;
        }

        const result = await postData(`http://localhost:8000/api/userUpdateAdmin/${selectedAppId}`, formData);
        if (result?.status === true) {
            alert("Employee updated successfully!");
            setShowUpdateModal(false);
            reFetch();
        }
    };

    if (loading) return <StatusBox>Loading employee records...</StatusBox>;
    if (error) return <StatusBox className="error">Error: {error}</StatusBox>;

    return (
        <EmployeesContainer>
            <header className="page-header">
                <h1 id="Employeeheading">Employee Directory</h1>
                <p>Manage staff roles, permissions, and organizational access</p>
            </header>

            <div className="table-header">
                <div className="header-item">#</div>
                <div className="header-item">Full Name</div>
                <div className="header-item">Contact</div>
                <div className="header-item">Location</div>
                <div className="header-item">Email Address</div>
                <div className="header-item">Current Role</div>
                <div className="header-item">Actions</div>
            </div>

            <div className="EmployeeWrap">
                {data?.data?.length > 0 ? (
                    data.data.map((Employee, index) => (
                        <div className="employeeRow" key={Employee.id || index}>
                            <ul>
                                <li className="col-idx">{index + 1}</li>
                                <li className="col-name">{Employee.fname} {Employee.lname}</li>
                                <li className="col-phone">{Employee.phone}</li>
                                <li className="col-addr">{Employee.address}</li>
                                <li className="col-email">{Employee.email}</li>
                                <li className="col-role">
                                    <span className={`role-badge ${Employee.role.toLowerCase().replace(' ', '-')}`}>
                                        {Employee.role}
                                    </span>
                                </li>
                                <li className='employeeResponse'>
                                    <button className='employeeEdit' onClick={() => HandleUpdate(Employee)}>
                                        <i className="fas fa-user-edit"></i> Edit
                                    </button>
                                    <button className='employeeRemove' onClick={() => HandleDelete(Employee.id)}>
                                        <i className="fas fa-trash-alt"></i>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ))
                ) : (
                    <div className="empty-state">No employees found in the database.</div>
                )}
            </div>

            {showUpdateModal && (
                <div className="EmployeeModal">
                    <div className="EmployeeModal-content">
                        <div className="modal-header">
                            <h3>Update Employee Access</h3>
                            <span className="close" onClick={() => setShowUpdateModal(false)}>&times;</span>
                        </div>
                        <form onSubmit={HandleSubmit}>
                            <div className="form-group">
                                <label htmlFor="scode">Admin Secret Code</label>
                                <input 
                                    type="password" 
                                    id="scode" 
                                    name="scode" 
                                    placeholder="Enter authorization code"
                                    value={formData.scode} 
                                    onChange={HandleInputChange} 
                                    required 
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="role">Assign New Role</label>
                                <select
                                    name="role" 
                                    id="role" 
                                    value={formData.role}
                                    onChange={HandleInputChange}
                                    required
                                >
                                    <option value="User">User</option>
                                    <option value="Project Manager">Project Manager</option>
                                    <option value="Admin">Admin</option>
                                </select>
                            </div>

                            <div className="modal-actions">
                                <button className="employeeSubmitBtn" type="submit" disabled={updating}>
                                    {updating ? "Processing..." : "Save Changes"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showDeleteModal && (
                <div className="EmployeeModal">
                    <div className="EmployeeModal-content delete-confirm">
                        <div className="icon-warn"><i className="fas fa-exclamation-triangle"></i></div>
                        <h3>Confirm Removal</h3>
                        <p>Are you sure you want to remove this employee? This action will revoke all system access immediately.</p>
                        <div className="EmployeeModal-footer">
                            <button className="deleteBtn" onClick={ConfirmDelete}>Remove Employee</button>
                            <button className="cancelBtn" onClick={() => setShowDeleteModal(false)}>Keep Record</button>
                        </div>
                    </div>
                </div>
            )}
        </EmployeesContainer>
    );
}

export default AdminEmployees;

const StatusBox = styled.div`
    text-align: center;
    padding: 100px;
    font-size: 1.5rem;
    font-family: 'Baloo 2', cursive;
    color: #64748b;
    &.error { color: #ef4444; }
`;

const EmployeesContainer = styled.div`
    padding: 40px 20px;
    max-width: 1450px;
    margin: 0 auto;
    font-family: 'Baloo 2', cursive;

    .page-header {
        text-align: center;
        margin-bottom: 50px;
        h1 { font-size: 3rem; color: #0f172a; margin: 0; font-weight: 800; }
        p { color: #64748b; font-size: 1.1rem; }
    }

    .table-header {
        display: flex;
        justify-content: space-around;
        padding: 15px 30px;
        background: #f1f5f9;
        border-radius: 15px 15px 0 0;
        font-weight: 800;
        color: #475569;
        text-transform: uppercase;
        font-size: 0.85rem;
        letter-spacing: 1px;
        @media (max-width: 1024px) { display: none; }
    }

    .EmployeeWrap {
        display: flex;
        flex-direction: column;
        gap: 12px;
        background: white;
        padding: 15px;
        border-radius: 0 0 20px 20px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.05);
    }

    .employeeRow {
        background-color: #fff;
        border-radius: 12px;
        border: 1px solid #f1f5f9;
        transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        
        &:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 15px rgba(0, 0, 0, 0.08);
            border-color: #3b82f6;
        }

        ul {
            display: flex;
            justify-content: space-around;
            align-items: center;
            padding: 20px;
            list-style: none;
            
            li {
                flex: 1;
                text-align: center;
                color: #334155;
                font-size: 1.05rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                padding: 0 10px;
            }
        }
    }

    .role-badge {
        padding: 4px 12px;
        border-radius: 20px;
        font-size: 0.85rem;
        font-weight: 700;
        background: #f1f5f9;
        
        &.admin { background: #fee2e2; color: #dc2626; }
        &.project-manager { background: #fef3c7; color: #b45309; }
        &.user { background: #ecfdf5; color: #059669; }
    }

    .employeeResponse {
        display: flex;
        gap: 8px;
        justify-content: center;

        button {
            padding: 8px 16px;
            border-radius: 8px;
            border: none;
            color: white;
            font-weight: 600;
            cursor: pointer;
            transition: 0.2s;
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .employeeEdit { background: #3b82f6; &:hover { background: #2563eb; } }
        .employeeRemove { background: #ef4444; width: 40px; justify-content: center; &:hover { background: #dc2626; } }
    }

    /* Modal Styles */
    .EmployeeModal {
        position: fixed;
        inset: 0;
        background: rgba(15, 23, 42, 0.7);
        backdrop-filter: blur(4px);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    .EmployeeModal-content {
        background: white;
        border-radius: 24px;
        width: 95%;
        max-width: 480px;
        padding: 35px;
        position: relative;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

        h3 { font-size: 1.5rem; color: #1e293b; margin-bottom: 20px; }
        
        .form-group {
            margin-bottom: 20px;
            label { display: block; margin-bottom: 8px; font-weight: 700; color: #475569; }
            input, select {
                width: 100%;
                padding: 12px;
                border-radius: 10px;
                border: 2px solid #e2e8f0;
                font-family: inherit;
                font-size: 1rem;
                &:focus { border-color: #3b82f6; outline: none; }
            }
        }
    }

    .close {
        font-size: 1.8rem;
        color: #94a3b8;
        cursor: pointer;
        &:hover { color: #ef4444; }
    }

    .employeeSubmitBtn {
        width: 100%;
        padding: 14px;
        background: #3b82f6;
        color: white;
        border: none;
        border-radius: 12px;
        font-size: 1.1rem;
        font-weight: 700;
        cursor: pointer;
        &:hover { background: #2563eb; }
    }

    .delete-confirm {
        text-align: center;
        .icon-warn { font-size: 3rem; color: #f59e0b; margin-bottom: 15px; }
        p { color: #64748b; margin-bottom: 30px; }
    }

    .EmployeeModal-footer {
        display: flex;
        gap: 12px;
        button {
            flex: 1;
            padding: 12px;
            border-radius: 10px;
            font-weight: 700;
            border: none;
            cursor: pointer;
        }
        .deleteBtn { background: #ef4444; color: white; }
        .cancelBtn { background: #f1f5f9; color: #475569; }
    }

    .empty-state { text-align: center; padding: 50px; color: #94a3b8; font-style: italic; }
`;