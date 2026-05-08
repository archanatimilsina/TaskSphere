import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Attendances from './components/Attendances';
import Projects from './components/Projects';
import Tasks from './components/Tasks';
import Workspaces from './components/Workspaces';
import ProjectDash from './components/ProjectDash';
import ProjectCreateForm from './components/ProjectCreateForm';
import CreateWorkspace from './components/CreateWorkspace';
import TaskForm from './components/TaskForm';
import Comment from './components/Comment';
import Members from './components/Members';
import WorkspaceDash from './components/WorkspaceDash';
import Profile from './components/Profile';
import WorkspaceTaskForm from './components/WorkspaceTaskForm';
import ProjectManagerDash from './components/ProjectManagerDash';
import LayoutProjectManager from './components/LayoutProjectManager';
import Notice from './components/Notice';
import NoticeDash from '../admin/components/NoticeDash';
import PmLogout from './components/PmLogout';
const ProjectManagerApp = () => {
    return (
        <BrowserRouter basename='/react/projectManager'>
          <Routes>
             <Route path="/" element={<LayoutProjectManager />}>
      <Route index element={<ProjectManagerDash />} />
      <Route  path="projectDash" element={<ProjectDash />} />
      <Route path="projects" element={<Projects />} />
      <Route path="workspaces" element={<Workspaces />} />
      <Route path="tasks" element={<Tasks />} />
      <Route path="attendances" element={<Attendances />} />
      <Route path="projectCreateForm" element={<ProjectCreateForm />} />
      <Route path="workspaceCreateForm" element={<CreateWorkspace />} />
      <Route path="TaskCreateForm" element={<TaskForm />} />
      <Route path="workspaceTaskForm" element={<WorkspaceTaskForm />} />
      <Route path="comments" element={<Comment />} />
      <Route path="members" element={<Members />} />
      <Route path="workspaceDash" element={<WorkspaceDash />} />
      <Route path="profile" element={<Profile />} />
      <Route path="projectManagerDash" element={<ProjectManagerDash />} />
      <Route path="notices" element={<Notice />} />
      <Route path="noticeDash" element={<NoticeDash />} />
<Route path="pmLogout" element={<PmLogout />} />
      </Route>
          </Routes>
        </BrowserRouter>
      );
};

const root= ReactDOM.createRoot(document.getElementById("root"));
root.render(<ProjectManagerApp />);

