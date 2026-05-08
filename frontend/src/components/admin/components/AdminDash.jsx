import React from "react";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import usePost from "../../hooks/usePost";
import '../assets/css/adminDash.css';
import useFetch from "../../hooks/UseFetch";
export default function AdminDash()
{
// const employeeId=localStorage.getItem("userId");
  const { postData } = usePost();
    const [data, setData] = useState(null); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 
    const [showDash, setShowDash] = useState(true);
    const [selectedWorkspace,setselectedWorkspace] =useState(null);
    const [selectedTodo,setselectedTodo]=useState(null);
    const [selectedProject,setselectedProject]=useState(null);
const {data:applications,loading:loading1,error:error1}=useFetch("/api/allApplication");
  const employeeId=96;
  const navigate=useNavigate();
 
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`/api/projectManagerDashView/${employeeId}`);
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          const result = await response.json();
          setData(result);
          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      };
      fetchData();
    }, [employeeId]); 
  
  const OpenWorkspace=(id)=>
  {
    setselectedWorkspace(id);
    navigate('/workspaceDash',{state:{workspaceId :id}});
  }
  const OpenProject=(id)=>
  {
    setselectedProject(id);
    navigate('/projectDash',{ state: { selectedProjectId: id } });
  }
  const ChangeTodoStatus = async (id, status, employeeId) => {
    setselectedTodo(id);
  
    const updatedStatus = status === "pending" ? "completed" : "pending";
  
    const input = {
      id: id,
      status: updatedStatus,
      employeeId: employeeId,
    };
  
    // Post data to change the status in the database
    await postData("/api/changeTodoStatus", input);
  
    // Update the status on the frontend (state)
    const updatedTodos = data.data.todo.map((todo) => {
      if (todo.id === id) {
        return { ...todo, status: updatedStatus }; // Update the status of the specific todo
      }
      return todo;
    });
  
    // Set the updated todos back to the state
    setData((prevData) => ({
      ...prevData,
      data: {
        ...prevData.data,
        todo: updatedTodos, // Update the todos array with the new status
      },
    }));
  };
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error}</div>;
    }
  

  const openEmail=()=>
  {
    navigate("sendEmail");
  }
  const goToCreateNotice=()=>
    {
      navigate("createNotices");
    }
    const CheckEmployeeData=()=>
      {
        navigate("employees");
      }
      const goToRegisterApplication=()=>
        {
          navigate("registerApplication");
        }
        const CheckNotices=()=>
          {
            navigate("notices");
          }

return(
   <>
       <h3 className="serviceHead">Services</h3>
    <div className="serviceIndex">
      <div className="AdminEmail projectRow"><ul><li><strong>Send Email</strong></li><li><button className="statusBtn" onClick={openEmail}>Open</button></li></ul></div>
      <div className="AdminCreateNotice projectRow"><ul><li><strong>Create Notice</strong></li><li><button className="statusBtn" onClick={goToCreateNotice}>Open</button></li></ul></div>
      <div className="AdminEmployeeData projectRow"><ul><li><strong>Check Employee Data</strong></li><li><button className="statusBtn" onClick={CheckEmployeeData}>Open</button></li></ul></div>
      <div className="RegisterApplication projectRow"><ul><li><strong>Register Application</strong></li><li><button className="statusBtn" onClick={goToRegisterApplication}>Open</button></li></ul></div>
      <div className="notices projectRow"><ul><li><strong>Notices</strong></li><li><button className="statusBtn" onClick={CheckNotices}>Open</button></li></ul></div>      
    </div>

    <div className="secondDiv">
            <div className="todo">
              <div className="todoBar">
                <h1 className="todoHead">Todo</h1>
                <i className="fa-solid fa-plus btn btn-link" id="filter"></i>
              </div>

              <div className="todoBody">
              
                {data.data.todo.map((todo, index) => (
                  <div key={index} className="todolist">
                    <div className="todoItem">
                      <span className="todoSerial">{index+1}</span>
                      <span className="todoName">{todo.todo}</span>
                      <span 
          className={`todoStatus ${todo.status.toLowerCase()}`} 
          onDoubleClick={(e) => {
            e.preventDefault(); 
            ChangeTodoStatus(todo.id, todo.status, todo.employeeId);
          }}
        >{todo.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
      <div className="RegisterApplicationAdmin">
      <div className="RegisterApplicationAdminBar">
       <h1 className="RegisterApplicationAdminHead">
Register Applications
</h1>   
        </div>


        <div className="RegisterApplicationAdminBody">

        {applications?.data?.map((application, index) => (
  <div key={application.id} className="RegisterApplicationAdminlist">
    <div className="RegisterApplicationAdminItem">
      <span className="RegisterApplicationAdminSNO">{index + 1}</span>
      <span className="RegisterApplicationAdminTitle">{application.fname}</span>
    </div>
  </div>
))}



</div>
      </div>
  </div>
   
   
   </>

)
}