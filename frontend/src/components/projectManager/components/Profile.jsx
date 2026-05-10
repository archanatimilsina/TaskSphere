import React from "react";
import styled from 'styled-components';
import useFetch from "../../../hooks/useFetch";
import bleachImg from '../../../assets/bleach.jpg'; 

export default function PmProfile() {
  const userId = 84;
  const { data: userData, loading, error } = useFetch(`http://localhost:8000/api/specificUser/${userId}`);

  if (loading) return <StatusBox>Fetching secure profile data...</StatusBox>;
  if (error) return <StatusBox className="error">Access Error: {error}</StatusBox>;
  
  const user = userData?.data;
  if (!user) return <StatusBox>No user profile records found.</StatusBox>;

  return (
    <ProfileContainer>
      <div className="profile-header">
        <div className="cover-photo"></div>
        <div className="profile-main">
          <div className="avatar-section">
            <img src={bleachImg} alt="Profile" className="main-avatar" />
            <div className="role-badge">{user.role}</div>
          </div>
          <div className="name-section">
            <h1>{user.fname} {user.lname}</h1>
            <p className="subtitle">Member of Tasksphere Organization</p>
          </div>
          <button className="update-btn">
            <i className="fas fa-user-edit"></i> Edit Profile
          </button>
        </div>
      </div>

      <div className="info-grid">
        <section className="info-card">
          <h3><i className="fas fa-info-circle"></i> Personal Information</h3>
          <div className="detail-row">
            <span className="label">Full Name:</span>
            <span className="value">{user.fname} {user.lname}</span>
          </div>
          <div className="detail-row">
            <span className="label">Gender:</span>
            <span className="value">{user.gender}</span>
          </div>
          <div className="detail-row">
            <span className="label">Residential Address:</span>
            <span className="value">{user.address}</span>
          </div>
        </section>

        <section className="info-card">
          <h3><i className="fas fa-address-book"></i> Contact Details</h3>
          <div className="detail-row">
            <span className="label">Email Address:</span>
            <span className="value">{user.email}</span>
          </div>
          <div className="detail-row">
            <span className="label">Phone Number:</span>
            <span className="value">{user.phone}</span>
          </div>
        </section>

        <section className="info-card full-width">
          <h3><i className="fas fa-id-card"></i> Verified Credentials</h3>
          <div className="card-images">
            <div className="id-preview">
              <p>Citizen Card (Front)</p>
              <img src={user.citizenCardFront} alt="ID Front" />
            </div>
            <div className="id-preview">
              <p>Citizen Card (Back)</p>
              <img src={user.citizenCardBack} alt="ID Back" />
            </div>
          </div>
        </section>
      </div>
    </ProfileContainer>
  );
}

const StatusBox = styled.div`
  text-align: center;
  padding: 100px;
  font-family: 'Baloo 2', cursive;
  color: #64748b;
  &.error { color: #ef4444; }
`;

const ProfileContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  font-family: 'Baloo 2', cursive;

  .profile-header {
    background: white;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 10px 25px rgba(0,0,0,0.05);
    margin-bottom: 30px;
    border: 1px solid #f1f5f9;

    .cover-photo {
      height: 140px;
      background: linear-gradient(135deg, #1e293b 0%, #3b82f6 100%);
    }

    .profile-main {
      padding: 0 40px 40px;
      display: flex;
      align-items: flex-end;
      gap: 30px;
      margin-top: -60px;
      position: relative;

      .avatar-section {
        position: relative;
        .main-avatar {
          width: 150px;
          height: 150px;
          border-radius: 30px;
          border: 6px solid white;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          object-fit: cover;
          background: #f8fafc;
        }
        .role-badge {
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          background: #3b82f6;
          color: white;
          padding: 4px 15px;
          border-radius: 20px;
          font-weight: 800;
          font-size: 0.8rem;
          text-transform: uppercase;
        }
      }

      .name-section {
        flex: 1;
        padding-bottom: 10px;
        h1 { margin: 0; font-size: 2.2rem; color: #0f172a; }
        .subtitle { margin: 0; color: #64748b; font-size: 1.1rem; }
      }

      .update-btn {
        margin-bottom: 10px;
        background: #22c55e;
        color: white;
        border: none;
        padding: 12px 25px;
        border-radius: 12px;
        font-weight: 700;
        cursor: pointer;
        font-family: inherit;
        transition: 0.2s;
        &:hover { background: #16a34a; transform: translateY(-2px); }
      }
    }
  }

  .info-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 25px;

    .info-card {
      background: white;
      padding: 30px;
      border-radius: 24px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.03);
      border: 1px solid #f1f5f9;

      &.full-width { grid-column: 1 / -1; }

      h3 {
        margin: 0 0 20px 0;
        font-size: 1.3rem;
        color: #1e293b;
        display: flex;
        align-items: center;
        gap: 10px;
        i { color: #3b82f6; }
      }

      .detail-row {
        display: flex;
        justify-content: space-between;
        padding: 12px 0;
        border-bottom: 1px solid #f8fafc;
        &:last-child { border: none; }

        .label { color: #94a3b8; font-weight: 600; }
        .value { color: #334155; font-weight: 700; }
      }

      .card-images {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
        margin-top: 10px;

        .id-preview {
          background: #f8fafc;
          padding: 15px;
          border-radius: 15px;
          text-align: center;
          p { margin-bottom: 10px; font-weight: 700; color: #64748b; }
          img {
            width: 100%;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.05);
          }
        }
      }
    }
  }

  @media (max-width: 768px) {
    .profile-main { flex-direction: column; align-items: center; text-align: center; }
    .info-grid { grid-template-columns: 1fr; }
    .card-images { grid-template-columns: 1fr; }
  }
`;