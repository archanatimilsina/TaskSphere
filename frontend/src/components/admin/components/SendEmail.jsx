// EmailForm.jsx
import React, { useState } from 'react';
import '../assets/css/sendEmail.css';
import usePost from '../../hooks/UsePost';
import styled from 'styled-components';

const SendEmail = () => {
    const {postData, loading, error, data}=usePost();
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    content: '',
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const {name,value}=e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.subject || !formData.content) {
      setStatus('Please fill in all fields.');
      return;
    }

    const result = await postData("http://localhost:8000/api/sendEmail",formData);
    if(result.status===true)
    {
      alert("Email has sent successfully");
      window.location.reload();
    }
  
    
  };

  return (
    <div className="email-form-container">
      <h2>Send Email</h2>
      <form onSubmit={handleSubmit} className="email-form">
        <label>
          Email:
          <input
            type="email"
            name="email"
            placeholder="Recipient Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Subject:
          <input
            type="text"
            name="subject"
            placeholder="Email Subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Content:
          <textarea
            name="content"
            placeholder="Type your message here..."
            value={formData.content}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">Send</button>
        {status && <p className="status-message">{status}</p>}
      </form>
    </div>
  );
};

export default SendEmail;


const SendEmailContainer = styled.div`
  
/* emailForm.css */
.email-form-container {
    max-width: 500px;
    margin: 40px auto;
    padding: 30px;
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    font-family: 'Segoe UI', sans-serif;
  }
  
  .email-form h2 {
    text-align: center;
    color: #333;
    margin-bottom: 20px;
  }
  
  .email-form label {
    display: block;
    margin-bottom: 15px;
    color: #444;
    font-weight: 500;
  }
  
  .email-form input,
  .email-form textarea {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 1rem;
    background-color: #f9f9f9;
    transition: border 0.3s;
  }
  
  .email-form input:focus,
  .email-form textarea:focus {
    border-color: #007bff;
    outline: none;
    background-color: #fff;
  }
  
  .email-form textarea {
    min-height: 120px;
    resize: vertical;
  }
  
  .email-form button {
    width: 100%;
    padding: 12px;
    background-color: #007bff;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1rem;
    margin-top: 10px;
    transition: background 0.3s ease;
  }
  
  .email-form button:hover {
    background-color: #0056b3;
  }
  
  .status-message {
    margin-top: 15px;
    color: green;
    font-weight: 500;
    text-align: center;
  }
  
`;