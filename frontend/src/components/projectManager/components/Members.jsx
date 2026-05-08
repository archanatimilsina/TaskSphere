import React from "react";
import '../assets/css/members.css';
import useFetch from "../../hooks/UseFetch";

function Members()
{
       const { data, loading, error } = useFetch("/api/allUsers");
    return(
        <>
<h1 id="Employeeheading">Employees</h1>
{/* <div className="employeeRow">
<ul>
  <li>1</li>
  <li>Ram Krishna Shrestha</li>
  <li>Project Manager</li>
</ul>
</div> */}

{

data?.data?.length>0 && data.data.map((Employee,index)=>
{
  return(
    <div className="employeeRow" key={index}>
    <ul>
      <li>{index+1}</li>
      <li>{Employee.fname +" "+Employee.lname}</li>
      <li>{Employee.role}</li>
    </ul>
    </div> 
  )
})
}
        </>
    )
}
export default Members;