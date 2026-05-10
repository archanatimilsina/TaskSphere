import React from "react";
import styled from 'styled-components';
import useFetch from "../../../hooks/useFetch";
import bleachImg from '../../../assets/bleach.jpg'; 

export default function AdminProfile() {
    const userId = localStorage.getItem("userId");
    const { data: userData, loading, error } = useFetch(`http://localhost:8000/api/specificUser/${userId}`);

    if (loading) return <StatusMessage>Loading your profile details...</StatusMessage>;
    if (error) return <StatusMessage className="error">Error loading profile data. Please try again later.</StatusMessage>;

    // Supporting both {data: {...}} and direct {...} responses
    const user = userData?.data || userData;

    if (!user) return <StatusMessage>No user data found.</StatusMessage>;

    return (
        <ProfileContainer>
            <div className="profile-header">
                <div className="avatar-section">
                    <div className="profilePic">
                        <img src={bleachImg} alt="User Avatar" />
                        <div className="status-indicator"></div>
                    </div>
                </div>
            </div>

            <div className="profileDetails">
                <div className="title-section">
                    <h2>{user.fname} {user.lname}</h2>
                    <span className="role-tag">{user.role}</span>
                </div>

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
                        <label>Phone Number</label>
                        <p>{user.phone}</p>
                    </div>
                    <div className="info-item">
                        <label>Home Address</label>
                        <p>{user.address}</p>
                    </div>
                    <div className="info-item">
                        <label>Gender</label>
                        <p>{user.gender}</p>
                    </div>
                    <div className="info-item">
                        <label>Account Status</label>
                        <p>Active</p>
                    </div>
                </div>

                <hr className="section-divider" />

                <div className="documents-section">
                    <h3>Identification Documents</h3>
                    <div className="card-grid">
                        <div className="doc-card">
                            <p>Citizen Card (Front)</p>
                            <div className="img-wrapper">
                                <img src={user.citizenCardFront} alt="Citizen Card Front" />
                            </div>
                        </div>
                        <div className="doc-card">
                            <p>Citizen Card (Back)</p>
                            <div className="img-wrapper">
                                <img src={user.citizenCardBack} alt="Citizen Card Back" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="action-footer">
                    <button className="updateInfo">
                        <i className="fas fa-user-edit"></i> Update Profile Information
                    </button>
                </div>
            </div>
        </ProfileContainer>
    );
}

const StatusMessage = styled.div`
    text-align: center;
    padding: 100px;
    font-family: 'Baloo 2', cursive;
    font-size: 1.2rem;
    color: #64748b;
    &.error { color: #ef4444; }
`;

const ProfileContainer = styled.div`
    max-width: 900px;
    margin: 40px auto;
    font-family: 'Baloo 2', sans-serif;
    padding-bottom: 50px;

    .profile-header {
        position: relative;
        height: 150px;
        background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
        border-radius: 24px 24px 0 0;
    }

    .avatar-section {
        position: absolute;
        bottom: -60px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 2;
    }

    .profilePic {
        width: 160px;
        height: 160px;
        border-radius: 50%;
        border: 6px solid #fff;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        position: relative;
        background: #f1f5f9;

        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            object-fit: cover;
        }

        .status-indicator {
            position: absolute;
            bottom: 12px;
            right: 12px;
            width: 24px;
            height: 24px;
            background: #22c55e;
            border: 4px solid #fff;
            border-radius: 50%;
        }
    }

    .profileDetails {
        background: #fff;
        border-radius: 0 0 24px 24px;
        padding: 80px 40px 40px;
        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.05);

        .title-section {
            text-align: center;
            margin-bottom: 40px;

            h2 {
                font-size: 2.2rem;
                color: #0f172a;
                margin: 0;
            }

            .role-tag {
                display: inline-block;
                padding: 4px 16px;
                background: #eff6ff;
                color: #3b82f6;
                border-radius: 20px;
                font-weight: 700;
                margin-top: 8px;
            }
        }
    }

    .info-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 30px;
        margin-bottom: 40px;
    }

    .info-item {
        label {
            display: block;
            color: #94a3b8;
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-weight: 700;
            margin-bottom: 4px;
        }
        p {
            color: #334155;
            font-size: 1.15rem;
            font-weight: 500;
            margin: 0;
        }
    }

    .section-divider {
        border: 0;
        height: 1px;
        background: #f1f5f9;
        margin: 40px 0;
    }

    .documents-section {
        h3 {
            color: #1e293b;
            font-size: 1.3rem;
            margin-bottom: 25px;
        }

        .card-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;

            @media (max-width: 600px) {
                grid-template-columns: 1fr;
            }
        }

        .doc-card {
            background: #f8fafc;
            padding: 15px;
            border-radius: 16px;
            text-align: center;

            p {
                font-weight: 700;
                color: #64748b;
                margin-bottom: 12px;
                font-size: 0.9rem;
            }

            .img-wrapper {
                height: 180px;
                border-radius: 12px;
                overflow: hidden;
                border: 2px solid #e2e8f0;

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }
        }
    }

    .action-footer {
        margin-top: 50px;
        text-align: center;
    }

    .updateInfo {
        width: 100%;
        max-width: 400px;
        padding: 16px;
        background: #22c55e;
        color: white;
        border: none;
        border-radius: 14px;
        font-size: 1.1rem;
        font-weight: 700;
        font-family: inherit;
        cursor: pointer;
        transition: all 0.2s;
        box-shadow: 0 4px 15px rgba(34, 197, 94, 0.2);

        i { margin-right: 8px; }

        &:hover {
            background: #16a34a;
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(34, 197, 94, 0.3);
        }
    }
`;