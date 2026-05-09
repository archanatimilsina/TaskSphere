import React from "react";
import styled from 'styled-components';
import useFetch from "../../hooks/useFetch";

export default function UserWorkspaceTask({ id }) {
    const workspaceId = id;
    const { data, loading, error } = useFetch(`/api/workspaceTask/${workspaceId}`);

    if (loading) return <StatusMessage>Loading workspace tasks...</StatusMessage>;
    if (error) return <StatusMessage error>Error loading tasks: {error}</StatusMessage>;

    return (
        <UserWorkspaceTaskContainer>
            <div className="header-flex">
                <h1 id="userWorkspaceHeading">Tasks</h1>
                <button className="userWorkspaceAssignTaskBtn">
                    <i className="fas fa-plus"></i> Assign Task
                </button>
            </div>

            <div className="userWorkspaceTableWrapper">
                <table className="userWorkspaceTable">
                    <thead className="userWorkspaceTableHead">
                        <tr>
                            <th>S.N</th>
                            <th>Task Name</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Status</th>
                            <th>Priority</th>
                        </tr>
                    </thead>
                    <tbody id="userWorkspaceTableBody">
                        {data?.data?.length > 0 ? (
                            data.data.map((task, index) => (
                                <tr key={task.id || index} className="userWorkspaceTableRow">
                                    <td className="index-col">{index + 1}</td>
                                    <td className="name-col"><strong>{task.name}</strong></td>
                                    <td className="desc-col">{task.description}</td>
                                    <td>
                                        <div className="date-range">
                                            <span>{task.sdate}</span>
                                            <small>to</small>
                                            <span>{task.edate}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <Badge className={`status-${task.status?.toLowerCase()}`}>
                                            {task.status}
                                        </Badge>
                                    </td>
                                    <td>
                                        <Badge className={`priority-${task.priority?.toLowerCase()}`}>
                                            {task.priority}
                                        </Badge>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                                    No tasks found for this workspace.
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
  padding: 40px;
  text-align: center;
  font-size: 1.2rem;
  color: ${props => props.error ? '#ef4444' : '#64748b'};
`;

const Badge = styled.span`
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: capitalize;
  display: inline-block;

  &.status-completed { background: #dcfce7; color: #166534; }
  &.status-pending { background: #fef2f2; color: #991b1b; }
  &.status-inprogress { background: #eff6ff; color: #1e40af; }

  &.priority-high { background: #fee2e2; color: #b91c1c; border: 1px solid #fecaca; }
  &.priority-medium { background: #fef3c7; color: #92400e; border: 1px solid #fde68a; }
  &.priority-low { background: #f1f5f9; color: #475569; border: 1px solid #e2e8f0; }
`;

const UserWorkspaceTaskContainer = styled.div`
  padding: 20px;
  background: white;
  min-height: 100%;

  .header-flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
    border-bottom: 2px solid #f1f5f9;
    padding-bottom: 10px;
  }

  #userWorkspaceHeading {
    font-size: 1.8rem;
    color: #1e293b;
    margin: 0;
    font-weight: 700;
  }

  .userWorkspaceAssignTaskBtn {
    padding: 10px 20px;
    border-radius: 8px;
    font-size: 0.95rem;
    background-color: #1e293b;
    color: white;
    border: none;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 8px;

    &:hover {
      background-color: #334155;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
  }

  .userWorkspaceTableWrapper {
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    overflow: hidden;
    background: white;
  }

  .userWorkspaceTable {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
  }

  .userWorkspaceTableHead {
    background-color: #f8fafc;
    border-bottom: 2px solid #e2e8f0;

    th {
      padding: 16px;
      color: #475569;
      font-size: 0.85rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
  }

  .userWorkspaceTableRow {
    border-bottom: 1px solid #f1f5f9;
    transition: background 0.2s;

    &:hover {
      background-color: #f8fafc;
    }

    td {
      padding: 16px;
      color: #334155;
      font-size: 0.95rem;
      vertical-align: middle;
    }
  }

  .index-col { font-weight: bold; color: #94a3b8; width: 50px; }
  .name-col { min-width: 200px; color: #1e293b; }
  .desc-col { max-width: 300px; color: #64748b; font-size: 0.9rem; line-height: 1.4; }

  .date-range {
    display: flex;
    flex-direction: column;
    font-size: 0.85rem;
    
    small {
      color: #94a3b8;
      margin: 2px 0;
      font-style: italic;
    }
  }

  @media screen and (max-width: 1024px) {
    .userWorkspaceTableWrapper {
      overflow-x: auto;
    }
  }

  @media screen and (max-width: 768px) {
    #userWorkspaceHeading {
      font-size: 1.5rem;
    }
    
    .header-flex {
      flex-direction: column;
      align-items: flex-start;
      gap: 15px;
    }

    .userWorkspaceAssignTaskBtn {
      width: 100%;
      justify-content: center;
    }
  }
`;