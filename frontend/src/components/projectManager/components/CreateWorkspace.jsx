import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import useFetch from "../../hooks/UseFetch";
import usePost from "../../hooks/usePost";

const CreateWorkspace = () => {
    const { postData } = usePost();
  const location= useLocation();
  const projectId=location.state;
   const { data: employees, loading: loading1, error: error1 } = useFetch("/api/allUsers");
  const [formData, setWorkspace] = useState({
    name: "",
    description: "",
    sdate: "",
    edate: "",
    leader: "",
    status: "",
    projectId:projectId ,
    employee: []
  });

  const handleChange = (e) => {
    const { name, value, selectedOptions} = e.target;

    if (name === "employee") {
      const selectedValues = Array.from(selectedOptions, (opt) => opt.value);
      setWorkspace((prev) => ({ ...prev, employee: selectedValues }));
    } else {
      setWorkspace((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await postData("/api/workspaceCreate", formData);
  
    if (result?.status === true) {
      alert("Workspace is created");
      navigate("/workspaces");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Create New Workspace</h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <input
          type="text"
          name="name"
          placeholder="Workspace Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <textarea
          name="description"
          placeholder="Workspace Description"
          value={formData.description}
          onChange={handleChange}
          required
          style={{ ...inputStyle, height: "100px" }}
        />
        <input
          type="date"
          name="sdate"
          value={formData.sdate}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="date"
          name="edate"
          value={formData.edate}
          onChange={handleChange}
          required
          style={inputStyle}
        />
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
            required multiple
          >
            {employees?.data?.length > 0 &&
              employees.data.map((employee, index) => (
                <option value={employee.id} key={index}>
                  {employee.fname+" "+employee.lname}
                </option>
              ))}
          </select>
        </div>

        <button type="submit" style={buttonStyle}>
          Create Workspace
        </button>
      </form>
    </div>
  );
};

const inputStyle = {
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "16px",
};

const buttonStyle = {
  padding: "12px",
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontSize: "16px",
  cursor: "pointer",
  marginTop: "10px",
};

export default CreateWorkspace;
