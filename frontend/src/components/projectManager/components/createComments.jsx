import React, { useState } from "react";
import styled from 'styled-components';
import usePost from "../../../hooks/usePost";

export default function PmProjectCreateForm() {
  const { postData, loading } = usePost();

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
      created_at: new Date().toLocaleString(), 
    };

    const result = await postData("http://localhost:8000/api/postComment", payload);
    if (result?.status) {
      alert("Comment published to the forum.");
      setFormData({ username: "", role: "", comment: "", profile: "" });
    }
  };

  return (
    <CommentFormContainer>
      <div className="form-card">
        <div className="form-header">
          <div className="icon-box">
            <i className="fas fa-comment-dots"></i>
          </div>
          <div className="text-box">
            <h3>Share an Update</h3>
            <p>Post your thoughts or instructions to the workspace discussion.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="styled-form">
          <div className="input-row">
            <div className="form-group">
              <label>Full Name</label>
              <div className="input-with-icon">
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
              <label>Designation / Role</label>
              <div className="input-with-icon">
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
            <label>Profile Avatar URL (Optional)</label>
            <div className="input-with-icon">
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
            <label>Message Content</label>
            <textarea
              name="comment"
              placeholder="What's on your mind regarding this project?"
              value={formData.comment}
              onChange={handleChange}
              rows={4}
              required
            />
          </div>

          <div className="action-area">
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? (
                <><i className="fas fa-spinner fa-spin"></i> Posting...</>
              ) : (
                <><i className="fas fa-paper-plane"></i> Publish to Forum</>
              )}
            </button>
            <button type="button" className="clear-btn" onClick={() => setFormData({username: "", role: "", comment: "", profile: ""})}>
              Clear
            </button>
          </div>
        </form>
      </div>
    </CommentFormContainer>
  );
}

const CommentFormContainer = styled.div`
  max-width: 800px;
  margin: 30px auto;
  font-family: 'Baloo 2', cursive;

  .form-card {
    background: white;
    border-radius: 24px;
    padding: 40px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
    border: 1px solid #f1f5f9;
  }

  .form-header {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 35px;

    .icon-box {
      width: 60px;
      height: 60px;
      background: #eff6ff;
      color: #3b82f6;
      border-radius: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
    }

    h3 {
      font-size: 1.6rem;
      color: #0f172a;
      margin: 0;
    }

    p {
      color: #64748b;
      margin: 0;
      font-size: 1rem;
    }
  }

  .input-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    @media (max-width: 600px) { grid-template-columns: 1fr; }
  }

  .form-group {
    margin-bottom: 20px;

    label {
      display: block;
      margin-bottom: 8px;
      font-weight: 700;
      color: #475569;
      font-size: 0.95rem;
    }

    .input-with-icon {
      position: relative;
      
      i {
        position: absolute;
        left: 15px;
        top: 50%;
        transform: translateY(-50%);
        color: #94a3b8;
      }

      input {
        padding-left: 45px !important;
      }
    }

    input, textarea {
      width: 100%;
      padding: 12px 18px;
      background: #f8fafc;
      border: 2px solid #f1f5f9;
      border-radius: 12px;
      font-family: inherit;
      font-size: 1rem;
      transition: all 0.3s;

      &:focus {
        background: white;
        border-color: #3b82f6;
        outline: none;
        box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
      }
    }

    textarea {
      resize: vertical;
      min-height: 120px;
    }
  }

  .action-area {
    display: flex;
    gap: 15px;
    margin-top: 10px;

    .submit-btn {
      flex: 2;
      background: #3b82f6;
      color: white;
      border: none;
      padding: 14px;
      border-radius: 12px;
      font-weight: 700;
      font-size: 1rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      transition: 0.2s;

      &:hover {
        background: #2563eb;
        transform: translateY(-2px);
      }

      &:disabled {
        background: #94a3b8;
        cursor: not-allowed;
      }
    }

    .clear-btn {
      flex: 1;
      background: #f1f5f9;
      color: #64748b;
      border: none;
      padding: 14px;
      border-radius: 12px;
      font-weight: 700;
      cursor: pointer;
      &:hover { background: #e2e8f0; color: #1e293b; }
    }
  }
`;