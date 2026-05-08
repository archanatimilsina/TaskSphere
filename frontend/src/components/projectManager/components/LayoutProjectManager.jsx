import React from "react";
import { Link, Outlet } from "react-router-dom";
import "../assets/css/layoutProjectManager.css";

export default function LayoutProjectManager() {
  return (
    <>
       <div className="sidebar" id="sidebar">
        <h2>Tasksphere</h2>
        <Link to="projectManagerDash">Dashboard</Link>
        <Link to="projects">Projects</Link>
        <Link to="workspaces">Workspaces</Link>
        <Link to="tasks">Tasks</Link>
        <Link to="comments">Discussion Forum</Link>
        <Link to="notices">Notices</Link>
        <Link to="members">Employees</Link>
        <Link to="#">Logout</Link>

      </div>
      <div id="main">
        <Outlet />
      </div>
    </>
  );
}
