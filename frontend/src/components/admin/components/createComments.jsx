import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import usePost from "../../../hooks/usePost";
import styled from 'styled-components';

export default function CommentForm() {
  const { postData } = usePost();
  const navigate = useNavigate();

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

    const result = await postData("http://localhost:8000/api/postComment", payload);
    
    if (result?.status) {
      // Optional: replace alert with a toast notification in the future
      alert("Comment posted successfully");
      setFormData({ username: "", role: "", comment: "", profile: "" });
      // Redirecting user back to the comment list after success
      navigate("/user/comments");
    }
  };

  return (
    <CommentFormWrapper>
      <div className="form-card">
        <div className="form-header">
          <i className="fas fa-comment-dots"></i>
          <h2>Share Your Thoughts</h2>
          <p>Join the discussion with your team</p>
        </div>

        <form onSubmit={handleSubmit} className="form-content">
          <div className="input-grid">
            <div className="form-group">
              <label>Full Name</label>
              <div className="input-wrapper">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  name="username"
                  placeholder="e.g. Sita Sharma"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Professional Role</label>
              <div className="input-wrapper">
                <i className="fas fa-briefcase"></i>
                <input
                  type="text"
                  name="role"
                  placeholder="e.g. Project Manager"
                  value={formData.role}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Profile Image URL (Optional)</label>
            <div className="input-wrapper">
              <i className="fas fa-image"></i>
              <input
                type="text"
                name="profile"
                placeholder="https://i.pravatar.cc/150"
                value={formData.profile}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Your Message</label>
            <textarea
              name="comment"
              placeholder="What's on your mind?"
              value={formData.comment}
              onChange={handleChange}
              rows={5}
              required
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={() => navigate(-1)}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              Post Comment
            </button>
          </div>
        </form>
      </div>
    </CommentFormWrapper>
  );
}

const CommentFormWrapper = styled.div`
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  font-family: 'Baloo 2', cursive;

  .form-card {
    background: white;
    width: 100%;
    max-width: 650px;
    padding: 40px;
    border-radius: 24px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
    border: 1px solid #f1f5f9;
  }

  .form-header {
    text-align: center;
    margin-bottom: 30px;

    i {
      font-size: 2.5rem;
      color: #3b82f6;
      margin-bottom: 10px;
    }

    h2 {
      font-size: 2rem;
      color: #1e293b;
      margin: 0;
    }

    p {
      color: #64748b;
      font-size: 1.1rem;
    }
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

    label {
      display: block;
      margin-bottom: 8px;
      font-weight: 700;
      color: #475569;
      font-size: 1rem;
    }

    .input-wrapper {
      position: relative;
      display: flex;
      align-items: center;

      i {
        position: absolute;
        left: 15px;
        color: #94a3b8;
      }

      input {
        width: 100%;
        padding: 12px 15px 12px 45px;
        border: 2px solid #e2e8f0;
        border-radius: 12px;
        font-size: 1rem;
        transition: all 0.2s;
        font-family: inherit;

        &:focus {
          border-color: #3b82f6;
          outline: none;
          background: #f8fafc;
        }
      }
    }

    textarea {
      width: 100%;
      padding: 15px;
      border: 2px solid #e2e8f0;
      border-radius: 12px;
      font-size: 1rem;
      font-family: inherit;
      resize: vertical;
      transition: all 0.2s;

      &:focus {
        border-color: #3b82f6;
        outline: none;
        background: #f8fafc;
      }
    }
  }

  .form-actions {
    display: flex;
    gap: 15px;
    margin-top: 10px;

    button {
      flex: 1;
      padding: 14px;
      border-radius: 12px;
      font-size: 1.1rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s;
      border: none;
    }

    .btn-submit {
      background: #3b82f6;
      color: white;
      &:hover {
        background: #2563eb;
        transform: translateY(-2px);
      }
    }

    .btn-cancel {
      background: #f1f5f9;
      color: #64748b;
      &:hover {
        background: #e2e8f0;
      }
    }
  }
`;