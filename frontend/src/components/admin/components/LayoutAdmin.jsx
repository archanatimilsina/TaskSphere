import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import styled from 'styled-components';

export default function LayoutAdmin() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? "active" : "";

  return (
    <LayoutAdminContainer>
      <aside className="sidebar">
        <div className="brand-section">
          <div className="logo-icon">T</div>
          <h2>Tasksphere</h2>
        </div>
        
        <nav className="nav-links">
          <Link to="/admin/adminDash" className={isActive("/admin/adminDash")}>
            <i className="fas fa-th-large"></i> <span>Dashboard</span>
          </Link>
          
          <Link to="/admin/attendances" className={isActive("/admin/attendances")}>
            <i className="fas fa-calendar-check"></i> <span>Attendance</span>
          </Link>
          
          <Link to="/admin/comments" className={isActive("/admin/comments")}>
            <i className="fas fa-comments"></i> <span>Discussion Forum</span>
          </Link>
          
          <div className="nav-divider">Management</div>

          <Link to="/admin/createNotices" className={isActive("/admin/createNotices")}>
            <i className="fas fa-plus-circle"></i> <span>Create Notices</span>
          </Link>
          
          <Link to="/admin/notices" className={isActive("/admin/notices")}>
            <i className="fas fa-bullhorn"></i> <span>Notices</span>
          </Link>
          
          <Link to="/admin/employees" className={isActive("/admin/employees")}>
            <i className="fas fa-users"></i> <span>Employees</span>
          </Link>
          
          <Link to="/admin/registerApplication" className={isActive("/admin/registerApplication")}>
            <i className="fas fa-user-plus"></i> <span>Applications</span>
          </Link>
          
          <Link to="/admin/sendEmail" className={isActive("/admin/sendEmail")}>
            <i className="fas fa-envelope"></i> <span>Send Email</span>
          </Link>
        </nav>
        
        <div className="sidebar-footer">
          <Link to="/admin/settings" className={isActive("/admin/settings")}>
             <i className="fas fa-cog"></i> <span>Settings</span>
          </Link>
          <Link to="/admin/adminLogout" className="logout-link">
             <i className="fas fa-sign-out-alt"></i> <span>Logout</span>
          </Link>
        </div>
      </aside>

      <main id="main">
        <header className="top-bar">
          <div className="breadcrumb">
            Admin / {location.pathname.split("/").pop().replace(/([A-Z])/g, ' $1').trim()}
          </div>
          <div className="admin-profile">
            <span className="welcome-text">System Administrator</span>
            <img src="https://i.pravatar.cc/40?img=12" alt="Admin" />
          </div>
        </header>
        <div className="content-area">
          <Outlet />
        </div>
      </main>
    </LayoutAdminContainer>
  );
}

const LayoutAdminContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: #f8fafc;
  overflow: hidden;
  font-family: 'Baloo 2';

  .sidebar {
    width: 280px;
    background-color: #0f172a;
    color: white;
    display: flex;
    flex-direction: column;
    padding: 30px 15px;
    flex-shrink: 0;
    box-shadow: 4px 0 15px rgba(0, 0, 0, 0.1);
    z-index: 10;
  }

  .brand-section {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 0 15px 40px;
    
    .logo-icon {
      background: #3b82f6;
      width: 40px;
      height: 40px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 1.5rem;
    }

    h2 {
      font-size: 22px;
      font-weight: 700;
      letter-spacing: 0.5px;
      margin: 0;
    }
  }

  .nav-links {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
    overflow-y: auto;

    /* Custom Scrollbar for Sidebar */
    &::-webkit-scrollbar { width: 4px; }
    &::-webkit-scrollbar-thumb { background: #334155; border-radius: 10px; }

    a {
      padding: 12px 18px;
      color: #94a3b8;
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 15px;
      border-radius: 12px;
      font-size: 1.05rem;
      transition: all 0.3s ease;

      i { width: 20px; font-size: 1.1rem; }
      
      &:hover {
        background-color: #1e293b;
        color: #f8fafc;
      }

      &.active {
        background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
        color: white;
        box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
      }
    }
  }

  .nav-divider {
    font-size: 0.75rem;
    text-transform: uppercase;
    color: #475569;
    letter-spacing: 1.5px;
    margin: 25px 0 10px 18px;
    font-weight: 800;
  }

  .sidebar-footer {
    padding-top: 20px;
    border-top: 1px solid #1e293b;
    display: flex;
    flex-direction: column;
    gap: 4px;

    a {
      padding: 12px 18px;
      color: #94a3b8;
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 15px;
      border-radius: 12px;
    }

    .logout-link:hover {
      background: #ef4444;
      color: white;
    }
  }

  #main {
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
  }

  .top-bar {
    height: 70px;
    background: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 40px;
    border-bottom: 1px solid #e2e8f0;

    .breadcrumb {
      color: #64748b;
      font-weight: 600;
      text-transform: capitalize;
    }

    .admin-profile {
      display: flex;
      align-items: center;
      gap: 15px;

      .welcome-text {
        color: #1e293b;
        font-weight: 700;
        font-size: 0.9rem;
      }

      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 2px solid #3b82f6;
      }
    }
  }

  .content-area {
    flex: 1;
    padding: 30px;
    overflow-y: auto;
    background-color: #f8fafc;
  }
`;