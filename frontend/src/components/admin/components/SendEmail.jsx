// EmailForm.jsx
import React, { useState } from 'react';
import '../assets/css/sendEmail.css';
import usePost from '../../hooks/UsePost';

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

    const result = await postData("/api/sendEmail",formData);
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
