import React from "react";
import '../assets/css/profile.css';
import bleachImg from '../../../../images/bleach.jpg'; 
import useFetch from "../../hooks/UseFetch";
import styled from 'styled-components';

export default function Profile()
{
    const userId=localStorage.getItem("userId");
    const {data:userData,loading,error}=useFetch(`http://localhost:8000/api/specificUser/${userId}`);
    console.log(userData);
 

      if (loading) {
        return <div>Loading...</div>; // Show a loading message while data is being fetched
      }
    
      if (error) {
        return <div>Error loading profile data. Please try again later.</div>; // Show an error message if there's an issue
      }
    
      if (!userData || !userData.data || userData.data.length === 0) {
        return <div>No user data found.</div>; // In case userData is null, empty, or has no data
      }
    
      const user = userData.data;
return(
<>
<div className="profilePic">
<img src={bleachImg} alt="NOt found" />
</div>
<div className="profileDetails">
<h2>{user.fname+" "+user.lname}'s Profile</h2>
        <p><strong>Name:</strong> {user.fname} {user.lname}</p>
        <p><strong>Address:</strong> {user.address}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Gender:</strong> {user.gender}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <div>
          <p><strong>Citizen Card (Front):</strong></p>
          <img src={user.citizenCardFront} alt="Citizen Card Front" width="200" />
        </div>
        <div>
          <p><strong>Citizen Card (Back):</strong></p>
          <img src={user.citizenCardBack} alt="Citizen Card Back" width="200" />
        </div>
        <button className="updateInfo">Update Info</button>
</div>
</>

)

}


const ProfileContainer = styled.div`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}


.profilePic
{
    width: 300px;
    height: 300px;
border-radius: 50%;
box-shadow: 0px 2px 10px rgba(0, 0, 0,0.9);
margin: auto;
position: relative;
z-index: 1;
}
.profilePic img{
    position: absolute;
    border-radius: 50%;
width: 100%;
height: 100%;
}
.profileDetails
{
    box-shadow: 0px 2px 10px rgba(0, 0, 0,0.9);
  border-radius: 72px;
    width: 100%;
    height: auto;
    padding: 50px;
    margin-top: -130px;
    padding-top: 150px;
}



.profileDetails h2 {
    font-size: 34px;
    color: #333;
    text-align: center;
    margin-bottom: 20px;
  }
  
  .profileDetails p {
    font-size: 16px;
    line-height: 1.6;
    margin-bottom: 12px;
  }
  
  .profileDetails p strong {
    font-weight: bold;
    color: #555;
  }
  
  .profileDetails div {
    margin-top: 20px;
    text-align: center;
  }
  
  .profileDetails img {
    margin-top: 10px;
    max-width: 400px;
    border-radius: 8px;
  }

  .updateInfo
  {
    width: 97%;
    box-shadow: 0px 2px 10px rgba(0, 0, 0,0.9);
height: 50px;
border-radius: 34px;
margin-top: 20px;
color: white;
background-color: rgb(55, 210, 55);
border: none;
font-size: 23px;
  }

`;