import React from "react";
import '../assets/css/profile.css';
import bleachImg from '../../../../images/bleach.jpg'; 
import useFetch from "../../hooks/UseFetch";
export default function Profile()
{
    const userId=localStorage.getItem("userId");
    const {data:userData,loading,error}=useFetch(`/api/specificUser/${userId}`);
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