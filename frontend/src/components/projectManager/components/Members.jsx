import React from "react";
import styled from 'styled-components';
import useFetch from "../../../hooks/useFetch";

function PmMembers() {
  const { data, loading, error } = useFetch("http://localhost:8000/api/allUsers");

  if (loading) return <StatusBox>Retrieving team directory...</StatusBox>;
  if (error) return <StatusBox className="error">Error loading members: {error}</StatusBox>;

  return (
    <MembersContainer>
      <div className="members-header">
        <div className="title-section">
          <h1>Team Members</h1>
          <p>Manage and view all personnel assigned to the Tasksphere ecosystem.</p>
        </div>
        <div className="stats-mini">
          <div className="stat">
            <span className="count">{data?.data?.length || 0}</span>
            <span className="label">Total Staff</span>
          </div>
        </div>
      </div>

      <div className="members-grid">
        {data?.data?.length > 0 ? (
          data.data.map((employee, index) => (
            <div className="member-card" key={employee.id || index}>
              <div className="card-index">#{index + 1}</div>
              
              <div className="member-info">
                <div className="avatar-wrap">
                  <img 
                    src={`https://i.pravatar.cc/150?u=${employee.id}`} 
                    alt="Profile" 
                  />
                  <div className="status-indicator online"></div>
                </div>
                
                <div className="details">
                  <h3>{employee.fname} {employee.lname}</h3>
                  <span className="role-tag">{employee.role || 'Team Member'}</span>
                </div>
              </div>

              <div className="member-contact">
                <div className="info-item">
                  <i className="fas fa-envelope"></i>
                  <span>{employee.email || `${employee.fname.toLowerCase()}@tasksphere.com`}</span>
                </div>
              </div>

              <div className="card-actions">
                <button className="view-btn">View Profile</button>
                <button className="msg-btn"><i className="fas fa-comment-alt"></i></button>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">No employees found in the database.</div>
        )}
      </div>
    </MembersContainer>
  );
}

export default PmMembers;

const StatusBox = styled.div`
  text-align: center;
  padding: 100px;
  font-family: 'Baloo 2', cursive;
  color: #64748b;
  &.error { color: #ef4444; }
`;

const MembersContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  font-family: 'Baloo 2', cursive;

  .members-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 40px;
    
    h1 {
      font-size: 2.8rem;
      color: #0f172a;
      margin: 0;
      line-height: 1.2;
    }
    
    p {
      color: #64748b;
      font-size: 1.1rem;
      margin: 5px 0 0;
    }

    .stats-mini {
      background: white;
      padding: 15px 25px;
      border-radius: 15px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.03);
      text-align: center;
      
      .count {
        display: block;
        font-size: 1.5rem;
        font-weight: 800;
        color: #3b82f6;
      }
      .label {
        font-size: 0.8rem;
        text-transform: uppercase;
        color: #94a3b8;
        letter-spacing: 1px;
      }
    }
  }

  .members-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 25px;
  }

  .member-card {
    background: white;
    border-radius: 24px;
    padding: 30px;
    position: relative;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.03);
    border: 1px solid #f1f5f9;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.06);
      border-color: #dbeafe;
    }

    .card-index {
      position: absolute;
      top: 20px;
      right: 20px;
      color: #e2e8f0;
      font-weight: 800;
      font-size: 1.2rem;
    }

    .member-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      margin-bottom: 20px;

      .avatar-wrap {
        position: relative;
        margin-bottom: 15px;
        
        img {
          width: 85px;
          height: 85px;
          border-radius: 22px;
          object-fit: cover;
          border: 3px solid #f8fafc;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }

        .status-indicator {
          position: absolute;
          bottom: -5px;
          right: -5px;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          border: 3px solid white;
          &.online { background: #22c55e; }
        }
      }

      h3 {
        margin: 0;
        font-size: 1.3rem;
        color: #1e293b;
        font-weight: 800;
      }

      .role-tag {
        display: inline-block;
        margin-top: 5px;
        padding: 2px 12px;
        background: #eff6ff;
        color: #3b82f6;
        border-radius: 20px;
        font-size: 0.85rem;
        font-weight: 700;
        text-transform: uppercase;
      }
    }

    .member-contact {
      border-top: 1px solid #f1f5f9;
      padding: 15px 0;
      
      .info-item {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        color: #64748b;
        font-size: 0.95rem;
        i { color: #94a3b8; }
      }
    }

    .card-actions {
      display: flex;
      gap: 10px;
      margin-top: 10px;

      button {
        border: none;
        border-radius: 12px;
        cursor: pointer;
        transition: 0.2s;
        font-family: inherit;
        font-weight: 700;
      }

      .view-btn {
        flex: 1;
        padding: 10px;
        background: #f1f5f9;
        color: #475569;
        &:hover { background: #e2e8f0; }
      }

      .msg-btn {
        width: 44px;
        background: #3b82f6;
        color: white;
        &:hover { background: #2563eb; }
      }
    }
  }

  .empty-state {
    grid-column: 1 / -1;
    text-align: center;
    padding: 60px;
    color: #94a3b8;
    background: #f8fafc;
    border-radius: 20px;
    border: 2px dashed #e2e8f0;
  }
`;