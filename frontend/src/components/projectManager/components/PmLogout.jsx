import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../assets/css/pmLogout.css';

export default function PmLogout() {
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
            console.log(data);
            if (data.status === true) {
                localStorage.clear();
                navigate("/loginView"); // Navigate to login view
            }
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    const gotoDashboard = () => {
        navigate("/projectManagerDash");
    };

    return (
        <>
            {showLogOutModal && (
                <div className="EmployeeModal">
                    <div className="EmployeeModal-content">
                        <span className="close" onClick={() => setShowLogOutModal(false)}>&times;</span>
                        <div className="EmployeeModal-body">
                            Are you sure you want to logout?
                        </div>
                        <div className="EmployeeModal-footer">
                            <button className="deleteBtn" onClick={ConfirmLogOut}>Log out</button>
                            <button className="cancelBtn" onClick={gotoDashboard}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
