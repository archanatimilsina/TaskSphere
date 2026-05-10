import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

export default function UserLogout() {
    const navigate = useNavigate();
    const [showLogOutModal, setShowLogOutModal] = useState(true);

    const ConfirmLogOut = async () => {
        const token = localStorage.getItem("token");
        
        try {
            // Securely terminate the session on the backend
            const response = await fetch("http://localhost:8000/api/logout", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            
            const data = await response.json();
            
            // Successfully logged out from server
            if (data.status === true) {
                localStorage.clear();
                navigate("/loginView");
            } else {
                // If the server returns a failure status, we clear locally anyway for security
                localStorage.clear();
                navigate("/loginView");
            }
        } catch (error) {
            console.error("Logout Request Failed:", error);
            // Fallback: Ensure the client-side session is destroyed even if offline
            localStorage.clear();
            navigate("/loginView");
        }
    };

    const closeModal = () => {
        setShowLogOutModal(false);
        navigate("/userDash");
    };

    if (!showLogOutModal) return null;

    return (
        <UserLogoutContainer>
            <div className="ModalOverlay" onClick={closeModal}>
                <div className="LogoutCard" onClick={(e) => e.stopPropagation()}>
                    <header className="CardHeader">
                        <div className="IconContainer">
                            <i className="fa-solid fa-arrow-right-from-bracket"></i>
                        </div>
                        <button className="close-btn" onClick={closeModal}>&times;</button>
                    </header>
                    
                    <main className="CardBody">
                        <h2>Terminate Session?</h2>
                        <p>You are about to sign out. All unsaved progress in your active workspaces may be lost. Do you wish to proceed?</p>
                    </main>

                    <footer className="CardFooter">
                        <button className="confirm-btn" onClick={ConfirmLogOut}>
                            Confirm Logout
                        </button>
                        <button className="cancel-btn" onClick={closeModal}>
                            Return to Dashboard
                        </button>
                    </footer>
                </div>
            </div>
        </UserLogoutContainer>
    );
}

const UserLogoutContainer = styled.div`
  font-family: 'Baloo 2', cursive;

  .ModalOverlay {
    position: fixed;
    inset: 0;
    background: rgba(15, 23, 42, 0.8);
    backdrop-filter: blur(8px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
    animation: overlayFade 0.3s ease-out;
  }

  .LogoutCard {
    background: white;
    width: 95%;
    max-width: 400px;
    border-radius: 32px;
    padding: 40px;
    box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.3);
    position: relative;
    animation: cardEntrance 0.4s cubic-bezier(0.17, 0.67, 0.83, 0.67);
  }

  .CardHeader {
    display: flex;
    justify-content: center;
    margin-bottom: 25px;
    
    .IconContainer {
      width: 70px;
      height: 70px;
      background: #fef2f2;
      color: #ef4444;
      border-radius: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.8rem;
      transform: rotate(-10deg);
    }

    .close-btn {
      position: absolute;
      top: 0;
      right: 0;
      background: none;
      border: none;
      font-size: 2rem;
      color: #cbd5e1;
      cursor: pointer;
      transition: 0.2s;
      &:hover { color: #64748b; }
    }
  }

  .CardBody {
    text-align: center;
    margin-bottom: 35px;

    h2 {
      color: #1e293b;
      font-size: 1.6rem;
      font-weight: 800;
      margin: 0 0 10px 0;
    }

    p {
      color: #94a3b8;
      font-size: 1rem;
      line-height: 1.6;
      margin: 0;
    }
  }

  .CardFooter {
    display: flex;
    flex-direction: column;
    gap: 12px;

    button {
      width: 100%;
      padding: 16px;
      border-radius: 16px;
      font-size: 1rem;
      font-weight: 800;
      font-family: inherit;
      cursor: pointer;
      transition: all 0.3s ease;
      border: none;
    }

    .confirm-btn {
      background: #ef4444;
      color: white;
      &:hover {
        background: #dc2626;
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(239, 68, 68, 0.2);
      }
    }

    .cancel-btn {
      background: #f8fafc;
      color: #64748b;
      &:hover {
        background: #f1f5f9;
        color: #1e293b;
      }
    }
  }

  @keyframes overlayFade {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes cardEntrance {
    from { 
        opacity: 0; 
        transform: scale(0.9) translateY(30px); 
    }
    to { 
        opacity: 1; 
        transform: scale(1) translateY(0); 
    }
  }
`;