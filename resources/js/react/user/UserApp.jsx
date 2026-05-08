import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Attendances from './components/Attendances';
import Projects from './components/Projects';
import Tasks from './components/Tasks';
import Workspaces from './components/Workspaces';
import UserDash from './components/UserDash';
import ProjectDash from './components/ProjectDash';
import WorkspaceDash from './components/WorkspaceDash';
import Comment from './components/Comment';
import LayoutUser from './components/LayoutUser';
import Profile from './components/Profile';
import Notice from './components/Notice';
import NoticeDash from './components/NoticeDash';
import UserLogout from './components/UserLogout';
export const UserApp = () => {
    return (
        <BrowserRouter basename='/react/user'>
          <Routes>
             <Route path="/" element={<LayoutUser />}>
             <Route index element={<UserDash />} />
          <Route path="projects" element={<Projects />} />
      <Route path="workspaces" element={<Workspaces />} />
      <Route path="tasks" element={<Tasks />} />
      <Route path="attendances" element={<Attendances />} />
      <Route path="userdash" element={<UserDash />} />
      <Route path="projectDash" element={<ProjectDash />} />
      <Route path="comments" element={<Comment />} />
      <Route path="workspaceDash" element={<WorkspaceDash />} />
     <Route path="profile" element={<Profile />} />
     <Route path="userDash" element={<UserDash />} />
     <Route path="notices" element={<Notice />} />
     <Route path="noticeDash" element={<NoticeDash />} />
     <Route path="UserLogout" element={<UserLogout />} />
    
    </Route>


          </Routes>
        </BrowserRouter>
      );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<UserApp />);
