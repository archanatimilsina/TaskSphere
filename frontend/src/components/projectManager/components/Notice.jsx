import React from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from "../../../hooks/useFetch";
import styled from 'styled-components';

const PmNotice = () => {
  const navigate = useNavigate();
  const { data: notices, loading, error } = useFetch("http://localhost:8000/api/allNotices");

  const handleViewClick = (id) => {
    navigate("/noticeDash", { state: { noticeId: id } });
  };

  const handleCreateNotice = () => {
    // Navigate to a notice creation form if you have one
    navigate("/createNotice");
  };

  if (loading) return <StatusBox>Syncing notice board...</StatusBox>;
  if (error) return <StatusBox className="error">Failed to load notices: {error}</StatusBox>;

  return (
    <NoticeContainer>
      <div className="notice-header">
        <div className="title-area">
          <h1>Internal Announcements</h1>
          <p>Official project updates and organizational notices</p>
        </div>
        <button className="create-btn" onClick={handleCreateNotice}>
          <i className="fas fa-plus"></i> Post New Notice
        </button>
      </div>

      <div className="table-wrapper">
        <table className="notice-table">
          <thead>
            <tr>
              <th className="sn-col">SN</th>
              <th>Notice Heading</th>
              <th>Published Date</th>
              <th>Priority</th>
              <th className="action-col">Action</th>
            </tr>
          </thead>
          <tbody>
            {notices?.data?.length > 0 ? (
              notices.data.map((item, index) => (
                <tr key={item.id}>
                  <td className="sn-col">{index + 1}</td>
                  <td className="notice-head">{item.noticeHead}</td>
                  <td className="notice-date">{item.created_at || "2026-05-10"}</td>
                  <td>
                    <span className={`priority-tag ${index === 0 ? 'high' : 'normal'}`}>
                      {index === 0 ? 'High' : 'Normal'}
                    </span>
                  </td>
                  <td className="action-col">
                    <button className="view-btn" onClick={() => handleViewClick(item.id)}>
                      <i className="fas fa-external-link-alt"></i> View Details
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="empty-state">No active notices found on the board.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </NoticeContainer>
  );
};

export default PmNotice;

const StatusBox = styled.div`
  text-align: center;
  padding: 100px;
  font-family: 'Baloo 2', cursive;
  color: #64748b;
  &.error { color: #ef4444; }
`;

const NoticeContainer = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  font-family: 'Baloo 2', cursive;

  .notice-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;

    .title-area {
      h1 {
        font-size: 2.5rem;
        color: #0f172a;
        margin: 0;
      }
      p {
        color: #64748b;
        font-size: 1.1rem;
        margin-top: 5px;
      }
    }

    .create-btn {
      background: #1e293b;
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 12px;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 10px;
      transition: all 0.2s;
      font-family: inherit;

      &:hover {
        background: #334155;
        transform: translateY(-2px);
      }
    }
  }

  .table-wrapper {
    background: white;
    border-radius: 20px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.04);
    overflow: hidden;
    border: 1px solid #f1f5f9;
  }

  .notice-table {
    width: 100%;
    border-collapse: collapse;

    th {
      background: #f8fafc;
      padding: 20px;
      text-align: left;
      color: #64748b;
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 1px;
      border-bottom: 2px solid #f1f5f9;
    }

    td {
      padding: 20px;
      border-bottom: 1px solid #f1f5f9;
      color: #334155;
      font-size: 1.1rem;
    }

    .sn-col { width: 80px; text-align: center; color: #94a3b8; }
    .action-col { width: 180px; text-align: center; }

    .notice-head {
      font-weight: 700;
      color: #1e293b;
    }

    .notice-date {
      color: #64748b;
      font-size: 1rem;
    }

    .priority-tag {
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 700;
      
      &.high { background: #fee2e2; color: #991b1b; }
      &.normal { background: #f1f5f9; color: #475569; }
    }

    .view-btn {
      padding: 8px 16px;
      background: #eff6ff;
      color: #3b82f6;
      border: 1px solid #dbeafe;
      border-radius: 8px;
      font-weight: 700;
      cursor: pointer;
      transition: 0.2s;
      font-family: inherit;

      &:hover {
        background: #3b82f6;
        color: white;
      }
    }

    .empty-state {
      text-align: center;
      padding: 50px;
      color: #94a3b8;
      font-style: italic;
    }

    tr:last-child td { border-bottom: none; }
    tr:hover td { background-color: #fcfdfe; }
  }
`;