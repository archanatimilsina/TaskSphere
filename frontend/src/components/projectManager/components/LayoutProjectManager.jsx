import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import styled from 'styled-components';

export default function LayoutProjectManager() {
  const location = useLocation();

  // Helper to determine if a link is active
  const isActive = (path) => location.pathname.includes(path);

  return (
    <LayoutWrapper>
      <Sidebar>
        <div className="brand">
          <div className="logo-icon">T</div>
          <h2>Tasksphere</h2>
        </div>

        <nav className="nav-links">
          <p className="nav-label">Main Menu</p>
          <StyledLink to="projectManagerDash" className={isActive('projectManagerDash') ? 'active' : ''}>
            <i className="fas fa-th-large"></i> Dashboard
          </StyledLink>
          <StyledLink to="projects" className={isActive('projects') ? 'active' : ''}>
            <i className="fas fa-project-diagram"></i> Projects
          </StyledLink>
          <StyledLink to="workspaces" className={isActive('workspaces') ? 'active' : ''}>
            <i className="fas fa-layer-group"></i> Workspaces
          </StyledLink>
          <StyledLink to="tasks" className={isActive('tasks') ? 'active' : ''}>
            <i className="fas fa-tasks"></i> Tasks
          </StyledLink>

          <p className="nav-label">Collaboration</p>
          <StyledLink to="comments" className={isActive('comments') ? 'active' : ''}>
            <i className="fas fa-comments"></i> Discussion Forum
          </StyledLink>
          <StyledLink to="notices" className={isActive('notices') ? 'active' : ''}>
            <i className="fas fa-bullhorn"></i> Notices
          </StyledLink>
          <StyledLink to="members" className={isActive('members') ? 'active' : ''}>
            <i className="fas fa-users"></i> Employees
          </StyledLink>
        </nav>

        <div className="sidebar-footer">
          <StyledLink to="/logout" className="logout-btn">
            <i className="fas fa-sign-out-alt"></i> Logout
          </StyledLink>
        </div>
      </Sidebar>

      <MainContent>
        <TopHeader>
          <div className="search-bar">
            <i className="fas fa-search"></i>
            <input type="text" placeholder="Search projects or tasks..." />
          </div>
          <div className="user-profile">
            <div className="user-info">
              <span className="name">Project Manager</span>
              <span className="role">Administrator</span>
            </div>
            <img src="https://i.pravatar.cc/150?img=12" alt="PM" />
          </div>
        </TopHeader>

        <div className="content-outlet">
          <Outlet />
        </div>
      </MainContent>
    </LayoutWrapper>
  );
}

const LayoutWrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: #f8fafc;
  font-family: 'Baloo 2', cursive;
  overflow: hidden;
`;

const Sidebar = styled.aside`
  width: 280px;
  background-color: #0f172a;
  color: #f1f5f9;
  display: flex;
  flex-direction: column;
  padding: 30px 20px;
  box-shadow: 4px 0 10px rgba(0, 0, 0, 0.05);
  z-index: 10;

  .brand {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 40px;
    padding: 0 10px;

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
      font-size: 1.6rem;
      font-weight: 800;
      letter-spacing: -0.5px;
      margin: 0;
    }
  }

  .nav-links {
    flex: 1;
    overflow-y: auto;

    .nav-label {
      font-size: 0.75rem;
      text-transform: uppercase;
      color: #64748b;
      letter-spacing: 1px;
      margin: 20px 0 10px 12px;
      font-weight: 700;
    }
  }

  .sidebar-footer {
    padding-top: 20px;
    border-top: 1px solid #1e293b;
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 14px 18px;
  margin: 4px 0;
  color: #94a3b8;
  text-decoration: none;
  font-size: 1.05rem;
  font-weight: 600;
  border-radius: 12px;
  transition: all 0.2s ease;

  i {
    width: 20px;
    font-size: 1.1rem;
  }

  &:hover {
    background-color: #1e293b;
    color: #f1f5f9;
  }

  &.active {
    background-color: #3b82f6;
    color: white;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25);
  }

  &.logout-btn {
    color: #f87171;
    &:hover {
      background-color: rgba(248, 113, 113, 0.1);
    }
  }
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;

  .content-outlet {
    flex: 1;
    padding: 30px;
    overflow-y: auto;
    background-color: #f1f5f9;
  }
`;

const TopHeader = styled.header`
  height: 80px;
  background-color: white;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  flex-shrink: 0;

  .search-bar {
    position: relative;
    width: 350px;
    
    i {
      position: absolute;
      left: 15px;
      top: 50%;
      transform: translateY(-50%);
      color: #94a3b8;
    }

    input {
      width: 100%;
      padding: 10px 15px 10px 45px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      font-family: inherit;
      &:focus {
        outline: none;
        border-color: #3b82f6;
      }
    }
  }

  .user-profile {
    display: flex;
    align-items: center;
    gap: 15px;

    .user-info {
      display: flex;
      flex-direction: column;
      text-align: right;

      .name {
        font-weight: 800;
        color: #1e293b;
        font-size: 1rem;
      }

      .role {
        font-size: 0.8rem;
        color: #3b82f6;
        font-weight: 700;
        text-transform: uppercase;
      }
    }

    img {
      width: 45px;
      height: 45px;
      border-radius: 12px;
      object-fit: cover;
      border: 2px solid #e2e8f0;
    }
  }
`;