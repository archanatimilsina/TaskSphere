import React from "react";
import { Link, Outlet } from "react-router-dom";
import "../assets/css/layoutUser.css";

export default function LayoutUser() {
  return (
    <>
       <div className="sidebar" id="sidebar">
        <h2>Tasksphere</h2>
        <Link to="userDash">Dashboard</Link>
        <Link to="projects">Projects</Link>
        <Link to="workspaces">Workspaces</Link>
        <Link to="tasks">Tasks</Link>
        <Link to="comments">Discussion Forum</Link>
        <Link to="notices">Notices</Link>
        <Link to="profile">Profile</Link>
        <Link to="UserLogout">Logout</Link>

      </div>
      <div id="main">
        <Outlet />
      </div>
    </>
  );
}
