import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import styled from 'styled-components';

function PmNoticeDash() {
  const location = useLocation();
  const navigate = useNavigate();
  const noticeId = location.state?.noticeId;
  const { data: notice, loading, error } = useFetch(`http://localhost:8000/api/singleNotice/${noticeId}`);

  if (loading) return <StatusBox>Loading announcement details...</StatusBox>;
  if (error) return <StatusBox className="error">Error: {error}</StatusBox>;
  if (!notice?.data) return <StatusBox>Notice not found.</StatusBox>;

  return (
    <NoticeDashContainer>
      <div className="top-nav">
        <button onClick={() => navigate(-1)} className="back-btn">
          <i className="fas fa-arrow-left"></i> Back to Board
        </button>
      </div>

      <article className="notice-card">
        <header className="notice-header">
          <div className="meta-info">
            <span className="category">Official Announcement</span>
            <span className="dot">•</span>
            <span className="notice-date">
              <i className="far fa-calendar-alt"></i> {new Date(notice.data.created_at).toLocaleDateString()}
            </span>
          </div>
          <h1>{notice.data.noticeHead}</h1>
          <div className="author-bar">
            <img src="https://i.pravatar.cc/100?u=admin" alt="Admin" />
            <div className="author-details">
              <strong>Tasksphere Administration</strong>
              <span>Project Management Office</span>
            </div>
          </div>
        </header>

        <section className="notice-content">
          <div className="description-text">
            {notice.data.noticeDescription.split('\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {notice.data.image && (
            <div className="image-container">
              <img 
                className="notice-image" 
                src={notice.data.image} 
                alt="Announcement Attachment" 
                onError={(e) => e.target.style.display = 'none'}
              />
              <span className="image-caption">Attached Document / Reference Image</span>
            </div>
          )}
        </section>

        <footer className="notice-footer">
          <p>This is a system-generated notice. Please contact the PMO for further clarifications.</p>
        </footer>
      </article>
    </NoticeDashContainer>
  );
}

export default PmNoticeDash;

const StatusBox = styled.div`
  text-align: center;
  padding: 100px;
  font-family: 'Baloo 2', cursive;
  color: #64748b;
  &.error { color: #ef4444; }
`;

const NoticeDashContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: 'Baloo 2', cursive;

  .top-nav {
    margin-bottom: 25px;
    .back-btn {
      background: none;
      border: none;
      color: #3b82f6;
      font-weight: 700;
      font-size: 1.1rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 0;
      &:hover { color: #2563eb; }
    }
  }

  .notice-card {
    background: white;
    border-radius: 24px;
    padding: 50px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
    border: 1px solid #f1f5f9;
  }

  .notice-header {
    margin-bottom: 40px;
    border-bottom: 2px solid #f8fafc;
    padding-bottom: 30px;

    .meta-info {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 15px;
      
      .category {
        color: #3b82f6;
        font-weight: 800;
        text-transform: uppercase;
        font-size: 0.85rem;
        letter-spacing: 1px;
      }
      .dot { color: #cbd5e1; }
      .notice-date { color: #94a3b8; font-size: 0.95rem; }
    }

    h1 {
      font-size: 2.8rem;
      color: #0f172a;
      margin: 0 0 25px 0;
      line-height: 1.2;
    }

    .author-bar {
      display: flex;
      align-items: center;
      gap: 15px;
      
      img {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        object-fit: cover;
      }

      .author-details {
        display: flex;
        flex-direction: column;
        strong { color: #1e293b; font-size: 1rem; }
        span { color: #94a3b8; font-size: 0.85rem; }
      }
    }
  }

  .notice-content {
    .description-text {
      font-size: 1.2rem;
      line-height: 1.8;
      color: #334155;
      margin-bottom: 40px;
      
      p { margin-bottom: 20px; }
    }

    .image-container {
      background: #f8fafc;
      padding: 20px;
      border-radius: 16px;
      text-align: center;

      .notice-image {
        max-width: 100%;
        height: auto;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.08);
      }

      .image-caption {
        display: block;
        margin-top: 12px;
        color: #94a3b8;
        font-size: 0.9rem;
        font-style: italic;
      }
    }
  }

  .notice-footer {
    margin-top: 50px;
    padding-top: 30px;
    border-top: 1px solid #f1f5f9;
    text-align: center;
    p {
      color: #cbd5e1;
      font-size: 0.9rem;
    }
  }
`;