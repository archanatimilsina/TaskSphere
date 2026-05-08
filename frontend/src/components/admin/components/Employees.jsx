import React, { useState } from 'react';
import '../assets/css/employees.css';
import useFetch from '../../hooks/UseFetch';
import usePost from '../../hooks/usePost';
import useDelete from '../../hooks/useDelete';

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
    const result = await DeleteData(`/api/deleteUserData/${selectedAppId}`);
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