import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import styled from 'styled-components';

export default function LayoutUser() {
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname.split("/").pop();
    if (!path || path === "userDash") return "Dashboard Overview";
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  return (
    <LayoutUserContainer>
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-icon">
            <i className="fa-solid fa-microchip"></i>
          </div>
          <h2>Tasksphere</h2>
        </div>

        <nav className="nav-links">
          <small className="nav-section-label">Main Menu</small>
          <NavLink to="userDash" className={({ isActive }) => isActive ? 'active' : ''}>
            <i className="fa-solid fa-house"></i> <span>Dashboard</span>
          </NavLink>
          <NavLink to="projects" className={({ isActive }) => isActive ? 'active' : ''}>
            <i className="fa-solid fa-briefcase"></i> <span>Projects</span>
          </NavLink>
          <NavLink to="workspaces" className={({ isActive }) => isActive ? 'active' : ''}>
            <i className="fa-solid fa-layer-group"></i> <span>Workspaces</span>
          </NavLink>
          <NavLink to="tasks" className={({ isActive }) => isActive ? 'active' : ''}>
            <i className="fa-solid fa-list-check"></i> <span>My Tasks</span>
          </NavLink>
          
          <small className="nav-section-label">Social & Internal</small>
          <NavLink to="comments" className={({ isActive }) => isActive ? 'active' : ''}>
            <i className="fa-solid fa-comments"></i> <span>Discussions</span>
          </NavLink>
          <NavLink to="notices" className={({ isActive }) => isActive ? 'active' : ''}>
            <i className="fa-solid fa-bullhorn"></i> <span>Notices</span>
          </NavLink>
          <NavLink to="profile" className={({ isActive }) => isActive ? 'active' : ''}>
            <i className="fa-solid fa-user"></i> <span>Profile</span>
          </NavLink>

          <div className="sidebar-footer">
            <NavLink to="UserLogout" className="logout-link">
              <i className="fa-solid fa-right-from-bracket"></i> <span>Sign Out</span>
            </NavLink>
          </div>
        </nav>
      </aside>

      <main id="main">
        <header className="top-header">
          <div className="header-context">
            <h3>{getPageTitle()}</h3>
          </div>
          <div className="header-actions">
            <button className="icon-btn"><i className="fa-regular fa-bell"></i></button>
            <div className="user-pill">
              <img src="https://ui-avatars.com/api/?name=User&background=10b981&color=fff" alt="User" />
              <span>Standard Access</span>
            </div>
          </div>
        </header>
        
        <div className="outlet-container">
          <Outlet />
        </div>
      </main>
    </LayoutUserContainer>
  );
}

const LayoutUserContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: #f1f5f9;
  font-family: 'Baloo 2', cursive;

  .sidebar {
    width: 280px;
    background-color: #0f172a; /* Deeper slate for contrast */
    color: white;
    display: flex;
    flex-direction: column;
    padding: 40px 20px;
    flex-shrink: 0;
    box-shadow: 10px 0 30px rgba(0, 0, 0, 0.05);
    z-index: 10;
  }

  .sidebar-brand {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 50px;
    padding-left: 10px;

    .brand-icon {
      background: #10b981;
      width: 40px;
      height: 40px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
    }

    h2 {
      margin: 0;
      font-size: 24px;
      color: #f8fafc;
      font-weight: 800;
      letter-spacing: -0.5px;
    }
  }

  .nav-section-label {
    display: block;
    color: #475569;
    text-transform: uppercase;
    font-size: 0.75rem;
    font-weight: 800;
    letter-spacing: 1px;
    margin: 25px 0 10px 15px;
  }

  .nav-links {
    display: flex;
    flex-direction: column;
    flex: 1;

    a {
      padding: 12px 18px;
      color: #94a3b8;
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 14px;
      border-radius: 14px;
      font-size: 1rem;
      font-weight: 600;
      transition: 0.2s;
      margin-bottom: 4px;

      i { width: 20px; text-align: center; font-size: 1.1rem; }

      &:hover {
        background-color: #1e293b;
        color: white;
      }

      &.active {
        background-color: #10b981;
        color: white;
        box-shadow: 0 4px 15px rgba(16, 185, 129, 0.25);
      }
    }
  }

  .sidebar-footer {
    margin-top: auto;
    padding-top: 30px;
    border-top: 1px solid #1e293b;

    .logout-link {
      color: #f87171 !important;
      &:hover { background: #450a0a !important; color: white !important; }
    }
  }

  #main {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .top-header {
    height: 80px;
    background: white;
    padding: 0 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e2e8f0;

    .header-context h3 {
      margin: 0;
      font-size: 1.4rem;
      color: #1e293b;
      font-weight: 800;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 20px;

      .icon-btn {
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        width: 40px;
        height: 40px;
        border-radius: 12px;
        cursor: pointer;
        color: #64748b;
        transition: 0.2s;
        &:hover { background: #f1f5f9; color: #10b981; }
      }

      .user-pill {
        display: flex;
        align-items: center;
        gap: 12px;
        background: #f8fafc;
        padding: 6px 15px 6px 6px;
        border-radius: 50px;
        border: 1px solid #e2e8f0;
        font-weight: 700;
        font-size: 0.9rem;
        color: #475569;

        img { width: 32px; height: 32px; border-radius: 50%; }
      }
    }
  }

  .outlet-container {
    flex: 1;
    overflow-y: auto;
    padding: 40px;
    
    &::-webkit-scrollbar { width: 8px; }
    &::-webkit-scrollbar-track { background: transparent; }
    &::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
  }

  @media (max-width: 1024px) {
    .sidebar { width: 240px; }
    .top-header { padding: 0 20px; }
    .outlet-container { padding: 20px; }
  }

  @media (max-width: 768px) {
    flex-direction: column;

    .sidebar {
      width: 100%;
      height: auto;
      padding: 15px;
      
      .sidebar-brand { margin-bottom: 15px; }
      .nav-section-label { display: none; }
      
      .nav-links {
        flex-direction: row;
        overflow-x: auto;
        gap: 10px;
        padding-bottom: 5px;
        
        a {
          white-space: nowrap;
          padding: 8px 15px;
          margin-bottom: 0;
          span { display: none; } /* Show only icons on mobile for space */
        }
      }
      .sidebar-footer { display: none; }
    }
    
    .top-header { height: 60px; .header-actions { display: none; } }
  }
`;