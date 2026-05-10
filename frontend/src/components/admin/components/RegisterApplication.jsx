import React, { useState } from "react";
import styled from 'styled-components';
import useFetch from '../../../hooks/useFetch';
import usePost from '../../../hooks/usePost';
import useDelete from "../../../hooks/useDelete";

function AdminRegisterApplication() {
    const { data, loading, error } = useFetch("http://localhost:8000/api/allApplication");
    const { postData, loading: isPosting } = usePost();
    const { DeleteData } = useDelete();

    const [selectedAppId, setSelectedAppId] = useState(null);
    const [secretCode, setSecretCode] = useState('');
    const [role, setRole] = useState('');
    
    const [modalState, setModalState] = useState({
        accept: false,
        reject: false,
        scode: false
    });

    const closeAllModals = () => {
        setModalState({ accept: false, reject: false, scode: false });
        setSecretCode('');
        setRole('');
    };

    const handleRejectAction = async () => {
        await postData("http://localhost:8000/api/sendRejectEmail", { id: selectedAppId });
        const result = await DeleteData(`http://localhost:8000/api/removeData/${selectedAppId}`);
        if (result?.status === true) {
            alert("Application Rejected and Email Sent.");
        }
        closeAllModals();
    };

    const handleFinalAccept = async (e) => {
        e.preventDefault();
        if (!secretCode || !role) {
            alert("Please provide both the secret code and role.");
            return;
        }

        const input = { scode: secretCode, applicationId: selectedAppId, role: role };
        
            const result = await postData("http://localhost:8000/api/passScode", input);
            console.log(result)
            if (result?.status === true) {
                const delResult = await DeleteData(`http://localhost:8000/api/removeData/${selectedAppId}`);
                if (delResult?.status === true) {
                    alert("Application registered successfully!");
                    window.location.reload();
                }
            } else {
                alert("Authorization failed. Check secret code.");
            }
       
        closeAllModals();
    };

    if (loading) return <StatusBox>Fetching pending applications...</StatusBox>;
    if (error) return <StatusBox className="error">Error: {error}</StatusBox>;

    return (
        <RegisterContainer>
            <div className="header-area">
                <h1>Registration Requests</h1>
                <p>Review and authorize new employee access requests</p>
            </div>

            <div className="table-header">
                <div className="th-item">#</div>
                <div className="th-item">Applicant Name</div>
                <div className="th-item">Contact</div>
                <div className="th-item">Email Address</div>
                <div className="th-item">Decision</div>
            </div>

            <div className="EmployeeWrap">
                {data?.data?.length > 0 ? (
                    data.data.map((Employee, index) => (
                        <div className="employeeRow" key={Employee.id || index}>
                            <ul>
                                <li className="col-idx">{index + 1}</li>
                                <li className="col-name">{Employee.fname} {Employee.lname}</li>
                                <li className="col-phone">{Employee.phone}</li>
                                <li className="col-email">{Employee.email}</li>
                                <li className="col-actions">
                                    <button className="responseBtn AcceptBtn" onClick={() => { setSelectedAppId(Employee.id); setModalState({ ...modalState, accept: true }); }}>
                                        <i className="fas fa-check"></i> Accept
                                    </button>
                                    <button className="responseBtn RejectBtn" onClick={() => { setSelectedAppId(Employee.id); setModalState({ ...modalState, reject: true }); }}>
                                        <i className="fas fa-times"></i> Reject
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ))
                ) : (
                    <div className="empty-state">No pending registration applications.</div>
                )}
            </div>

            {/* Accept Confirmation Modal */}
            {modalState.accept && (
                <ModalOverlay>
                    <div className="custom-modal">
                        <div className="modal-icon accept-icon"><i className="fas fa-user-check"></i></div>
                        <h3>Accept Application?</h3>
                        <p>This will move the applicant to the next stage of registration.</p>
                        <div className="modal-footer">
                            <button className="confirm-btn green" onClick={() => setModalState({ accept: false, scode: true })}>Proceed</button>
                            <button className="cancel-btn" onClick={closeAllModals}>Cancel</button>
                        </div>
                    </div>
                </ModalOverlay>
            )}

            {/* Secret Code & Role Modal */}
            {modalState.scode && (
                <ModalOverlay>
                    <div className="custom-modal scode-modal">
                        <header>
                            <h3>Final Authorization</h3>
                            <button className="close-x" onClick={closeAllModals}>&times;</button>
                        </header>
                        <form onSubmit={handleFinalAccept}>
                            <div className="form-group">
                                <label>Temporary Secret Code</label>
                                <input 
                                    type="password" 
                                    placeholder="Enter system code" 
                                    value={secretCode} 
                                    onChange={(e) => setSecretCode(e.target.value)} 
                                    required 
                                />
                            </div>
                            <div className="form-group">
                                <label>Assign Staff Role</label>
                                <select value={role} onChange={(e) => setRole(e.target.value)} required>
                                    <option value="" disabled>-- Select System Role --</option>
                                    <option value="user">User</option>
                                    <option value="Project Manager">Project Manager</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                            <button type="submit" className="submit-auth-btn" disabled={isPosting}>
                                {isPosting ? "Processing..." : "Complete Registration"}
                            </button>
                        </form>
                    </div>
                </ModalOverlay>
            )}

            {/* Reject Confirmation Modal */}
            {modalState.reject && (
                <ModalOverlay>
                    <div className="custom-modal">
                        <div className="modal-icon reject-icon"><i className="fas fa-user-slash"></i></div>
                        <h3>Reject Applicant?</h3>
                        <p>This will permanently delete the application and notify the user via email.</p>
                        <div className="modal-footer">
                            <button className="confirm-btn red" onClick={handleRejectAction}>Reject & Notify</button>
                            <button className="cancel-btn" onClick={closeAllModals}>Cancel</button>
                        </div>
                    </div>
                </ModalOverlay>
            )}
        </RegisterContainer>
    );
}

export default AdminRegisterApplication;

const StatusBox = styled.div`
    text-align: center;
    padding: 100px;
    font-size: 1.2rem;
    color: #64748b;
    font-family: 'Baloo 2', cursive;
    &.error { color: #ef4444; }
`;

const ModalOverlay = styled.div`
    position: fixed;
    inset: 0;
    background: rgba(15, 23, 42, 0.8);
    backdrop-filter: blur(5px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2000;

    .custom-modal {
        background: white;
        width: 90%;
        max-width: 450px;
        padding: 40px;
        border-radius: 24px;
        text-align: center;
        box-shadow: 0 20px 40px rgba(0,0,0,0.3);

        h3 { font-size: 1.8rem; color: #0f172a; margin-bottom: 10px; }
        p { color: #64748b; margin-bottom: 30px; }

        .modal-icon {
            font-size: 3rem;
            margin-bottom: 20px;
            &.accept-icon { color: #22c55e; }
            &.reject-icon { color: #ef4444; }
        }
    }

    .scode-modal {
        text-align: left;
        header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 25px;
            h3 { margin: 0; font-size: 1.4rem; }
            .close-x { background: none; border: none; font-size: 2rem; cursor: pointer; color: #94a3b8; }
        }

        .form-group {
            margin-bottom: 20px;
            label { display: block; margin-bottom: 8px; font-weight: 700; color: #475569; }
            input, select {
                width: 100%;
                padding: 12px;
                border-radius: 12px;
                border: 2px solid #e2e8f0;
                font-family: inherit;
                &:focus { border-color: #3b82f6; outline: none; }
            }
        }

        .submit-auth-btn {
            width: 100%;
            padding: 14px;
            background: #0f172a;
            color: white;
            border: none;
            border-radius: 12px;
            font-weight: 700;
            font-size: 1rem;
            cursor: pointer;
            &:hover { background: #1e293b; }
        }
    }

    .modal-footer {
        display: flex;
        gap: 12px;
        button {
            flex: 1;
            padding: 12px;
            border-radius: 12px;
            font-weight: 700;
            cursor: pointer;
            border: none;
        }
        .confirm-btn.green { background: #22c55e; color: white; }
        .confirm-btn.red { background: #ef4444; color: white; }
        .cancel-btn { background: #f1f5f9; color: #475569; }
    }
`;

const RegisterContainer = styled.div`
    padding: 40px;
    font-family: 'Baloo 2', cursive;
    max-width: 1300px;
    margin: 0 auto;

    .header-area {
        text-align: center;
        margin-bottom: 50px;
        h1 { font-size: 3rem; color: #0f172a; margin: 0; font-weight: 800; }
        p { color: #64748b; font-size: 1.1rem; }
    }

    .table-header {
        display: flex;
        padding: 15px 30px;
        background: #f1f5f9;
        border-radius: 15px 15px 0 0;
        font-weight: 800;
        color: #475569;
        text-transform: uppercase;
        font-size: 0.85rem;
        
        .th-item { flex: 1; text-align: center; }
        @media (max-width: 900px) { display: none; }
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
        background: #fff;
        border-radius: 15px;
        border: 1px solid #f1f5f9;
        transition: 0.3s;

        &:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 20px rgba(0,0,0,0.06);
            border-color: #e2e8f0;
        }

        ul {
            display: flex;
            align-items: center;
            padding: 20px;
            list-style: none;
            
            li {
                flex: 1;
                text-align: center;
                color: #334155;
                font-size: 1.1rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
    }

    .col-actions {
        display: flex;
        gap: 10px;
        justify-content: center;

        button {
            padding: 8px 16px;
            border-radius: 10px;
            border: none;
            color: white;
            font-weight: 700;
            cursor: pointer;
            transition: 0.2s;
            font-family: inherit;
        }

        .AcceptBtn { background: #22c55e; &:hover { background: #16a34a; } }
        .RejectBtn { background: #ef4444; &:hover { background: #dc2626; } }
    }

    .empty-state { text-align: center; padding: 60px; color: #94a3b8; font-style: italic; }
`;