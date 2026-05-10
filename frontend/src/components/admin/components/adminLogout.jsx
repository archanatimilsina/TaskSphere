import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

export default function AdminLogout() {
    const navigate = useNavigate();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const ConfirmLogOut = async () => {
        setIsLoggingOut(true);
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
                // Redirecting to login view
                navigate("/loginView"); 
            } else {
                // If API fails, clear local storage anyway for security and redirect
                localStorage.clear();
                navigate("/loginView");
            }
        } catch (error) {
            console.error("Error during logout:", error);
            // Fallback: clear local storage if network fails
            localStorage.clear();
            navigate("/loginView");
        }
    };

    const handleCancel = () => {
        navigate("/admin/adminDash");
    };

    return (
        <LogoutOverlay>
            <div className="logout-card">
                <div className="icon-wrapper">
                    <i className="fa-solid fa-right-from-bracket"></i>
                </div>
                <h2>Confirm Logout</h2>
                <p>Are you sure you want to log out of Tasksphere? You will need to enter your credentials to access your dashboard again.</p>
                
                <div className="button-group">
                    <button 
                        className="confirm-btn" 
                        onClick={ConfirmLogOut} 
                        disabled={isLoggingOut}
                    >
                        {isLoggingOut ? "Logging out..." : "Yes, Log out"}
                    </button>
                    <button 
                        className="cancel-btn" 
                        onClick={handleCancel}
                        disabled={isLoggingOut}
                    >
                        Stay Logged In
                    </button>
                </div>
            </div>
        </LogoutOverlay>
    );
}

const LogoutOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(15, 23, 42, 0.8); // Deep blue-slate overlay
    backdrop-filter: blur(8px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    font-family: 'Baloo 2', cursive;

    .logout-card {
        background: white;
        width: 90%;
        max-width: 450px;
        padding: 40px;
        border-radius: 24px;
        text-align: center;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2);
        animation: slideUp 0.3s ease-out;
    }

    @keyframes slideUp {
        from { transform: translateY(20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }

    .icon-wrapper {
        width: 80px;
        height: 80px;
        background-color: #fee2e2;
        color: #ef4444;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 20px;
        font-size: 2rem;
    }

    h2 {
        color: #1e293b;
        font-size: 1.8rem;
        margin-bottom: 12px;
        font-weight: 800;
    }

    p {
        color: #64748b;
        font-size: 1.05rem;
        line-height: 1.5;
        margin-bottom: 30px;
    }

    .button-group {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    button {
        width: 100%;
        padding: 14px;
        border-radius: 12px;
        font-size: 1.1rem;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.2s ease;
        border: none;
    }

    .confirm-btn {
        background-color: #ef4444;
        color: white;
        box-shadow: 0 4px 12px rgba(239, 68, 68, 0.2);

        &:hover {
            background-color: #dc2626;
            transform: translateY(-2px);
        }

        &:disabled {
            background-color: #fca5a5;
            cursor: not-allowed;
        }
    }

    .cancel-btn {
        background-color: #f1f5f9;
        color: #475569;

        &:hover {
            background-color: #e2e8f0;
            color: #1e293b;
        }
    }
`;