import React from "react";
import { Link, Outlet } from "react-router-dom";
import "../assets/css/LayoutAdmin.css";

export default function LayoutAdmin() {
  return (
    <>
       <div className="sidebar" id="sidebar">
        <h2>Tasksphere</h2>
        <Link to="/adminDash">Dashboard</Link>
        <Link to="comments">Discussion Forum</Link>
        <Link to="createNotices">Create Notices</Link>
        <Link to="notices">Notices</Link>
        <Link to="employees">Employees</Link>
        <Link to="registerApplication">Register Application</Link>
        <Link to="sendEmail">Send Email</Link>
        <Link to="adminLogout">Logout</Link>
      </div>
      <div id="main">
        <Outlet />
      </div>
    </>
  );
}
