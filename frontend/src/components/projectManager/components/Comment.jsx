import React from "react";
import styled from 'styled-components';
import useFetch from "../../../hooks/useFetch";

function PmComment({ id }) {
  // Using the passed workspace/project ID for fetching discussions
  const { data: commentsData, loading, error } = useFetch(`/api/projectIndex/${id || 7}`);

  if (loading) return <StatusBox>Loading discussions...</StatusBox>;
  if (error) return <StatusBox className="error">Error loading forum: {error}</StatusBox>;

  const comments = commentsData?.data || [];

  return (
    <CommentContainer>
      <div className="forum-header">
        <div className="title-area">
          <h1>Discussion Forum</h1>
          <p>Collaborate with your team on this workspace</p>
        </div>
        <button className="post-comment-btn">
          <i className="fas fa-plus"></i> New Post
        </button>
      </div>

      <div className="comments-feed">
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <div className="comment-card" key={comment.id || index}>
              <div className="comment-head">
                <img 
                  src={comment.user_image || `https://i.pravatar.cc/150?u=${comment.user_name}`} 
                  alt="User" 
                  className="profile-img" 
                />
                <div className="user-meta">
                  <span className="user-name">{comment.user_name || "Team Member"}</span>
                  <span className="user-role">{comment.user_role || "Contributor"}</span>
                </div>
                <div className="comment-time">
                  {comment.created_at || "Just now"}
                </div>
              </div>

              <div className="comment-body">
                <p>{comment.content || "No content provided."}</p>
              </div>
              
              <div className="comment-footer">
                <button className="footer-action"><i className="far fa-thumbs-up"></i> Like</button>
                <button className="footer-action"><i className="far fa-comment"></i> Reply</button>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-forum">
            <i className="far fa-comments"></i>
            <p>No discussions yet. Be the first to start the conversation!</p>
          </div>
        )}
      </div>
    </CommentContainer>
  );
}

export default PmComment;

const StatusBox = styled.div`
  text-align: center;
  padding: 50px;
  font-family: 'Baloo 2', cursive;
  color: #64748b;
  &.error { color: #ef4444; }
`;

const CommentContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Baloo 2', cursive;

  .forum-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
    padding-bottom: 20px;
    border-bottom: 2px solid #f1f5f9;

    .title-area {
      h1 {
        font-size: 2.2rem;
        color: #0f172a;
        margin: 0;
      }
      p {
        color: #94a3b8;
        margin: 5px 0 0;
      }
    }

    .post-comment-btn {
      background: #3b82f6;
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 12px;
      font-weight: 700;
      font-size: 1rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.2s;
      font-family: inherit;

      &:hover {
        background: #2563eb;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
      }
    }
  }

  .comment-card {
    background: white;
    border-radius: 18px;
    padding: 25px;
    margin-bottom: 25px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
    border: 1px solid #f1f5f9;
    transition: transform 0.2s;

    &:hover {
      border-color: #e2e8f0;
    }

    .comment-head {
      display: flex;
      align-items: center;
      gap: 15px;
      margin-bottom: 15px;

      .profile-img {
        width: 48px;
        height: 48px;
        border-radius: 12px;
        object-fit: cover;
      }

      .user-meta {
        display: flex;
        flex-direction: column;
        flex: 1;

        .user-name {
          font-weight: 800;
          color: #1e293b;
          font-size: 1.1rem;
        }

        .user-role {
          font-size: 0.85rem;
          color: #3b82f6;
          font-weight: 700;
          text-transform: uppercase;
        }
      }

      .comment-time {
        font-size: 0.85rem;
        color: #94a3b8;
      }
    }

    .comment-body {
      color: #475569;
      line-height: 1.7;
      font-size: 1.1rem;
      padding-left: 63px; /* Align with text, not the image */
      max-height: 400px;
      overflow-y: auto;

      p { margin: 0; white-space: pre-wrap; }

      &::-webkit-scrollbar { width: 5px; }
      &::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
    }

    .comment-footer {
      margin-top: 20px;
      padding-top: 15px;
      border-top: 1px solid #f8fafc;
      padding-left: 63px;
      display: flex;
      gap: 20px;

      .footer-action {
        background: none;
        border: none;
        color: #64748b;
        font-weight: 700;
        cursor: pointer;
        font-size: 0.9rem;
        display: flex;
        align-items: center;
        gap: 6px;
        font-family: inherit;

        &:hover { color: #3b82f6; }
      }
    }
  }

  .empty-forum {
    text-align: center;
    padding: 60px;
    background: #f8fafc;
    border-radius: 24px;
    border: 2px dashed #e2e8f0;
    color: #94a3b8;

    i { font-size: 3rem; margin-bottom: 15px; }
    p { font-size: 1.2rem; }
  }
`;