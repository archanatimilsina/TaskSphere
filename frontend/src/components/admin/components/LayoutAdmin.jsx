import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import styled from 'styled-components';

const LayoutAdminContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  font-family: 'Baloo 2', cursive; /* Matches your HTML font */

  .sidebar {
    width: 250px;
    background-color: #1e293b;
    color: white;
    display: flex;
    flex-direction: column;
    padding: 20px;
    flex-shrink: 0; /* Prevents sidebar from shrinking */
  }

  .sidebar h2 {
    margin-bottom: 30px;
    font-size: 24px;
    text-align: center;
    font-weight: 500;
  }

  .sidebar a {
    padding: 12px 20px;
    margin: 5px 0;
    color: #cbd5e1;
    text-decoration: none;
    display: block;
    border-radius: 5px;
    transition: all 0.2s ease;
  }

  .sidebar a:hover {
    background-color: #334155;
    color: white;
  }

  /* Style for the currently active link */
  .sidebar a.active {
    background-color: #4f46e5;
    color: white;
  }

  #main {
    flex: 1;
    padding: 20px;
    background-color: #f1f5f9;
    overflow-y: auto;
    position: relative;
  }
`;

export default function LayoutAdmin() {
  const location = useLocation();

  // Helper function to check if a link is active
  const isActive = (path) => location.pathname === path ? "active" : "";

  return (
    <LayoutAdminContainer>
      <div className="sidebar">
        <h2>Tasksphere</h2>
        
        <Link to="/admin/adminDash" className={isActive("/admin/adminDash")}>
          <i className="fas fa-th-large"></i> Dashboard
        </Link>
        
        <Link to="/admin/attendances" className={isActive("/admin/attendances")}>
          <i className="fas fa-calendar-check"></i> Attendance
        </Link>
        
        <Link to="/admin/comments" className={isActive("/admin/comments")}>
          <i className="fas fa-comments"></i> Discussion Forum
        </Link>
        
        <Link to="/admin/createNotices" className={isActive("/admin/createNotices")}>
          <i className="fas fa-plus-circle"></i> Create Notices
        </Link>
        
        <Link to="/admin/notices" className={isActive("/admin/notices")}>
          <i className="fas fa-bullhorn"></i> Notices
        </Link>
        
        <Link to="/admin/employees" className={isActive("/admin/employees")}>
          <i className="fas fa-users"></i> Employees
        </Link>
        
        <Link to="/admin/registerApplication" className={isActive("/admin/registerApplication")}>
          <i className="fas fa-user-plus"></i> Register Application
        </Link>
        
        <Link to="/admin/sendEmail" className={isActive("/admin/sendEmail")}>
          <i className="fas fa-envelope"></i> Send Email
        </Link>
        
        <div style={{ marginTop: 'auto' }}>
          <Link to="/admin/settings">
             <i className="fas fa-cog"></i> Settings
          </Link>
          <Link to="/admin/adminLogout">
             <i className="fas fa-sign-out-alt"></i> Logout
          </Link>
        </div>
      </div>

      <div id="main">
        <Outlet />
      </div>
    </LayoutAdminContainer>
  );
}