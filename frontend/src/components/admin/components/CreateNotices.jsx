import React, { useState } from "react";
import usePost from "../../hooks/usePost"; 
import "../assets/css/createNotice.css";
import styled from 'styled-components';

function CreateNotices() {
  const { postData, loading, error, response } = usePost();
  const [formData, setFormData] = useState({
    noticeHead: "",
    noticeDescription: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormData((prev) => ({
        ...prev,
        image: files[0],
      }));
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
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
    } catch (err) {
      console.error("Error occurred while submitting form:", err);
    }
  };

  return (

    <CreateNoticesContainer>
<div className="add-notice-container">
      <h2>Add New Notice</h2>
      <form onSubmit={handleSubmit} className="add-notice-form">
        <label>Notice Head:</label>
        <input
          type="text"
          name="noticeHead"
          value={formData.noticeHead}
          onChange={handleChange}
          required
        />

        <label>Description:</label>
        <textarea
          name="noticeDescription"
          value={formData.noticeDescription}
          onChange={handleChange}
          required
        ></textarea>

        <label>Image:</label>
        <input type="file" name="image" accept="image/*" onChange={handleChange} required />
        {preview && <img src={preview} alt="Preview" className="preview-image" />}

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>

        {error && <p className="error">{error}</p>}
        {response && <p className="success">Notice added successfully!</p>}
      </form>
    </div>


    </CreateNoticesContainer>
    
  );
}

export default CreateNotices;


const CreateNoticesContainer = styled.div`
.add-notice-container {
    width: 80%;
    margin: auto;
    padding: 20px;
    background: #f0f4f8;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .add-notice-form {
    display: flex;
    flex-direction: column;
  }
  
  .add-notice-form label {
    margin-top: 10px;
    font-weight: bold;
  }
  
  .add-notice-form input[type="text"],
  .add-notice-form textarea {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-top: 5px;
  }
  
  .add-notice-form textarea {
    resize: vertical;
    height: 100px;
  }
  
  .preview-image {
    margin-top: 10px;
    max-width: 100%;
    height: auto;
    border-radius: 5px;
  }
  
  button {
    margin-top: 15px;
    padding: 10px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:disabled {
    background: gray;
  }
  
  .error {
    color: red;
    margin-top: 10px;
  }
  
  .success {
    color: green;
    margin-top: 10px;
  }
  
`;