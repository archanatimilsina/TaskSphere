import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

export default function UserLogout() {
    const navigate = useNavigate();
    const [showLogOutModal, setShowLogOutModal] = useState(true);

    const ConfirmLogOut = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch("/api/logout", {
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
            // Fallback: Clear local storage even if API fails to ensure session ends
            localStorage.clear();
            navigate("/loginView");
        }
    };

    const closeModal = () => {
        setShowLogOutModal(false);
        navigate("/userDash");
    };

    return (
        <UserLogoutContainer>
            {showLogOutModal && (
                <div className="ModalOverlay">
                    <div className="LogoutCard">
                        <div className="CardHeader">
                            <div className="IconCircle">
                                <i className="fas fa-sign-out-alt"></i>
                            </div>
                            <span className="close-x" onClick={closeModal}>&times;</span>
                        </div>
                        
                        <div className="CardBody">
                            <h2>Confirm Logout</h2>
                            <p>Are you sure you want to sign out of your account? You will need to login again to access your dashboard.</p>
                        </div>

                        <div className="CardFooter">
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
        </UserLogoutContainer>
    );
}

const UserLogoutContainer = styled.div`
  .ModalOverlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(15, 23, 42, 0.75);
    backdrop-filter: blur(4px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    animation: fadeIn 0.3s ease-out;
  }

  .LogoutCard {
    background: white;
    width: 90%;
    max-width: 420px;
    border-radius: 24px;
    padding: 35px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    position: relative;
    transform: translateY(0);
    animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .CardHeader {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    position: relative;
  }

  .IconCircle {
    width: 60px;
    height: 60px;
    background: #fee2e2;
    color: #ef4444;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
  }

  .close-x {
    position: absolute;
    right: -10px;
    top: -15px;
    font-size: 28px;
    color: #94a3b8;
    cursor: pointer;
    transition: color 0.2s;
    &:hover { color: #1e293b; }
  }

  .CardBody {
    text-align: center;
    margin-bottom: 30px;

    h2 {
      color: #0f172a;
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 12px;
    }

    p {
      color: #64748b;
      font-size: 1rem;
      line-height: 1.5;
    }
  }

  .CardFooter {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  button {
    width: 100%;
    padding: 14px;
    border-radius: 12px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    border: none;
  }

  .confirm-btn {
    background: #ef4444;
    color: white;
    &:hover {
      background: #dc2626;
      box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
      transform: translateY(-1px);
    }
  }

  .cancel-btn {
    background: #f1f5f9;
    color: #475569;
    &:hover {
      background: #e2e8f0;
      color: #1e293b;
    }
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
`;