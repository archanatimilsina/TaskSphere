import React from "react";
import styled from 'styled-components';
import useFetch from "../../../hooks/useFetch";

export default function UserWorkspaceTask({ id }) {
    const workspaceId = id;
    const { data, loading, error } = useFetch(`http://localhost:8000/api/workspaceTask/${workspaceId}`);

    if (loading) return <StatusMessage>Synchronizing workspace task queue...</StatusMessage>;
    if (error) return <StatusMessage error>System Error: Unable to synchronize tasks. ({error})</StatusMessage>;

    return (
        <UserWorkspaceTaskContainer>
            <header className="module-header">
                <div className="title-area">
                    <h1 id="userWorkspaceHeading">Operational Tasks</h1>
                    <p className="task-count">{data?.data?.length || 0} Assignments Active</p>
                </div>
                <button className="userWorkspaceAssignTaskBtn">
                    <i className="fa-solid fa-plus-circle"></i>
                    <span>Initialize New Task</span>
                </button>
            </header>

            <div className="table-viewport">
                <table className="task-grid">
                    <thead>
                        <tr>
                            <th className="id-th">REF</th>
                            <th className="identity-th">Task Identity</th>
                            <th className="details-th">Operational Details</th>
                            <th className="timeline-th">Timeline</th>
                            <th>Status</th>
                            <th>Priority</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.data?.length > 0 ? (
                            data.data.map((task, index) => (
                                <tr key={task.id || index}>
                                    <td className="index-col">
                                        {(index + 1).toString().padStart(2, '0')}
                                    </td>
                                    <td className="name-col">
                                        <div className="name-wrapper">
                                            <strong>{task.name}</strong>
                                            <small>ID: #{task.id}</small>
                                        </div>
                                    </td>
                                    <td className="desc-col">
                                        <p>{task.description || "No description provided for this assignment."}</p>
                                    </td>
                                    <td className="date-col">
                                        <div className="timeline-capsule">
                                            <span className="date-pill start">{task.sdate}</span>
                                            <i className="fa-solid fa-chevron-right"></i>
                                            <span className="date-pill end">{task.edate}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <StatusBadge className={task.status?.toLowerCase().replace(/\s+/g, '-')}>
                                            {task.status}
                                        </StatusBadge>
                                    </td>
                                    <td>
                                        <PriorityBadge className={task.priority?.toLowerCase()}>
                                            <i className="fa-solid fa-bolt-lightning"></i>
                                            {task.priority}
                                        </PriorityBadge>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="empty-viewport">
                                    <div className="empty-message">
                                        <i className="fa-solid fa-folder-open"></i>
                                        <p>No active tasks detected in this workspace nexus.</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </UserWorkspaceTaskContainer>
    );
}

const StatusMessage = styled.div`
  padding: 80px;
  text-align: center;
  font-family: 'Baloo 2', cursive;
  font-size: 1.3rem;
  color: ${props => props.error ? '#ef4444' : '#94a3b8'};
`;

const StatusBadge = styled.span`
  padding: 6px 14px;
  border-radius: 10px;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: inline-block;

  &.completed { background: #f0fdf4; color: #10b981; }
  &.ongoing, &.in-progress { background: #eff6ff; color: #3b82f6; }
  &.pending, &.not-started { background: #f1f5f9; color: #64748b; }
`;

const PriorityBadge = styled.span`
  padding: 6px 12px;
  border-radius: 10px;
  font-size: 0.75rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 6px;
  width: fit-content;

  i { font-size: 0.7rem; }

  &.high { color: #ef4444; background: #fef2f2; }
  &.medium { color: #f59e0b; background: #fffbeb; }
  &.low { color: #10b981; background: #f0fdf4; }
`;

const UserWorkspaceTaskContainer = styled.div`
  background: white;
  font-family: 'Baloo 2', cursive;

  .module-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 35px;
    padding-bottom: 20px;
    border-bottom: 2px solid #f8fafc;
  }

  .title-area {
    h1 { font-size: 2.2rem; color: #1e293b; margin: 0; }
    .task-count { color: #94a3b8; font-size: 1.1rem; margin-top: 2px; font-weight: 600; }
  }

  .userWorkspaceAssignTaskBtn {
    padding: 14px 28px;
    border-radius: 16px;
    background: #1e293b;
    color: white;
    border: none;
    font-family: inherit;
    font-weight: 800;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 12px;
    transition: 0.3s;
    
    &:hover {
      background: #0f172a;
      transform: translateY(-2px);
      box-shadow: 0 12px 24px -6px rgba(0,0,0,0.2);
    }
  }

  .table-viewport {
    background: #ffffff;
    border-radius: 24px;
    border: 1px solid #f1f5f9;
    overflow: hidden;
  }

  .task-grid {
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
    }

    td {
      padding: 20px;
      border-bottom: 1px solid #f8fafc;
      vertical-align: middle;
    }

    .index-col { font-weight: 800; color: #cbd5e1; font-size: 0.9rem; }
    
    .name-col {
        .name-wrapper {
            display: flex;
            flex-direction: column;
            strong { font-size: 1.1rem; color: #1e293b; }
            small { color: #94a3b8; font-weight: 800; font-size: 0.75rem; }
        }
    }

    .desc-col {
        p { margin: 0; font-size: 0.95rem; color: #64748b; max-width: 320px; line-height: 1.5; }
    }

    .date-col {
        .timeline-capsule {
            display: flex;
            align-items: center;
            gap: 10px;
            i { font-size: 0.7rem; color: #cbd5e1; }
            .date-pill {
                font-size: 0.85rem;
                font-weight: 700;
                color: #475569;
                background: #f1f5f9;
                padding: 4px 10px;
                border-radius: 8px;
            }
        }
    }

    .empty-viewport {
        padding: 80px 0;
        text-align: center;
        .empty-message {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 15px;
            color: #cbd5e1;
            i { font-size: 3.5rem; }
            p { font-size: 1.2rem; font-weight: 600; margin: 0; }
        }
    }
  }

  @media (max-width: 1100px) {
    .table-viewport { overflow-x: auto; }
    .task-grid { min-width: 900px; }
  }

  @media (max-width: 768px) {
    .module-header { flex-direction: column; align-items: flex-start; gap: 20px; }
    .userWorkspaceAssignTaskBtn { width: 100%; justify-content: center; }
  }
`;