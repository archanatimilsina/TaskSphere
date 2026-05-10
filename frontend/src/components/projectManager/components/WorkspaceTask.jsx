import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import styled from 'styled-components';

function WorkspaceTask({ id }) {
    const location = useLocation();
    const navigate = useNavigate();
    
    // Fallback to prop id if location state is missing
    const workspaceId = id || location.state?.workspaceId;
    const { data, loading, error } = useFetch(`http://localhost:8000/api/workspaceTask/${workspaceId}`);

    const assignTask = () => {
        navigate("/workspaceTaskForm", { state: { id: workspaceId } });
    };

    if (loading) return <StatusBox>Fetching localized tasks...</StatusBox>;
    if (error) return <StatusBox className="error">Error loading workspace tasks.</StatusBox>;

    return (
        <WorkspaceTaskContainer>
            <div className="task-sub-header">
                <div className="text-group">
                    <h2 id="pmheading">Workspace Deliverables</h2>
                    <p>Internal task tracking for Workspace #{workspaceId}</p>
                </div>
                <button className="assignTaskWorkspace" onClick={assignTask}>
                    <i className="fas fa-plus-square"></i> Assign New Task
                </button>
            </div>

            <div className="pmthirdDiv">
                <table>
                    <thead>
                        <tr>
                            <th>S.N</th>
                            <th>Deliverable</th>
                            <th>Assignee</th>
                            <th>Timeline</th>
                            <th>Status</th>
                            <th>Priority</th>
                            <th>Last Sync</th>
                        </tr>
                    </thead>
                    <tbody id="pmTaskTableBody">
                        {data?.data?.length > 0 ? (
                            data.data.map((task, index) => (
                                <tr key={task.id || index}>
                                    <td className="index-td">{(index + 1).toString().padStart(2, '0')}</td>
                                    <td>
                                        <div className="task-cell">
                                            <span className="name">{task.name}</span>
                                            <span className="desc">{task.description}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="user-tag">
                                            <i className="far fa-user"></i> {task.employee}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="date-stack">
                                            <span>{task.sdate}</span>
                                            <small>to {task.edate}</small>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`status-pill ${task.status?.toLowerCase().replace(/\s+/g, '')}`}>
                                            {task.status}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`priority-level rank-${task.priority}`}>
                                            P-{task.priority}
                                        </span>
                                    </td>
                                    <td className="time-td">
                                        {new Date(task.created_at).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="empty-msg">No tasks currently assigned to this workspace.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </WorkspaceTaskContainer>
    );
}

export default WorkspaceTask;

const StatusBox = styled.div`
    padding: 40px;
    text-align: center;
    color: #64748b;
    font-family: 'Baloo 2', cursive;
    &.error { color: #ef4444; }
`;

const WorkspaceTaskContainer = styled.div`
  font-family: 'Baloo 2', cursive;

  .task-sub-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 2px solid #f1f5f9;

    .text-group {
        h2 { margin: 0; font-size: 1.8rem; color: #1e293b; }
        p { margin: 5px 0 0; color: #94a3b8; font-size: 0.95rem; }
    }
  }

  .assignTaskWorkspace {
    background-color: #1e293b;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 12px;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 10px;
    transition: all 0.2s ease;
    font-family: inherit;

    &:hover {
        background-color: #334155;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
  }

  .pmthirdDiv {
    background: white;
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid #e2e8f0;
    
    table {
      width: 100%;
      border-collapse: collapse;
      
      thead {
        background-color: #f8fafc;
        tr th {
            padding: 15px 20px;
            text-align: left;
            color: #475569;
            font-size: 0.85rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            border-bottom: 2px solid #e2e8f0;
        }
      }

      tbody tr {
        transition: background 0.2s;
        &:hover { background-color: #f1f5f9; }
        
        td {
            padding: 15px 20px;
            border-bottom: 1px solid #f1f5f9;
            color: #1e293b;
            vertical-align: middle;
        }
      }
    }
  }

  .task-cell {
    display: flex;
    flex-direction: column;
    .name { font-weight: 800; color: #0f172a; }
    .desc { font-size: 0.8rem; color: #64748b; max-width: 250px; }
  }

  .user-tag {
    font-size: 0.9rem;
    font-weight: 600;
    color: #3b82f6;
    background: #eff6ff;
    padding: 4px 10px;
    border-radius: 8px;
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  .date-stack {
    display: flex;
    flex-direction: column;
    font-size: 0.85rem;
    color: #475569;
    small { color: #94a3b8; }
  }

  .status-pill {
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 800;
    text-transform: uppercase;
    background: #f1f5f9;
    &.completed { background: #dcfce7; color: #15803d; }
    &.inprogress { background: #fef9c3; color: #a16207; }
    &.notstarted { background: #fee2e2; color: #b91c1c; }
  }

  .priority-level {
    font-weight: 800;
    font-size: 0.8rem;
    &.rank-10, &.rank-9 { color: #ef4444; }
    &.rank-1, &.rank-2 { color: #22c55e; }
  }

  .empty-msg {
    text-align: center;
    padding: 50px !important;
    color: #94a3b8;
    font-style: italic;
  }

  @media (max-width: 900px) {
    .pmthirdDiv { overflow-x: auto; }
    .task-sub-header { flex-direction: column; align-items: flex-start; gap: 15px; }
  }
`;