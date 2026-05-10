import React, { useState } from 'react';
import styled from 'styled-components';
import usePost from '../../../hooks/usePost';

const AdminSendEmail = () => {
  const { postData, loading } = usePost();
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    content: '',
  });

  const [status, setStatus] = useState({ message: '', type: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.subject || !formData.content) {
      setStatus({ message: 'Please fill in all fields.', type: 'error' });
      return;
    }

    try {
      const result = await postData("http://localhost:8000/api/sendEmail", formData);
      if (result?.status === true) {
        setStatus({ message: 'Email has been sent successfully!', type: 'success' });
        // Clear form after success
        setFormData({ email: '', subject: '', content: '' });
        // Optional: window.location.reload(); 
      } else {
        setStatus({ message: 'Failed to send email. Please try again.', type: 'error' });
      }
    } catch (err) {
      setStatus({ message: 'A server error occurred.', type: 'error' });
    }
  };

  return (
    <SendEmailContainer>
      <div className="email-header">
        <div className="icon-circle">
          <i className="fas fa-paper-plane"></i>
        </div>
        <h2>Communications Center</h2>
        <p>Send official broadcast emails to employees or clients</p>
      </div>

      <form onSubmit={handleSubmit} className="email-form">
        <div className="input-group">
          <label>Recipient Address</label>
          <div className="input-wrapper">
            <i className="fas fa-envelope field-icon"></i>
            <input
              type="email"
              name="email"
              placeholder="example@tasksphere.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="input-group">
          <label>Subject Line</label>
          <div className="input-wrapper">
            <i className="fas fa-heading field-icon"></i>
            <input
              type="text"
              name="subject"
              placeholder="Enter email subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="input-group">
          <label>Message Content</label>
          <textarea
            name="content"
            placeholder="Write your message here..."
            value={formData.content}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={loading} className="send-btn">
          {loading ? (
            <><i className="fas fa-spinner fa-spin"></i> Dispatching...</>
          ) : (
            <><i className="fas fa-paper-plane"></i> Send Email</>
          )}
        </button>

        {status.message && (
          <div className={`status-box ${status.type}`}>
            {status.type === 'success' ? <i className="fas fa-check-circle"></i> : <i className="fas fa-exclamation-circle"></i>}
            {status.message}
          </div>
        )}
      </form>
    </SendEmailContainer>
  );
};

export default AdminSendEmail;

const SendEmailContainer = styled.div`
  max-width: 700px;
  margin: 40px auto;
  background: white;
  border-radius: 24px;
  padding: 50px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.05);
  font-family: 'Baloo 2', cursive;
  border: 1px solid #f1f5f9;

  .email-header {
    text-align: center;
    margin-bottom: 40px;

    .icon-circle {
      width: 70px;
      height: 70px;
      background: #eff6ff;
      color: #3b82f6;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 15px;
      font-size: 1.8rem;
    }

    h2 {
      font-size: 2.2rem;
      color: #1e293b;
      margin: 0;
      font-weight: 800;
    }

    p {
      color: #64748b;
      margin-top: 5px;
      font-size: 1.1rem;
    }
  }

  .input-group {
    margin-bottom: 25px;

    label {
      display: block;
      margin-bottom: 8px;
      color: #475569;
      font-weight: 700;
      font-size: 0.95rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .input-wrapper {
      position: relative;
      
      .field-icon {
        position: absolute;
        left: 15px;
        top: 50%;
        transform: translateY(-50%);
        color: #94a3b8;
      }

      input {
        padding-left: 45px;
      }
    }

    input, textarea {
      width: 100%;
      padding: 14px 18px;
      border: 2px solid #f1f5f9;
      border-radius: 12px;
      font-size: 1.05rem;
      background-color: #f8fafc;
      transition: all 0.3s ease;
      font-family: inherit;

      &:focus {
        border-color: #3b82f6;
        outline: none;
        background-color: #fff;
        box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
      }
    }

    textarea {
      min-height: 180px;
      resize: vertical;
      line-height: 1.6;
    }
  }

  .send-btn {
    width: 100%;
    padding: 16px;
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    color: white;
    font-weight: 800;
    border: none;
    border-radius: 14px;
    cursor: pointer;
    font-size: 1.15rem;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(37, 99, 235, 0.3);
    }

    &:disabled {
      background: #94a3b8;
      cursor: not-allowed;
      transform: none;
    }
  }

  .status-box {
    margin-top: 25px;
    padding: 15px;
    border-radius: 12px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    font-weight: 700;

    &.success {
      background: #dcfce7;
      color: #166534;
      border: 1px solid #bbf7d0;
    }

    &.error {
      background: #fee2e2;
      color: #991b1b;
      border: 1px solid #fecaca;
    }
  }
`;