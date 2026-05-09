import React from "react";
import styled from 'styled-components';
import bleachImg from '../../../../images/bleach.jpg'; 
import useFetch from "../../hooks/UseFetch";

export default function Profile() {
    // Dynamically get ID or fallback to 84
    const userId = localStorage.getItem("userId") || 84;
    const { data: userData, loading, error } = useFetch(`/api/specificUser/${userId}`);

    if (loading) {
        return <StatusWrapper>Loading profile...</StatusWrapper>;
    }

    if (error) {
        return <StatusWrapper className="error">Error loading profile data. Please try again later.</StatusWrapper>;
    }

    if (!userData || !userData.data) {
        return <StatusWrapper>No user data found.</StatusWrapper>;
    }

    const user = userData.data;

    return (
        <ProfileContainer>
            <div className="profileHeader">
                <div className="profilePic">
                    <img src={bleachImg} alt="Profile" />
                </div>
            </div>

            <div className="profileDetails">
                <h2>{user.fname} {user.lname}'s Profile</h2>
                
                <div className="infoGrid">
                    <p><strong>Name:</strong> {user.fname} {user.lname}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Phone:</strong> {user.phone}</p>
                    <p><strong>Role:</strong> {user.role}</p>
                    <p><strong>Gender:</strong> {user.gender}</p>
                    <p><strong>Address:</strong> {user.address}</p>
                </div>

                <div className="cardSection">
                    <div className="cardContainer">
                        <p><strong>Citizen Card (Front)</strong></p>
                        <img src={user.citizenCardFront} alt="Citizen Card Front" />
                    </div>
                    <div className="cardContainer">
                        <p><strong>Citizen Card (Back)</strong></p>
                        <img src={user.citizenCardBack} alt="Citizen Card Back" />
                    </div>
                </div>

                <button className="updateInfo">Update Info</button>
            </div>
        </ProfileContainer>
    );
}

const StatusWrapper = styled.div`
    text-align: center;
    padding: 50px;
    font-size: 1.2rem;
    font-family: 'Baloo 2', cursive;
    &.error { color: #ef4444; }
`;

const ProfileContainer = styled.div`
    max-width: 800px;
    margin: 50px auto;
    padding: 20px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

    .profileHeader {
        display: flex;
        justify-content: center;
        position: relative;
        z-index: 2;
    }

    .profilePic {
        width: 250px;
        height: 250px;
        border-radius: 50%;
        box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.2);
        background-color: #fff;
        border: 5px solid white;
        overflow: hidden;
        
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .profileDetails {
        background: white;
        box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
        border-radius: 40px;
        padding: 130px 50px 50px 50px;
        margin-top: -125px; /* Pulls the card under the photo */
        position: relative;
        z-index: 1;

        h2 {
            font-size: 2.2rem;
            color: #1e293b;
            text-align: center;
            margin-bottom: 30px;
            font-family: 'Baloo 2', cursive;
        }
    }

    .infoGrid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
        margin-bottom: 30px;

        p {
            font-size: 1rem;
            color: #475569;
            border-bottom: 1px solid #f1f5f9;
            padding-bottom: 8px;
            
            strong {
                color: #1e293b;
                margin-right: 10px;
            }
        }

        @media (max-width: 600px) {
            grid-template-columns: 1fr;
        }
    }

    .cardSection {
        display: flex;
        gap: 20px;
        justify-content: center;
        margin: 30px 0;

        @media (max-width: 600px) {
            flex-direction: column;
            align-items: center;
        }
    }

    .cardContainer {
        text-align: center;
        flex: 1;

        p {
            margin-bottom: 10px;
            font-weight: 600;
            color: #64748b;
        }

        img {
            width: 100%;
            max-width: 300px;
            height: 180px;
            object-fit: cover;
            border-radius: 12px;
            border: 1px solid #e2e8f0;
            box-shadow: 0 4px 6px rgba(0,0,0,0.05);
        }
    }

    .updateInfo {
        width: 100%;
        height: 55px;
        border-radius: 15px;
        margin-top: 20px;
        color: white;
        background-color: #10b981;
        border: none;
        font-size: 1.2rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);

        &:hover {
            background-color: #059669;
            transform: translateY(-2px);
            box-shadow: 0 6px 15px rgba(16, 185, 129, 0.4);
        }

        &:active {
            transform: translateY(0);
        }
    }
`;