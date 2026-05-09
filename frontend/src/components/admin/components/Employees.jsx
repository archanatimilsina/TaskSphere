import React, { useState } from 'react';
import '../assets/css/employees.css';
import useFetch from '../../hooks/UseFetch';
import usePost from '../../hooks/usePost';
import useDelete from '../../hooks/useDelete';
import styled from 'styled-components';

function Employees()
{
const { postData,  loading:loading1, error:error1 ,data: postResult} = usePost();
const { DeleteData,  loading:loading2, error:error2 ,data: deleteResult} = useDelete();
  const { data, loading, error } = useFetch("/api/allUsers");
  const [showUpdateModal,setShowUpdateModal]=useState(false);
  const [showDeleteModal,setShowDeleteModal]=useState(false);
  const [selectedAppId,setSelectedAppId]=useState(null);
  const [formData,setFormData]=useState({
scode:"",
role:""
  });
const [confirmDelete,setConfirmDelete]=useState(false);

  const HandleUpdate=(id)=>
  {
    setShowUpdateModal(true)
    setSelectedAppId(id);

  }


  const HandleDelete = (id) => {
    setSelectedAppId(id);
    setShowDeleteModal(true);
  };
  const ConfirmDelete = async () => {
    const result = await DeleteData(`http://localhost:8000/api/deleteUserData/${selectedAppId}`);
    console.log(result);
    if (result?.status === true) {
      alert("Application Rejected");
      window.location.reload();
    } else {
      alert("Failed to reject the application. Please try again.");
    }
    setShowDeleteModal(false);
  };
  
  const HandleSubmit=async(e)=>
  {
e.preventDefault();
if (!scode || !role) {
  alert("Please fill in both the secret code and role.");
  return;
}
const result =await postData(`/api/userUpdateAdmin/${selectedAppId}`,formData);
console.log(result);
if(result.status===true)
{
  alert("Data is updated successfully!");
  setShowUpdateModal(false);
}

  }
  const HandleInputChange=(e)=>
{
  const {name,value}=e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));

}
    return(
        <>
<h1 id="Employeeheading">Employees</h1>
  <div className="EmployeeWrap">
{
data?.data?.length>0 && data.data.map((Employee,index)=>
{
  return(
  <div className="employeeRow" key={index}>
    <ul >
      <li>{index+1}</li>
      <li>{Employee.fname +" "+Employee.lname}</li>
      <li>{Employee.phone}</li>
      <li>{Employee.address}</li>
      <li>{Employee.email}</li>
      <li>{Employee.role}</li>
<li className='employeeResponse'>
  <button className='employeeEdit' onClick={()=>HandleUpdate(Employee.id)}>Edit</button>
  <button className='employeeRemove' onClick={()=>HandleDelete(Employee.id)}>Remove</button>
</li>
    </ul>
   </div> 
  )
})
} 
  </div>



{/* update modal */}
  {showUpdateModal && (
    <div className="EmployeeModal">
      <div className="EmployeeModal-content">
        <span className="close" onClick={() => setShowUpdateModal(false)}>&times;</span>
        <h3>Update Employee</h3>
        <form onSubmit={HandleSubmit}>

        <label htmlFor="scode">Secret Code</label>
          <input type="password" id="scode" name="scode" value={formData.scode} onChange={HandleInputChange} required />

        <label htmlFor="role">Role</label>
          <select
            name="role" id="role" 
            className="form-input"
            value={formData.role}
            onChange={HandleInputChange}
            required
          >
                <option value="Project Manager">Project Manager</option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
          </select>

          <button className="btn primary employeeSubmitBtn" type="submit">Update</button>
        </form>
      </div>
    </div>
  )}
{/* update modal */}



                {/* delete Confirm model */}
                {showDeleteModal && (
  <div className="EmployeeModal">
    <div className="EmployeeModal-content">
      <span className="close" onClick={() => setShowDeleteModal(false)}>&times;</span>
      <div className="EmployeeModal-body">
        Are you sure you want to delete this employee?
      </div>
      <div className="EmployeeModal-footer">
      <button className="deleteBtn" onClick={ConfirmDelete}>Delete</button>
<button className="cancelBtn" onClick={() => setShowDeleteModal(false)}>Cancel</button>

      </div>
    </div>
  </div>
)}

                {/* delete confirm model */}

        </>
    )
}
export default Employees;

const EmployeesContainer = styled.div`
  /* Global Reset */
* {
    margin: 0;
    box-sizing: border-box;
    padding: 0;
    font-family: 'Baloo 2', sans-serif;
}

body {
    background-color: #1e293b;
}
.EmployeeWrap
{
    width: 100%;
    height: 100%;

}
/* Heading */
#Employeeheading {
    color: black;
    font-size: 4rem;
    text-align: center;
    margin: 50px 0 30px;
}

/* Employee Card */
.employeeRow {
    background-color: white;
    border-radius: 20px;
    width: 98% !important;
    margin: auto;
    height: 100px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: 0.2s;
}
.employeeRow:hover {
    transform: scale(1.01);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
}
.employeeRow ul {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 100%;
    padding: 30px;
}
.employeeRow ul li {
    list-style: none;
    font-size: 1.3rem;
    color: #1e293b;
}

/* Employee Buttons */
.employeeResponse {
    display: flex;
    gap: 10px;
}
.employeeResponse button {
    width: 130px;
    height: 50px;
    border-radius: 10px;
    border: none;
    color: white;
    font-size: 18px;
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.78);
    cursor: pointer;
}
.employeeEdit {
    background-color: green;
}
.employeeEdit:hover {
    background-color: rgb(148, 212, 148);
}
.employeeRemove {
    background-color: red;
}
.employeeRemove:hover {
    background-color: rgb(222, 123, 123);
}

/* Modal Styling (works without Bootstrap) */
.EmployeeModal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
}
.EmployeeModal-content {
    background-color: #fff;
    border-radius: 12px;
    width: 90%;
    max-width: 500px;
    padding: 30px;
    position: relative;
}
.close {
    position: absolute;
    right: 15px;
    top: 10px;
    font-size: 24px;
    font-weight: bold;
    cursor: pointer;
}

/* Modal Form */
.EmployeeModal-content h3 {
    margin-bottom: 20px;
}
.EmployeeModal-content label {
    display: block;
    margin: 10px 0 5px;
}
.EmployeeModal-content input,
.EmployeeModal-content select {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    font-size: 16px;
    border-radius: 8px;
    border: 1px solid #ccc;
}
.employeeSubmitBtn {
    width: 100%;
    padding: 12px;
    background-color: #1e293b;
    color: white;
    border: 1px solid black;
    border-radius: 8px;
    font-size: 18px;
}

/* Modal Footer Button */
.EmployeeModal-footer {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    gap: 15px;
}
.EmployeeModal-footer button {
    padding: 10px 25px;
    font-size: 16px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
}
.EmployeeModal-footer .deleteBtn {
    background-color: red;
    color: white;
}
.EmployeeModal-footer .cancelBtn {
    background-color: #ccc;
    color: black;
}


`;