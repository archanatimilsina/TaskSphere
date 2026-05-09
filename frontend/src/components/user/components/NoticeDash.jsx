import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import useFetch from "../../hooks/UseFetch";

function NoticeDash() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Safely access state in case the page is refreshed without state
  const noticeId = location.state?.noticeId;
  const { data: noticeData, loading, error } = useFetch(noticeId ? `/api/singleNotice/${noticeId}` : null);

  if (!noticeId) return <StatusMessage>Invalid Notice ID. Please return to the dashboard.</StatusMessage>;
  if (loading) return <StatusMessage>Loading notice details...</StatusMessage>;
  if (error) return <StatusMessage className="error">Error: {error}</StatusMessage>;

  const notice = noticeData?.data;

  return (
    <NoticeDashContainer>
      <div className="notice-dashboard">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <i className="fa-solid fa-arrow-left"></i> Back
        </button>

        <div className="notice-header">
          <h2>{notice?.noticeHead}</h2>
          <span className="notice-date">
            Posted on: {new Date(notice?.created_at).toLocaleDateString()}
          </span>
        </div>

        <div className="notice-content-wrapper">
          <div className="notice-description">
            <p>{notice?.noticeDescription}</p>
          </div>

          {notice?.image && (
            <div className="image-container">
              <img 
                className="notice-image" 
                src={notice.image} 
                alt="Notice attachment" 
              />
            </div>
          )}
        </div>
      </div>
    </NoticeDashContainer>
  );
}

export default NoticeDash;

const StatusMessage = styled.div`
  text-align: center;
  padding: 50px;
  font-family: 'Baloo 2', cursive;
  font-size: 1.2rem;
  &.error { color: #ef4444; }
`;

const NoticeDashContainer = styled.div`
  min-height: 100vh;
  background-color: #f1f5f9;
  padding: 40px 20px;
  font-family: 'Baloo 2', cursive;

  .notice-dashboard {
    width: 90%;
    max-width: 800px;
    margin: 0 auto;
    padding: 40px;
    background-color: #ffffff;
    border-radius: 16px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
    position: relative;
  }

  .back-btn {
    background: none;
    border: none;
    color: #64748b;
    cursor: pointer;
    font-size: 1rem;
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 20px;
    transition: color 0.2s;

    &:hover {
      color: #10b981;
    }
  }

  .notice-header {
    text-align: center;
    border-bottom: 2px solid #f1f5f9;
    padding-bottom: 20px;
    margin-bottom: 30px;
  }

  .notice-header h2 {
    font-size: 2.2rem;
    color: #1e293b;
    margin-bottom: 8px;
    line-height: 1.2;
  }

  .notice-date {
    font-size: 0.95rem;
    color: #94a3b8;
    display: block;
  }

  .notice-content-wrapper {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  .notice-description {
    font-size: 1.15rem;
    color: #334155;
    line-height: 1.8;
    white-space: pre-wrap; /* Preserves line breaks from the database */
  }

  .image-container {
    text-align: center;
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid #e2e8f0;
  }

  .notice-image {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 0 auto;
  }

  @media (max-width: 768px) {
    padding: 20px 10px;
    
    .notice-dashboard {
      padding: 20px;
      width: 100%;
    }

    .notice-header h2 {
      font-size: 1.8rem;
    }
  }
`;