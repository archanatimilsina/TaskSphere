import React, { useState } from 'react';
import styled from 'styled-components';
import usePost from "../../hooks/usePost";

export default function CommentForm() {
  const { postData } = usePost();

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
    const payload = {
      ...formData,
      created_at: new Date().toISOString(),
    };

    const result = await postData("/api/postComment", payload);
    if (result?.status) {
      alert("Comment posted successfully");
      setFormData({ username: "", role: "", comment: "", profile: "" });
    }
  };

  return (
    <CommentFormContainer>
      <div className="form-card">
        <h2 className="form-title">Join the Discussion</h2>
        <p className="form-subtitle">Share your thoughts or ask a question to the team.</p>
        
        <form onSubmit={handleSubmit} className="form-content">
          <div className="input-grid">
            <div className="form-group">
              <label className="form-label">Username</label>
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

            <div className="form-group">
              <label className="form-label">Role</label>
              <input
                type="text"
                name="role"
                className="form-input"
                placeholder="e.g. Developer"
                value={formData.role}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Profile Image URL (Optional)</label>
            <input
              type="text"
              name="profile"
              className="form-input"
              value={formData.profile}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Your Comment</label>
            <textarea
              name="comment"
              className="form-input"
              value={formData.comment}
              onChange={handleChange}
              rows={5}
              placeholder="Write something constructive..."
              required
            />
          </div>

          <div className="form-button-wrapper">
            <button type="submit" className="form-button">
              Post Comment
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
  padding: 40px 20px;
  background-color: #f8fafc;
  min-height: 100vh;
  font-family: 'Baloo 2', cursive;

  .form-card {
    background: white;
    width: 100%;
    max-width: 700px;
    padding: 40px;
    border-radius: 20px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  }

  .form-title {
    font-size: 2rem;
    color: #1e293b;
    text-align: center;
    margin-bottom: 5px;
  }

  .form-subtitle {
    text-align: center;
    color: #64748b;
    margin-bottom: 30px;
    font-size: 1.1rem;
  }

  .input-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;

    @media (max-width: 600px) {
      grid-template-columns: 1fr;
    }
  }

  .form-group {
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .form-label {
    font-weight: 600;
    color: #475569;
    font-size: 1rem;
  }

  .form-input {
    padding: 12px 16px;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    font-size: 1rem;
    font-family: inherit;
    transition: all 0.2s ease;

    &:focus {
      outline: none;
      border-color: #10b981;
      background-color: #f0fdf4;
    }

    &::placeholder {
      color: #cbd5e1;
    }
  }

  textarea.form-input {
    resize: vertical;
    min-height: 120px;
  }

  .form-button-wrapper {
    margin-top: 10px;
  }

  .form-button {
    width: 100%;
    padding: 14px;
    background-color: #10b981;
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 1.2rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);

    &:hover {
      background-color: #059669;
      transform: translateY(-2px);
      box-shadow: 0 6px 15px rgba(16, 185, 129, 0.3);
    }

    &:active {
      transform: translateY(0);
    }
  }
`;