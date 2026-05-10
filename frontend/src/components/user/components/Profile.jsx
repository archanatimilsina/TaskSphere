import React from "react";
import styled from 'styled-components';
import useFetch from "../../../hooks/useFetch";

export default function UserProfile() {
    // Retrieve authenticated user ID
    const userId = localStorage.getItem("userId") || 84;
    const { data: userData, loading, error } = useFetch(`http://localhost:8000/api/specificUser/${userId}`);

    if (loading) {
        return <StatusWrapper>Synchronizing profile data...</StatusWrapper>;
    }

    if (error) {
        return <StatusWrapper className="error">Connectivity Error: Unable to fetch profile.</StatusWrapper>;
    }

    const user = userData?.data;

    if (!user) {
        return <StatusWrapper>Account records not found.</StatusWrapper>;
    }

    return (
        <ProfileContainer>
            <div className="profile-header">
                <div className="avatar-frame">
                    <img 
                        src={user.profile || `https://ui-avatars.com/api/?name=${user.fname}+${user.lname}&background=10b981&color=fff&size=250`} 
                        alt="User Profile" 
                    />
                </div>
            </div>

            <div className="profile-card">
                <header className="card-header">
                    <h2>{user.fname} {user.lname}</h2>
                    <span className="role-badge">{user.role || 'Team Member'}</span>
                </header>
                
                <div className="info-section">
                    <h3 className="section-title"><i className="fas fa-user-circle"></i> Personal Particulars</h3>
                    <div className="info-grid">
                        <div className="info-item">
                            <label>Full Name</label>
                            <p>{user.fname} {user.lname}</p>
                        </div>
                        <div className="info-item">
                            <label>Email Address</label>
                            <p>{user.email}</p>
                        </div>
                        <div className="info-item">
                            <label>Primary Phone</label>
                            <p>{user.phone || 'N/A'}</p>
                        </div>
                        <div className="info-item">
                            <label>Gender Identity</label>
                            <p>{user.gender || 'Not Specified'}</p>
                        </div>
                        <div className="info-item full-row">
                            <label>Residential Address</label>
                            <p>{user.address || 'Address not listed'}</p>
                        </div>
                    </div>
                </div>

                <div className="document-section">
                    <h3 className="section-title"><i className="fas fa-id-card"></i> Identification Documents</h3>
                    <div className="card-display">
                        <div className="document-box">
                            <p>Citizen Card (Front)</p>
                            <div className="image-wrapper">
                                <img src={user.citizenCardFront || "https://placehold.co/600x400?text=No+Front+Image"} alt="Front" />
                            </div>
                        </div>
                        <div className="document-box">
                            <p>Citizen Card (Back)</p>
                            <div className="image-wrapper">
                                <img src={user.citizenCardBack || "https://placehold.co/600x400?text=No+Back+Image"} alt="Back" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="actions">
                    <button className="edit-btn">
                        <i className="fas fa-user-edit"></i> Modify Profile Details
                    </button>
                </div>
            </div>
        </ProfileContainer>
    );
}

const StatusWrapper = styled.div`
    text-align: center;
    padding: 100px;
    font-size: 1.2rem;
    font-family: 'Baloo 2', cursive;
    color: #64748b;
    &.error { color: #ef4444; }
`;

const ProfileContainer = styled.div`
    max-width: 850px;
    margin: 60px auto;
    padding: 0 20px;
    font-family: 'Baloo 2', cursive;

    .profile-header {
        display: flex;
        justify-content: center;
        position: relative;
        z-index: 2;
    }

    .avatar-frame {
        width: 220px;
        height: 220px;
        border-radius: 60px; /* Modern squircle shape */
        background: white;
        padding: 8px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        transform: rotate(-3deg);
        
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 52px;
        }
    }

    .profile-card {
        background: white;
        border-radius: 40px;
        padding: 120px 50px 50px;
        margin-top: -110px;
        box-shadow: 0 10px 50px rgba(0, 0, 0, 0.03);
        border: 1px solid #f1f5f9;
        position: relative;
        z-index: 1;
    }

    .card-header {
        text-align: center;
        margin-bottom: 45px;
        
        h2 {
            font-size: 2.4rem;
            color: #0f172a;
            margin: 0;
        }
        
        .role-badge {
            display: inline-block;
            margin-top: 10px;
            background: #f0fdf4;
            color: #10b981;
            padding: 5px 18px;
            border-radius: 50px;
            font-weight: 800;
            text-transform: uppercase;
            font-size: 0.85rem;
            letter-spacing: 0.5px;
        }
    }

    .section-title {
        font-size: 1.1rem;
        color: #1e293b;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        gap: 10px;
        border-bottom: 2px solid #f8fafc;
        padding-bottom: 10px;
        i { color: #10b981; }
    }

    .info-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 25px;
        margin-bottom: 50px;
    }

    .full-row { grid-column: span 2; }

    .info-item {
        label {
            display: block;
            font-size: 0.85rem;
            color: #94a3b8;
            font-weight: 700;
            margin-bottom: 4px;
        }
        p {
            font-size: 1.1rem;
            color: #334155;
            margin: 0;
            font-weight: 500;
        }
    }

    .card-display {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
        margin-top: 20px;
    }

    .document-box {
        p {
            font-size: 0.9rem;
            color: #64748b;
            margin-bottom: 10px;
            text-align: center;
        }
        .image-wrapper {
            height: 180px;
            border-radius: 20px;
            overflow: hidden;
            border: 2px dashed #e2e8f0;
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
    }

    .edit-btn {
        width: 100%;
        padding: 16px;
        border-radius: 18px;
        margin-top: 40px;
        background: #10b981;
        color: white;
        border: none;
        font-size: 1.2rem;
        font-weight: 800;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        transition: 0.3s;
        box-shadow: 0 10px 25px rgba(16, 185, 129, 0.2);

        &:hover {
            background: #059669;
            transform: translateY(-3px);
            box-shadow: 0 15px 30px rgba(16, 185, 129, 0.3);
        }
    }

    @media (max-width: 700px) {
        .info-grid, .card-display { grid-template-columns: 1fr; }
        .full-row { grid-column: auto; }
        .profile-card { padding: 100px 25px 40px; }
    }
`;