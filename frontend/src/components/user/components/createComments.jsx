import { useState } from "react";
import usePost from "../../hooks/usePost";
import "../assets/css/CommentForm.css"; // You can design this as needed

export default function CommentForm() {
  const { postData } = usePost();

  const [formData, setFormData] = useState({
    username: "",
    role: "",
    comment: "",
    profile: "" // Optional: Could be a file or URL
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
      created_at: new Date().toISOString(), // auto add timestamp
    };

    const result = await postData("/api/postComment", payload);
    if (result?.status) {
      alert("Comment posted successfully");
      setFormData({ username: "", role: "", comment: "", profile: "" });
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Post a Comment</h2>
      <form onSubmit={handleSubmit} className="form-content">

        <div className="form-group">
          <label className="form-label">Username</label>
          <input
            type="text"
            name="username"
            className="form-input"
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
            value={formData.role}
            onChange={handleChange}
            required
          />
        </div>

        {/* Optional: Profile image URL or input */}
        <div className="form-group">
          <label className="form-label">Profile Image URL</label>
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
          <label className="form-label">Comment</label>
          <textarea
            name="comment"
            className="form-input"
            value={formData.comment}
            onChange={handleChange}
            rows={5}
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
  );
}
