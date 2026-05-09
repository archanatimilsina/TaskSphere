import { useState } from "react";
import "../assets/css/ProjectCreateForm.css";
import usePost from "../../hooks/usePost";
import useFetch from "../../hooks/UseFetch";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

export default function ProjectCreateForm() {
  const { postData } = usePost();
  const navigate=useNavigate();
  const { data: employees, loading: loading1, error: error1 } = useFetch("http://localhost:8000/api/allUsers");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    sdate: "",
    edate: "",
    employee: [], 
    leader: ""
  });

  const handleChange = (e) => {
    const { name, value, selectedOptions } = e.target;

    if (name === "employee") {
      const selectedValues = Array.from(selectedOptions, (opt) => opt.value);
      setFormData((prev) => ({ ...prev, employee: selectedValues }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await postData("http://localhost:8000/api/projectCreate", formData);
  
    if (result?.status === true) {
      alert("project is created");
      navigate("/projects");
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Create New Project</h2>
      <form onSubmit={handleSubmit} className="form-content">
        <div className="form-group">
          <label className="form-label">Project Name</label>
          <input
            type="text"
            name="name"
            className="form-input"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            className="form-input"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Start Date</label>
          <input
            type="date"
            name="sdate"
            className="form-input"
            value={formData.sdate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">End Date</label>
          <input
            type="date"
            name="edate"
            className="form-input"
            value={formData.edate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Leader</label>
          <select
            name="leader"
            className="form-input"
            value={formData.leader}
            onChange={handleChange}
            required
          >
            {employees?.data?.length > 0 &&
              employees.data.map((employee, index) => (
                <option value={employee.id} key={index}>
                  {employee.fname+" "+employee.lname}
                </option>
              ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Employee</label>
          <select
            name="employee"
            className="form-input"
            value={formData.employee}
            onChange={handleChange}
            multiple
            required
          >
            {employees?.data?.length > 0 &&
              employees.data.map((employee, index) => (
                <option value={employee.id} key={index}>
                  {employee.fname+" "+employee.lname}
                </option>
              ))}
          </select>
        </div>

        <div className="form-button-wrapper">
          <button type="submit" className="form-button">
            Create Project
          </button>
        </div>
      </form>
    </div>
  );
}


const ProjectCreateFormContainer = styled.div`
  
/* ProjectCreateForm.css */

.form-container {
    max-width: 600px;
    margin: 40px auto;
    padding: 30px;
    background-color: white;
    border-radius: 16px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
  
  .form-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 24px;
    text-align: center;
  }
  
  .form-content {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
  }
  
  .form-label {
    margin-bottom: 8px;
    font-weight: 600;
  }
  
  .form-input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 16px;
    width: 100%;
  }
  
  .form-button-wrapper {
    text-align: center;
  }
  
  .form-button {
    padding: 12px 24px;
    background-color: #2563eb; /* blue-600 */
    color: white;
    font-size: 16px;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .form-button:hover {
    background-color: #1d4ed8; /* blue-700 */
  }
  
`;