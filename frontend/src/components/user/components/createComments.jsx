import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import usePost from "../../../hooks/usePost";

export default function CommentForm() {
  const { postData, loading } = usePost();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Retrieve workspaceId from navigation state
  const workspaceId = location.state?.workspaceId;

  const [formData, setFormData] = useState({
    username: "",
    role: "",
    comment: "",
    profile: "" 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Construct the payload with context
    const payload = {
      ...formData,
      workspace_id: workspaceId,
      created_at: new Date().toISOString(),
    };

    const result = await postData("http://localhost:8000/api/postComment", payload);
    
    if (result?.status) {
      alert("Contribution broadcasted to the team.");
      // Navigate back to the dashboard to see the new comment
      navigate(-1);
    } else {
      alert("Communication failed. Please verify connection.");
    }
  };

  return (
    <CommentFormContainer>
      <div className="form-card">
        <header className="header-section">
          <div className="icon-box">
            <i className="fas fa-pen-nib"></i>
          </div>
          <h2 className="form-title">Join the Discussion</h2>
          <p className="form-subtitle">Your insights help the team move faster. Share your thoughts below.</p>
        </header>
        
        <form onSubmit={handleSubmit} className="form-content">
          <div className="input-grid">
            <div className="form-group">
              <label className="form-label">Identifier (Username)</label>
              <div className="input-wrapper">
                <i className="far fa-user"></i>
                <input
                  type="text"
                  name="username"
                  className="form-input"
                  placeholder="e.g. Archana"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Professional Role</label>
              <div className="input-wrapper">
                <i className="fas fa-briefcase"></i>
                <input
                  type="text"
                  name="role"
                  className="form-input"
                  placeholder="e.g. Lead Engineer"
                  value={formData.role}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Avatar URL <small>(Optional)</small></label>
            <div className="input-wrapper">
              <i className="far fa-image"></i>
              <input
                type="text"
                name="profile"
                className="form-input"
                value={formData.profile}
                onChange={handleChange}
                placeholder="https://example.com/your-photo.jpg"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Message Content</label>
            <textarea
              name="comment"
              className="form-input text-area"
              value={formData.comment}
              onChange={handleChange}
              rows={5}
              placeholder="Provide constructive feedback or ask a clarifying question..."
              required
            />
          </div>

          <div className="form-button-wrapper">
            <button type="submit" className="form-button" disabled={loading}>
              {loading ? "Transmitting..." : "Post to Thread"}
            </button>
            <button type="button" className="cancel-btn" onClick={() => navigate(-1)}>
              Discard
            </button>
          </div>
        </form>
      </div>
    </CommentFormContainer>
  );
}

const CommentFormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px 20px;
  background-color: #f8fafc;
  min-height: 100vh;
  font-family: 'Baloo 2', cursive;

  .form-card {
    background: white;
    width: 100%;
    max-width: 650px;
    padding: 50px;
    border-radius: 30px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.04);
    border: 1px solid #f1f5f9;
  }

  .header-section {
    text-align: center;
    margin-bottom: 40px;

    .icon-box {
        width: 60px;
        height: 60px;
        background: #f0fdf4;
        color: #10b981;
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        margin: 0 auto 20px;
    }

    .form-title {
        font-size: 2.2rem;
        color: #0f172a;
        margin: 0;
    }

    .form-subtitle {
        color: #64748b;
        margin-top: 10px;
        font-size: 1.05rem;
        line-height: 1.5;
    }
  }

  .input-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 25px;
    margin-bottom: 25px;

    @media (max-width: 600px) {
      grid-template-columns: 1fr;
    }
  }

  .form-group {
    margin-bottom: 25px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .form-label {
    font-weight: 700;
    color: #334155;
    font-size: 0.95rem;
    small { font-weight: 400; color: #94a3b8; }
  }

  .input-wrapper {
    position: relative;
    i {
        position: absolute;
        left: 16px;
        top: 50%;
        transform: translateY(-50%);
        color: #94a3b8;
    }
    .form-input {
        padding-left: 45px;
    }
  }

  .form-input {
    width: 100%;
    padding: 14px 16px;
    border: 2px solid #f1f5f9;
    border-radius: 14px;
    font-size: 1rem;
    background: #f8fafc;
    font-family: inherit;
    transition: all 0.2s ease;

    &:focus {
      outline: none;
      border-color: #10b981;
      background-color: white;
      box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.05);
    }
  }

  .text-area {
    resize: none;
    min-height: 140px;
  }

  .form-button-wrapper {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .form-button {
    width: 100%;
    padding: 16px;
    background-color: #10b981;
    color: white;
    border: none;
    border-radius: 16px;
    font-size: 1.2rem;
    font-weight: 800;
    cursor: pointer;
    transition: 0.3s;
    box-shadow: 0 10px 20px rgba(16, 185, 129, 0.15);

    &:hover:not(:disabled) {
      background-color: #059669;
      transform: translateY(-2px);
    }
    
    &:disabled {
        background-color: #cbd5e1;
        cursor: not-allowed;
    }
  }

  .cancel-btn {
    background: transparent;
    border: none;
    color: #94a3b8;
    font-weight: 700;
    font-family: inherit;
    cursor: pointer;
    &:hover { color: #64748b; }
  }
`;