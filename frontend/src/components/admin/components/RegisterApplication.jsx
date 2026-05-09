import React, { useEffect, useState } from "react";
import '../assets/css/registerApplication.css';
import useFetch from '../../hooks/UseFetch';
import usePost from '../../hooks/usePost';
import useDelete from "../../hooks/useDelete";
import styled from 'styled-components';

function RegisterApplication() {
    const { data, loading, error } = useFetch("/api/allApplication");
    const [selectedAppId, setSelectedAppId] = useState(null);
    const [secretCode, setSecretCode] = useState('');
const [role, setRole] = useState('');
const { postData,  loading:loading1, error:error1 ,data: postResult} = usePost();
const { DeleteData,  loading:loading2, error:error2 ,data: deleteResult} = useDelete();



 const HandleAccept = (id) => {
  setSelectedAppId(id);
}

const HandleReject = async(id) => {
    const SendEmailResult= await postData("http://localhost:8000/api/sendRejectEmail", id);
  const result = await DeleteData(`http://localhost:8000/api/removeData/${id}`);
  if(result?.status===true)
    {
        alert("Application Rejected");
        window.location.reload();
       
    }
        
     else {
        alert("Failed to reject the application. Please try again.");
    }
}
const handleSubmit=async (e)=>
{
e.preventDefault();

if (!secretCode || !role) {
    alert("Please fill in both the secret code and role.");
    return;
}
const input = {
    scode: secretCode,
    applicationId: selectedAppId, 
    role: role
};
try {
    
    const result = await postData("http://localhost:8000/api/passScode", input);
    if (result?.status === true) {
        setSecretCode("");
        setRole("");
        const dismissBtn= document.getElementById("dismissBtn");
        dismissBtn.click();
    const delResult= await DeleteData(`http://localhost:8000/api/removeData/${selectedAppId}`);
    console.log(delResult);
    if(delResult?.status===true)
    {
        alert("Application registered successfully");
        window.location.reload();
       
    }
        
    } else {
        alert("Failed to register the application. Please try again.");
    }
} catch (error) {
    alert("Error: " + error.message); // Handle any error that occurs during the request
}
}

    
    return (
        <>
            <h1 id="Employeeheading">Employees</h1>
            {

                data?.data?.length > 0 && data.data.map((Employee, index) => {
                    return (
                        <div className="employeeRow" key={index}>
                            <ul>
                                <li>{index + 1}</li>
                                <li>{Employee.fname + " " + Employee.lname}</li>
                                <li>{Employee.phone}</li>
                                <li>{Employee.email}</li>
                                <li>
                                    <button className="responseBtn AcceptBtn" onClick={() => HandleAccept(Employee.id)} data-bs-toggle="modal" data-bs-target="#acceptModal">Accept</button>
                                    <button className="responseBtn RejectBtn" onClick={() => setSelectedAppId(Employee.id)} data-bs-toggle="modal" data-bs-target="#rejectModal">Reject</button>
                                </li>
                            </ul>
                        </div>
                    )
                })
            }
            {/* Secret Code model */}
            <div className="modal fade" id="scodeModal" data-bs-backdrop="static" data-bs-keyboard="false"
  tabIndex="-1" aria-labelledby="singlePostLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="singlePostLabel">Enter the secret code and role</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id="dismissBtn">X</button>
      </div>

 <form action="" onSubmit={handleSubmit}>
      <div className="modal-body">
       
          <input
          type="password"
          id="scode"
          placeholder="Secret code"
          value={secretCode || ""}
          onChange={(e) => setSecretCode(e.target.value)}
        />


{/* <div className="form-group">
        <label htmlFor="ProjectId">Employee</label>
          <select
             name="projectId" id="ProjectId" 
             value={formData.projectId}
            onChange={handleChange}
            required
          >
            <option disabled value="">-- Select Project --</option>
            {projects?.data?.length > 0 &&
              projects.data.map((project, index) => (
                <option value={project.id} key={index}>
                  {project.name}
                </option>
              ))}
          </select>
        </div> */}



        <select
             name="role" id="role" 
             value={role || ""}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option disabled value="">-- Select role --</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
                <option value="Project Manager">Project Manager</option>
          </select>


        {/* <input
          type="text"
          id="role"
          placeholder="Role"
          value={role || ""}
          onChange={(e) => setRole(e.target.value)}
        /> */}
        <input
          type="hidden"
          name="applicationId"
          id="applicationIdInput"
          value={selectedAppId || ""}
        />   
      
       
      </div>

      <div className="modal-footer">
        <button type="submit" className="btn btn-success scodeEnter">Okay</button>
      </div> 
       </form>
    </div>
  </div>
</div>

                {/* Secret Code model */}

                {/* Reject model */}
                <div className="modal fade" id="rejectModal" data-bs-backdrop="static" data-bs-keyboard="false"
                    tabIndex="-1" aria-labelledby="deleteLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">X</button>
                            </div>
                            <div className="modal-body">
                                <div className="single-data" width="100%" height="100%">
                                    Are you sure you want to reject?
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary rejectConfirmBtn" data-bs-dismiss="modal" onClick={()=>HandleReject(selectedAppId)}>Reject</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Reject model */}

                {/* Accept model */}
                <div className="modal fade" id="acceptModal" data-bs-backdrop="static" data-bs-keyboard="false"
                    tabIndex="-1" aria-labelledby="deleteLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close">X</button>
                            </div>
                            <div className="modal-body">
                                <div className="single-data" width="100%" height="100%">
                                    Are you sure you want to Accept?
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary acceptConfirmBtn"
                                    data-bs-toggle="modal" data-bs-target="#scodeModal"
                                    data-bs-dismiss="modal">Accept</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Accept model */}

            </>
            );
}

            export default RegisterApplication;


            const RegisterApplicationContainer = styled.div`
  



* {
    margin: 0;
    box-sizing: border-box;
    padding: 0;
    font-family: 'Baloo 2', sans-serif;
}
body {
    background-color: #1e293b;
}

#Employeeheading {
    color: black;
    font-size: 4rem;
    text-align: center;
    margin-top: 50px;
    margin-bottom: 30px;
}

.employeeRow {
    background-color: white;
    border-radius: 20px;
    width: 80%;
    margin: 30px auto;
    height: 100px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s, box-shadow 0.2s;
}
.employeeRow:hover {
    transform: scale(1.01);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
}

.employeeRow ul {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding: 30px;
    align-items: center;
}
.employeeRow ul li {
    list-style: none;
    font-size: 1.3rem;
    color: #1e293b;
}


.responseBtn{
    width: 100px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
    height: 60px;
    border-radius: 10px;
    margin-right: 10px;
    color: white;
    font-size: 1.3rem;
    border:0.1px solid gray ;
    z-index: 1;
}
.AcceptBtn{
    background-color: green;
}
.RejectBtn{
    background-color: red;
}
.RejectBtn:hover{
    background-color: #ef4444;
    border: none;
    transition: background-color 0.3s;
}
.AcceptBtn:hover{
    background-color: #10b981;
    border: none;
}
/* General Modal Styling */
.modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
    z-index: 9999;
}

.modal.show {
    opacity: 1;
    visibility: visible;
}

.modal-dialog {
    max-width: 500px;
    margin: 0 auto;
}

.modal-content {
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
}

.modal-header {
    background-color: #f8f9fa;
    padding: 20px;
    border-bottom: 2px solid #dee2e6;
    border-radius: 12px 12px 0 0;
}

.modal-header h5 {
    margin: 0;
    font-size: 1.2rem;
    font-weight: bold;
    color: black;
}

.btn-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    color: black;
    padding: 0;
    margin: 0;
    cursor: pointer;
    position: absolute;
    right: 10px;
    top: 5px;
}

.modal-body {
    padding: 25px;
    font-size: 1rem;
    color: #333;
}

.modal-body input {
    width: 100%;
    padding: 12px;
    margin-bottom: 10px;
    border-radius: 8px;
    border: 1px solid #ccc;
    font-size: 1rem;
    box-sizing: border-box;
}

.modal-footer {
    padding: 15px;
    border-top: 2px solid #dee2e6;
    text-align: center;
}

.modal-footer .btn {
    font-size: 1.1rem;
    padding: 10px 20px;
    border-radius: 6px;
    font-weight: 600;
}

.btn-primary {
    background-color: #007bff;
    border-color: #007bff;
    color: white;
}

.btn-primary:hover {
    background-color: #0056b3;
    border-color: #0056b3;
}

.btn-secondary {
    background-color: #6c757d;
    border-color: #6c757d;
    color: white;
}

.btn-secondary:hover {
    background-color: #5a6268;
    border-color: #545b62;
}

.btn-success {
    background-color: #28a745;
    border-color: #28a745;
    color: white;
}

.btn-success:hover {
    background-color: #218838;
    border-color: #1e7e34;
} */

/* Specific Modal Styling */
 #scodeModal .modal-content {
    border-radius: 12px;
    background-color: #f7f7f7;
    padding: 30px;
}

#scodeModal .modal-header {
    color: white;
    border-radius: 12px 12px 0 0;
}

#scodeModal .modal-header h5 {
    font-size: 1.5rem;
    font-weight: bold;
}

#scodeModal input {
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 10px;
}

#scodeModal .btn-success {
    background-color: #28a745;
}

#scodeModal .btn-success:hover {
    background-color: #218838;
}

#acceptModal .modal-header {
    background-color: #10b981;
    color: white;
}

#rejectModal .modal-header {
    background-color: #ef4444;
    color: white;
}

.employeeRow {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.employeeRow:hover {
    transform: scale(1.02);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}
#scodeModal .modal-header{
    background-color: #6c757d;
}
`;