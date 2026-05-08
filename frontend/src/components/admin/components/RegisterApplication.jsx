import React, { useEffect, useState } from "react";
import '../assets/css/registerApplication.css';
import useFetch from '../../hooks/UseFetch';
import usePost from '../../hooks/usePost';
import useDelete from "../../hooks/useDelete";

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
    const SendEmailResult= await postData("/api/sendRejectEmail", id);
  const result = await DeleteData(`/api/removeData/${id}`);
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
    
    const result = await postData("/api/passScode", input);
    if (result?.status === true) {
        setSecretCode("");
        setRole("");
        const dismissBtn= document.getElementById("dismissBtn");
        dismissBtn.click();
    const delResult= await DeleteData(`/api/removeData/${selectedAppId}`);
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
