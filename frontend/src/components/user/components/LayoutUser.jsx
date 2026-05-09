import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import styled from 'styled-components';

export default function LayoutUser() {
  return (
    <LayoutUserContainer>
      <div className="sidebar" id="sidebar">
        <h2>Tasksphere</h2>
        <nav className="nav-links">
          <NavLink to="userDash" className={({ isActive }) => isActive ? 'active' : ''}>
            <i className="fa-solid fa-house"></i> Dashboard
          </NavLink>
          <NavLink to="projects" className={({ isActive }) => isActive ? 'active' : ''}>
            <i className="fa-solid fa-briefcase"></i> Projects
          </NavLink>
          <NavLink to="workspaces" className={({ isActive }) => isActive ? 'active' : ''}>
            <i className="fa-solid fa-layer-group"></i> Workspaces
          </NavLink>
          <NavLink to="tasks" className={({ isActive }) => isActive ? 'active' : ''}>
            <i className="fa-solid fa-list-check"></i> Tasks
          </NavLink>
          <NavLink to="comments" className={({ isActive }) => isActive ? 'active' : ''}>
            <i className="fa-solid fa-comments"></i> Discussion Forum
          </NavLink>
          <NavLink to="notices" className={({ isActive }) => isActive ? 'active' : ''}>
            <i className="fa-solid fa-bullhorn"></i> Notices
          </NavLink>
          <NavLink to="profile" className={({ isActive }) => isActive ? 'active' : ''}>
            <i className="fa-solid fa-user"></i> Profile
          </NavLink>
          <NavLink to="UserLogout" className="logout-link">
            <i className="fa-solid fa-right-from-bracket"></i> Logout
          </NavLink>
        </nav>
      </div>

      <div id="main">
        <div className="top-filler"></div>
        <Outlet />
      </div>
    </LayoutUserContainer>
  );
}

const LayoutUserContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  font-family: 'Baloo 2', cursive;

  .sidebar {
    width: 280px;
    background-color: #1e293b;
    color: white;
    display: flex;
    flex-direction: column;
    padding: 30px 15px;
    transition: all 0.3s ease;
    flex-shrink: 0;
    box-shadow: 4px 0 10px rgba(0, 0, 0, 0.1);
  }

  .sidebar h2 {
    margin-bottom: 40px;
    font-size: 28px;
    text-align: center;
    color: #10b981;
    font-weight: 800;
    letter-spacing: 1px;
  }

  .nav-links {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .sidebar a {
    padding: 14px 20px;
    color: #cbd5e1;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 12px;
    border-radius: 12px;
    font-size: 1.05rem;
    font-weight: 500;
    transition: all 0.2s ease;

    i {
      width: 20px;
      font-size: 1.1rem;
    }

    &:hover {
      background-color: #334155;
      color: white;
      transform: translateX(5px);
    }

    &.active {
      background-color: #10b981;
      color: white;
      box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
    }
  }

  .logout-link {
    margin-top: 20px;
    border-top: 1px solid #334155;
    padding-top: 20px !important;
    color: #f87171 !important;

    &:hover {
      background-color: #450a0a !important;
      color: #fee2e2 !important;
    }
  }

  #main {
    flex: 1;
    background-color: #f8fafc;
    overflow-y: auto;
    position: relative;
    
    /* Custom Scrollbar for the main content */
    &::-webkit-scrollbar {
      width: 8px;
    }
    &::-webkit-scrollbar-track {
      background: #f1f5f9;
    }
    &::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 4px;
    }
    &::-webkit-scrollbar-thumb:hover {
      background: #94a3b8;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;

    .sidebar {
      width: 100%;
      height: auto;
      padding: 15px;
      
      h2 { margin-bottom: 15px; }
      
      .nav-links {
        flex-direction: row;
        overflow-x: auto;
        padding-bottom: 10px;
        
        a {
          white-space: nowrap;
          padding: 10px 15px;
        }
      }
    }
    
    #main {
      height: calc(100vh - 150px);
    }
  }
`;