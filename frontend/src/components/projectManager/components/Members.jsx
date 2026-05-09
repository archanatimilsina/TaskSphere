import React from "react";
import '../assets/css/members.css';
import useFetch from "../../hooks/UseFetch";
import styled from 'styled-components';

function Members()
{
       const { data, loading, error } = useFetch("http://localhost:8000/api/allUsers");
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

const MembersContainer = styled.div`
  
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


`;