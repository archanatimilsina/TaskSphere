import useDelete from "../../hooks/useDelete";
import useFetch from "../../hooks/UseFetch";
import '../assets/css/tasks.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Tasks()
{
  const { DeleteData,  loading:loading2, error:error2 ,data: deleteResult} = useDelete();
const {data, loading, error} = useFetch("/api/taskIndex");
const { data: employees, loading: loading1, error: error1 } = useFetch("/api/allUsers");
const [showUpdateModal,setShowUpdateModal]=useState(false);
 const [showDeleteModal,setShowDeleteModal]=useState(false);
   const [selectedAppId,setSelectedAppId]=useState(null);
const [formData,setFormData]=useState({
    name:"",
    description:"",
    employee:[],
    sdate:"",
    edate:"",
    status:"Not started",
    priority:"",
    workspaceId:""
});
const navigate= useNavigate();
const handleInputChange=(e)=>
{
    const { name, value, selectedOptions } = e.target;

    if (name === "employee") {
      const selectedValues = Array.from(selectedOptions, (opt) => opt.value);
      setFormData((prev) => ({ ...prev, employee: selectedValues }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
}

const HandleDelete = (id) => {
  setSelectedAppId(id);
  setShowDeleteModal(true);
};
const handleUpdate=(e)=>
{
    e.preventDefault();
  alert("Data is taken");
  setShowUpdateModal(false);

}
const assignTask=()=>
{
  navigate("/TaskCreateForm"); 
}
const ConfirmDelete = async () => {
  const result = await DeleteData(`/api/taskDelete/${selectedAppId}`);
  console.log(result);
  if (result?.status === true) {
    alert("task Deleted ");
    navigate("/tasks");
  } else {
    alert("Failed to delete the task. Please try again.");
  }
  setShowDeleteModal(false);
};

return (

    <>

    <div className="header-bar">
        <button className="assignTask" onClick={assignTask}>Assign Task</button>
        <h1 id="taskHeading">Tasks</h1>
        <i className="fa-solid fa-filter" id="filter" title="Filter"></i>
    </div>

   
    <div className="table-container">
        <table>
            <thead>
                <tr>
                    <th>S.N</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Status</th>
                    <th>Priority</th>
                   
                    <th>Response</th>
                </tr>
            </thead>
            <tbody id="TaskTableBody">
               
               {data?.data?.length>0 && data?.data?.map((task,index)=>
               {
                return(
 <tr key={index}>
                    <td>{index+1}</td>
                    <td>{task.name}</td>
                    <td>{task.description}</td>
                    <td>{task.sdate}</td>
                    <td>{task.edate}</td>
                    <td>{task.status}</td>
                    <td>{task.priority}</td>
                    <td className="ResponseTd">
                        <button className="TaskResponseBtn UpdateBtn" onClick={()=>setShowUpdateModal(true)}>Update</button>
                        <button className="TaskResponseBtn DeleteBtn" onClick={()=>HandleDelete(task.id)}>Delete</button>
                    </td>
                </tr>

                )
               })

               }
               
          
            </tbody>
        </table>

  {showUpdateModal && (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={() => setShowUpdateModal(false)}>&times;</span>
        <h3>Update Attendance</h3>
        <form onSubmit={handleUpdate}>

        <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />

          <label htmlFor="description">Description</label>
          <textarea type="text" id="description" name="description" value={formData.description} onChange={handleInputChange} required />

        <label htmlFor="employee">Employee</label>
          <select
            name="employee" id="employee" 
            className="form-input"
            value={formData.employee}
            onChange={handleInputChange}
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

          <label htmlFor="sdate">Start Date</label>
          <input type="date" id="sdate" name="sdate" value={formData.sdate} onChange={handleInputChange} required />

          <label htmlFor="edate">End Date</label>
          <input type="date" id="edate" name="edate" value={formData.edate} onChange={handleInputChange} required />

          <label htmlFor="priority">Priority</label>
          <input type="text" id="priority" name="priority" value={formData.priority} onChange={handleInputChange} required />


          <button className="btn primary" type="submit">Update</button>
        </form>
      </div>
    </div>
  )}


{showDeleteModal && (
  <div className="EmployeeModal">
    <div className="EmployeeModal-content">
      <span className="close" onClick={() => setShowDeleteModal(false)}>&times;</span>
      <div className="EmployeeModal-body">
        Are you sure you want to delete this task?
      </div>
      <div className="EmployeeModal-footer">
      <button className="deleteBtn" onClick={ConfirmDelete}>Delete</button>
<button className="cancelBtn" onClick={() => setShowDeleteModal(false)}>Cancel</button>

      </div>
    </div>
  </div>
)}
    </div>

    </>
)
}
export default Tasks;