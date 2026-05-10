import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import styled from 'styled-components';

function AdminNoticeDash() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Safely extract noticeId from state
  const noticeId = location.state?.noticeId;
  const { data: notice, loading, error } = useFetch(`http://localhost:8000/api/singleNotice/${noticeId}`);

  if (!noticeId) {
    return <StatusBox className="error">No notice selected. Please return to the Notice Board.</StatusBox>;
  }

  if (loading) return <StatusBox>Loading notice details...</StatusBox>;
  if (error) return <StatusBox className="error">Error: {error}</StatusBox>;

  const noticeData = notice?.data;

  return (
    <NoticeDashContainer>
      <div className="top-nav">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <i className="fas fa-arrow-left"></i> Back to Board
        </button>
      </div>

      <div className="notice-card">
        <header className="notice-header">
          <div className="badge">Official Announcement</div>
          <h1>{noticeData?.noticeHead}</h1>
          <div className="meta-info">
            <span><i className="far fa-calendar-alt"></i> Published: {new Date(noticeData?.created_at).toLocaleDateString()}</span>
            <span><i className="far fa-clock"></i> {new Date(noticeData?.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </header>

        <hr className="divider" />

        <div className="notice-content">
          <div className="text-section">
            <p>{noticeData?.noticeDescription}</p>
          </div>

          {noticeData?.image && (
            <div className="image-section">
              <img 
                className="notice-image" 
                src={noticeData.image} 
                alt={noticeData.noticeHead} 
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
          )}
        </div>
        
        <footer className="notice-footer">
          <p>This is a system-generated notice from the Tasksphere Administration.</p>
        </footer>
      </div>
    </NoticeDashContainer>
  );
}

export default AdminNoticeDash;

const StatusBox = styled.div`
  text-align: center;
  padding: 100px;
  font-family: 'Baloo 2', cursive;
  font-size: 1.2rem;
  color: #64748b;
  &.error { color: #ef4444; }
`;

const NoticeDashContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  font-family: 'Baloo 2', cursive;

  .top-nav {
    margin-bottom: 20px;
    
    .back-btn {
      background: none;
      border: none;
      color: #3b82f6;
      font-size: 1.1rem;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: color 0.2s;

      &:hover {
        color: #1d4ed8;
      }
    }
  }

  .notice-card {
    background-color: #ffffff;
    border-radius: 24px;
    padding: 50px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
    border: 1px solid #f1f5f9;
  }

  .notice-header {
    text-align: center;

    .badge {
      display: inline-block;
      padding: 4px 16px;
      background: #eff6ff;
      color: #3b82f6;
      border-radius: 20px;
      font-weight: 700;
      font-size: 0.9rem;
      margin-bottom: 15px;
    }

    h1 {
      font-size: 2.5rem;
      color: #0f172a;
      margin-bottom: 15px;
      line-height: 1.2;
    }

    .meta-info {
      display: flex;
      justify-content: center;
      gap: 25px;
      color: #94a3b8;
      font-size: 1rem;
      
      span {
        display: flex;
        align-items: center;
        gap: 6px;
      }
    }
  }

  .divider {
    border: 0;
    height: 1px;
    background: #f1f5f9;
    margin: 40px 0;
  }

  .notice-content {
    .text-section {
      font-size: 1.2rem;
      color: #334155;
      line-height: 1.8;
      margin-bottom: 30px;
      white-space: pre-wrap; /* Preserves line breaks from the database */
    }

    .image-section {
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      
      .notice-image {
        width: 100%;
        height: auto;
        display: block;
        transition: transform 0.3s ease;
        
        &:hover {
          transform: scale(1.02);
        }
      }
    }
  }

  .notice-footer {
    margin-top: 50px;
    padding-top: 20px;
    border-top: 1px solid #f8fafc;
    text-align: center;
    
    p {
      color: #cbd5e1;
      font-size: 0.9rem;
      font-style: italic;
    }
  }

  @media (max-width: 768px) {
    .notice-card {
      padding: 30px 20px;
    }
    
    .notice-header h1 {
      font-size: 1.8rem;
    }
  }
`;