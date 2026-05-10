import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

export default function PmLogout() {
    const navigate = useNavigate();
    const [showLogOutModal, setShowLogOutModal] = useState(true);

    const ConfirmLogOut = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch("http://localhost:8000/api/logout", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            
            if (data.status === true) {
                localStorage.clear();
                navigate("/loginView");
            }
        } catch (error) {
            console.error("Error during logout:", error);
            // Fallback for UI if API fails but session should end
            localStorage.clear();
            navigate("/loginView");
        }
    };

    const closeModal = () => {
        setShowLogOutModal(false);
        navigate(-1); // Returns user to previous page
    };

    return (
        <PmLogoutContainer>
            {showLogOutModal && (
                <div className="LogoutOverlay">
                    <div className="LogoutCard">
                        <div className="IconSection">
                            <i className="fas fa-sign-out-alt"></i>
                        </div>
                        
                        <div className="TextSection">
                            <h3>Confirm Logout</h3>
                            <p>Are you sure you want to end your session? You will need to log back in to manage your workspaces and projects.</p>
                        </div>

                        <div className="ActionButtons">
                            <button className="confirm-btn" onClick={ConfirmLogOut}>
                                Yes, Logout
                            </button>
                            <button className="cancel-btn" onClick={closeModal}>
                                Stay Logged In
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </PmLogoutContainer>
    );
}

const PmLogoutContainer = styled.div`
  font-family: 'Baloo 2', cursive;

  .LogoutOverlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(15, 23, 42, 0.85); /* Deep slate semi-transparent */
    backdrop-filter: blur(8px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    padding: 20px;
  }

  .LogoutCard {
    background: white;
    width: 100%;
    max-width: 450px;
    padding: 50px 40px;
    border-radius: 24px;
    text-align: center;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
    animation: slideUp 0.3s ease-out;

    @keyframes slideUp {
        from { transform: translateY(20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
  }

  .IconSection {
    width: 80px;
    height: 80px;
    background: #fee2e2;
    color: #ef4444;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    margin: 0 auto 25px;
  }

  .TextSection {
    h3 {
      font-size: 1.8rem;
      color: #0f172a;
      margin-bottom: 12px;
    }
    p {
      color: #64748b;
      font-size: 1.05rem;
      line-height: 1.6;
      margin-bottom: 35px;
    }
  }

  .ActionButtons {
    display: flex;
    flex-direction: column;
    gap: 12px;

    button {
      width: 100%;
      padding: 14px;
      border-radius: 12px;
      font-size: 1.1rem;
      font-weight: 800;
      cursor: pointer;
      transition: all 0.2s;
      font-family: inherit;
    }

    .confirm-btn {
      background: #ef4444;
      color: white;
      border: none;
      &:hover {
        background: #dc2626;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(239, 68, 68, 0.2);
      }
    }

    .cancel-btn {
      background: #f1f5f9;
      color: #64748b;
      border: none;
      &:hover {
        background: #e2e8f0;
        color: #1e293b;
      }
    }
  }
`;