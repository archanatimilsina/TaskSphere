import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import usePost from "../../../hooks/usePost";

function AdminCreateNotices() {
  const { postData, loading, error, response } = usePost();
  const [formData, setFormData] = useState({
    noticeHead: "",
    noticeDescription: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);

  // Clean up memory when component unmounts or preview changes
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      const file = files[0];
      if (file) {
        setFormData((prev) => ({ ...prev, image: file }));
        setPreview(URL.createObjectURL(file));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const input = new FormData();
    input.append("noticeHead", formData.noticeHead);
    input.append("noticeDescription", formData.noticeDescription);
    input.append("image", formData.image);

    try {
      await postData("http://localhost:8000/api/storeNotice", input);
      if (!error) {
        // Reset form on success
        setFormData({ noticeHead: "", noticeDescription: "", image: null });
        setPreview(null);
      }
    } catch (err) {
      console.error("Error occurred while submitting form:", err);
    }
  };

  return (
    <CreateNoticesContainer>
      <div className="form-card">
        <div className="form-header">
          <div className="icon-circle">
            <i className="fas fa-bullhorn"></i>
          </div>
          <h2>Create New Notice</h2>
          <p>Broadcast important updates to your organizational dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="notice-form">
          <div className="form-group">
            <label>Notice Headline</label>
            <input
              type="text"
              name="noticeHead"
              placeholder="e.g., Scheduled Server Maintenance"
              value={formData.noticeHead}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Detailed Description</label>
            <textarea
              name="noticeDescription"
              placeholder="Provide all necessary details here..."
              value={formData.noticeDescription}
              onChange={handleChange}
              rows={5}
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label>Featured Image</label>
            <div className="file-upload-wrapper">
              <input 
                type="file" 
                name="image" 
                id="file-input"
                accept="image/*" 
                onChange={handleChange} 
                required 
              />
              <label htmlFor="file-input" className="file-label">
                <i className="fas fa-cloud-upload-alt"></i>
                <span>{formData.image ? formData.image.name : "Click to upload an image"}</span>
              </label>
            </div>
            
            {preview && (
              <div className="preview-container">
                <img src={preview} alt="Preview" className="preview-image" />
                <button type="button" className="remove-img" onClick={() => {setPreview(null); setFormData({...formData, image: null})}}>
                  <i className="fas fa-times"></i>
                </button>
              </div>
            )}
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? (
              <><i className="fas fa-spinner fa-spin"></i> Posting...</>
            ) : (
              "Publish Notice"
            )}
          </button>

          {error && <div className="status-msg error-msg"><i className="fas fa-exclamation-circle"></i> {error}</div>}
          {response && <div className="status-msg success-msg"><i className="fas fa-check-circle"></i> Notice published successfully!</div>}
        </form>
      </div>
    </CreateNoticesContainer>
  );
}

export default AdminCreateNotices;

const CreateNoticesContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  font-family: 'Baloo 2', cursive;

  .form-card {
    background: white;
    width: 100%;
    max-width: 700px;
    padding: 40px;
    border-radius: 24px;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.05);
    border: 1px solid #f1f5f9;
  }

  .form-header {
    text-align: center;
    margin-bottom: 35px;

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

    h2 { font-size: 2rem; color: #1e293b; margin: 0; }
    p { color: #64748b; margin-top: 8px; }
  }

  .notice-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;

    label { font-weight: 700; color: #475569; font-size: 1rem; }

    input[type="text"],
    textarea {
      padding: 14px 18px;
      border: 2px solid #e2e8f0;
      border-radius: 12px;
      font-size: 1rem;
      font-family: inherit;
      transition: all 0.2s;

      &:focus {
        outline: none;
        border-color: #3b82f6;
        background: #f8fafc;
      }
    }
  }

  .file-upload-wrapper {
    position: relative;
    
    #file-input { display: none; }
    
    .file-label {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 30px;
      border: 2px dashed #cbd5e1;
      border-radius: 12px;
      cursor: pointer;
      color: #64748b;
      transition: all 0.2s;

      i { font-size: 2rem; margin-bottom: 10px; color: #3b82f6; }
      &:hover { border-color: #3b82f6; background: #f8fafc; }
    }
  }

  .preview-container {
    position: relative;
    margin-top: 15px;
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid #e2e8f0;

    .preview-image {
      width: 100%;
      height: 250px;
      object-fit: cover;
      display: block;
    }

    .remove-img {
      position: absolute;
      top: 10px;
      right: 10px;
      background: rgba(239, 68, 68, 0.9);
      color: white;
      border: none;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .submit-btn {
    margin-top: 10px;
    padding: 16px;
    background: #3b82f6;
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 1.1rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;

    &:hover { background: #2563eb; transform: translateY(-2px); }
    &:disabled { background: #94a3b8; cursor: not-allowed; transform: none; }
  }

  .status-msg {
    margin-top: 15px;
    padding: 12px;
    border-radius: 8px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 0.95rem;

    &.error-msg { background: #fef2f2; color: #dc2626; border: 1px solid #fecaca; }
    &.success-msg { background: #f0fdf4; color: #16a34a; border: 1px solid #bbf7d0; }
  }
`;