import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import usePost from "../../../hooks/usePost";
import styled from 'styled-components';

const PmCreateWorkspace = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { postData, loading: isPosting } = usePost();
    
    // Extracting projectId from state (handling both object and direct value)
    const projectId = location.state?.projectId || location.state;

    const { data: employees, loading: loadingUsers } = useFetch("http://localhost:8000/api/allUsers");

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        sdate: "",
        edate: "",
        leader: "",
        status: "Active",
        projectId: projectId,
        employee: []
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
        
        if (!projectId) {
            alert("Error: No Project ID associated with this workspace.");
            return;
        }

        const result = await postData("http://localhost:8000/api/workspaceCreate", formData);
        if (result?.status === true) {
            alert("Workspace successfully created!");
            navigate("/react/projectManager/projectDash", { state: { selectedProjectId: projectId } });
        }
    };

    if (loadingUsers) return <StatusBox>Loading project personnel...</StatusBox>;

    return (
        <WorkspaceFormWrapper>
            <div className="form-card">
                <div className="form-header">
                    <div className="icon-wrap">
                        <i className="fas fa-layer-group"></i>
                    </div>
                    <div>
                        <h2>Initialize Workspace</h2>
                        <p>Define a new operational segment for Project ID: {projectId || "N/A"}</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-section">
                        <label>Workspace Identity</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="e.g., Frontend Development Phase 1"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        <textarea
                            name="description"
                            placeholder="Outline the primary objectives of this workspace..."
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="grid-row">
                        <div className="form-group">
                            <label><i className="fas fa-calendar-alt"></i> Commencement Date</label>
                            <input type="date" name="sdate" value={formData.sdate} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label><i className="fas fa-flag-checkered"></i> Target Completion</label>
                            <input type="date" name="edate" value={formData.edate} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="form-group">
                        <label><i className="fas fa-user-shield"></i> Workspace Leader</label>
                        <select name="leader" value={formData.leader} onChange={handleChange} required>
                            <option value="">-- Assign a Lead --</option>
                            {employees?.data?.map((emp) => (
                                <option key={emp.id} value={`${emp.fname} ${emp.lname}`}>
                                    {emp.fname} {emp.lname}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>
                            <i className="fas fa-users"></i> Assigned Personnel 
                            <small> (Hold Ctrl/Cmd to select multiple)</small>
                        </label>
                        <select
                            name="employee"
                            className="multi-select"
                            value={formData.employee}
                            onChange={handleChange}
                            required
                            multiple
                        >
                            {employees?.data?.map((emp) => (
                                <option key={emp.id} value={emp.id}>
                                    {emp.fname} {emp.lname}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="action-buttons">
                        <button type="submit" className="submit-btn" disabled={isPosting}>
                            {isPosting ? "Creating..." : "Generate Workspace"}
                        </button>
                        <button type="button" className="cancel-btn" onClick={() => navigate(-1)}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </WorkspaceFormWrapper>
    );
};

export default PmCreateWorkspace;

const StatusBox = styled.div`
    text-align: center;
    padding: 100px;
    font-family: 'Baloo 2', cursive;
    color: #64748b;
`;

const WorkspaceFormWrapper = styled.div`
    padding: 50px 20px;
    font-family: 'Baloo 2', cursive;
    background-color: #f8fafc;
    min-height: 100vh;

    .form-card {
        max-width: 700px;
        margin: 0 auto;
        background: white;
        padding: 40px;
        border-radius: 24px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
        border: 1px solid #e2e8f0;
    }

    .form-header {
        display: flex;
        align-items: center;
        gap: 20px;
        margin-bottom: 40px;

        .icon-wrap {
            width: 60px;
            height: 60px;
            background: #dbeafe;
            color: #3b82f6;
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.8rem;
        }

        h2 { font-size: 2rem; color: #0f172a; margin: 0; }
        p { color: #64748b; margin: 5px 0 0; }
    }

    .grid-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
        margin-bottom: 20px;
        @media (max-width: 600px) { grid-template-columns: 1fr; }
    }

    .form-group, .form-section {
        margin-bottom: 25px;
        
        label {
            display: block;
            margin-bottom: 10px;
            font-weight: 700;
            color: #334155;
            font-size: 1rem;
            
            small { font-weight: 400; color: #94a3b8; font-size: 0.8rem; }
            i { color: #3b82f6; margin-right: 8px; }
        }

        input, textarea, select {
            width: 100%;
            padding: 14px;
            border-radius: 12px;
            border: 2px solid #f1f5f9;
            background: #f8fafc;
            font-family: inherit;
            font-size: 1rem;
            transition: 0.3s;

            &:focus {
                outline: none;
                border-color: #3b82f6;
                background: white;
                box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
            }
        }

        textarea { height: 120px; resize: vertical; }

        .multi-select {
            height: 150px;
            padding: 10px;
            option { padding: 8px; border-radius: 8px; margin-bottom: 2px; }
        }
    }

    .action-buttons {
        display: flex;
        gap: 15px;
        margin-top: 40px;

        button {
            flex: 1;
            padding: 16px;
            border-radius: 14px;
            font-weight: 800;
            font-size: 1.1rem;
            cursor: pointer;
            transition: 0.2s;
            border: none;
            font-family: inherit;
        }

        .submit-btn {
            background: #3b82f6;
            color: white;
            &:hover { background: #2563eb; transform: translateY(-2px); }
            &:disabled { background: #94a3b8; cursor: not-allowed; }
        }

        .cancel-btn {
            background: #f1f5f9;
            color: #64748b;
            &:hover { background: #e2e8f0; color: #0f172a; }
        }
    }
`;