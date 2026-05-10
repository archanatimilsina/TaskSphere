import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import useFetch from "../../../hooks/useFetch";

function UserNoticeDash() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const noticeId = location.state?.noticeId;
  const { data: noticeData, loading, error } = useFetch(noticeId ? `http://localhost:8000/api/singleNotice/${noticeId}` : null);

  if (!noticeId) return <StatusBox>No Notice reference found. Please select an announcement from the board.</StatusBox>;
  if (loading) return <StatusBox>Decoding announcement details...</StatusBox>;
  if (error) return <StatusBox className="error">Synchronization failed: {error}</StatusBox>;

  const notice = noticeData?.data;

  return (
    <NoticeDashContainer>
      <div className="content-wrapper">
        <header className="action-bar">
          <button className="back-link" onClick={() => navigate(-1)}>
            <i className="fa-solid fa-chevron-left"></i> Return to Board
          </button>
          <div className="right-actions">
             <button className="icon-action" onClick={() => window.print()} title="Print Notice">
                <i className="fa-solid fa-print"></i>
             </button>
             <button className="icon-action" title="Share Content">
                <i className="fa-solid fa-share-nodes"></i>
             </button>
          </div>
        </header>

        <article className="notice-document">
          <div className="document-header">
            <span className="official-tag">Official Communication</span>
            <h1>{notice?.noticeHead}</h1>
            <div className="meta-strip">
              <div className="meta-item">
                <i className="far fa-calendar-check"></i>
                <span>Published: {new Date(notice?.created_at).toLocaleDateString(undefined, { dateStyle: 'long' })}</span>
              </div>
              <div className="meta-item">
                <i className="far fa-clock"></i>
                <span>{new Date(notice?.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>
          </div>

          {notice?.image && (
            <figure className="notice-figure">
              <img 
                src={notice.image} 
                alt="Accompanying announcement media" 
              />
              <figcaption>Official Attachment Ref #NC-{noticeId}</figcaption>
            </figure>
          )}

          <section className="notice-body">
            <p>{notice?.noticeDescription}</p>
          </section>

          <footer className="document-footer">
            <div className="seal">
                <i className="fas fa-shield-halved"></i>
                <span>Verified by Tasksphere Administration</span>
            </div>
          </footer>
        </article>
      </div>
    </NoticeDashContainer>
  );
}

export default UserNoticeDash;

const StatusBox = styled.div`
  text-align: center;
  padding: 100px;
  font-family: 'Baloo 2', cursive;
  color: #64748b;
  &.error { color: #ef4444; }
`;

const NoticeDashContainer = styled.div`
  min-height: 100%;
  padding: 30px;
  font-family: 'Baloo 2', cursive;

  .content-wrapper {
    max-width: 900px;
    margin: 0 auto;
  }

  .action-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;

    .back-link {
      background: none;
      border: none;
      color: #94a3b8;
      font-weight: 800;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: 0.2s;
      font-family: inherit;
      &:hover { color: #10b981; transform: translateX(-5px); }
    }

    .right-actions {
        display: flex;
        gap: 12px;
    }

    .icon-action {
        width: 38px;
        height: 38px;
        border-radius: 10px;
        border: 1px solid #e2e8f0;
        background: white;
        color: #64748b;
        cursor: pointer;
        transition: 0.2s;
        &:hover { background: #f8fafc; color: #10b981; border-color: #10b981; }
    }
  }

  .notice-document {
    background: white;
    border-radius: 24px;
    padding: 60px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.02);
    border: 1px solid #f1f5f9;
  }

  .document-header {
    margin-bottom: 40px;
    
    .official-tag {
        color: #10b981;
        background: #f0fdf4;
        padding: 5px 14px;
        border-radius: 8px;
        font-size: 0.8rem;
        font-weight: 900;
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    h1 {
        font-size: 2.8rem;
        color: #0f172a;
        margin: 20px 0;
        line-height: 1.1;
    }

    .meta-strip {
        display: flex;
        gap: 25px;
        border-top: 1px solid #f1f5f9;
        padding-top: 20px;

        .meta-item {
            display: flex;
            align-items: center;
            gap: 8px;
            color: #94a3b8;
            font-size: 0.95rem;
            i { color: #cbd5e1; }
        }
    }
  }

  .notice-figure {
    margin: 0 0 40px;
    img {
        width: 100%;
        border-radius: 18px;
        box-shadow: 0 15px 30px rgba(0,0,0,0.05);
    }
    figcaption {
        margin-top: 15px;
        text-align: right;
        color: #cbd5e1;
        font-size: 0.8rem;
        font-weight: 700;
    }
  }

  .notice-body {
    p {
        font-size: 1.25rem;
        color: #334155;
        line-height: 1.8;
        white-space: pre-wrap;
    }
  }

  .document-footer {
    margin-top: 60px;
    padding-top: 30px;
    border-top: 2px dashed #f1f5f9;
    
    .seal {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        color: #cbd5e1;
        font-size: 0.9rem;
        i { font-size: 1.2rem; color: #f1f5f9; }
    }
  }

  @media (max-width: 768px) {
    padding: 15px;
    .notice-document { padding: 30px; }
    .document-header h1 { font-size: 2rem; }
    .meta-strip { flex-direction: column; gap: 10px; }
  }

  @media print {
    padding: 0;
    .action-bar, .document-footer { display: none; }
    .notice-document { box-shadow: none; border: none; padding: 0; }
  }
`;