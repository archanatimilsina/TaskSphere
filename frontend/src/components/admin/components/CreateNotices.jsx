import React, { useState } from "react";
import usePost from "../../hooks/usePost"; 
import "../assets/css/createNotice.css";

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
      await postData("/api/storeNotice", input);  
    } catch (err) {
      console.error("Error occurred while submitting form:", err);
    }
  };

  return (
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
  );
}

export default CreateNotices;
