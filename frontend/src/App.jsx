// import AdminApp from '../src/components/admin/AdminApp';
// import UserApp from '../src/components/user/UserApp';
// import ProjectManagerApp from '../src/components/projectManager/ProjectManagerApp'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LayoutAdmin from './components/admin/components/LayoutAdmin';
import LayoutProjectManager from './components/projectManager/components/LayoutProjectManager';
import LayoutUser from './components/user/components/LayoutUser';

// import Attendance from './components/projectManager/components/Attendances';
// import Attendances from './components/admin/components/Attendances';

import AdminDash from './components/admin/components/AdminDash';
import ProjectManagerDash from './components/projectManager/components/ProjectManagerDash';
import UserDash from './components/user/components/UserDash';


import ProjectDash from './components/user/components/ProjectDash';
import Projects from './components/user/components/Projects';
import WorkspaceDash from './components/user/components/WorkspaceDash';
import UserWorkspaceTask from './components/user/components/WorkspaceTask';
import Tasks from './components/user/components/Tasks';
import UserWorkspaces from './components/user/components/Workspaces';
import Profile from './components/user/components/Profile';
import UserLogout from './components/user/components/UserLogout';
import Comment from './components/user/components/Comment';
import CommentForm  from './components/user/components/createComments';
import Notice from './components/user/components/Notice';
import NoticeDash from './components/user/components/NoticeDash';

function App()
{
return(
<BrowserRouter>

<Routes>
<Route path="/admin" element={<LayoutAdmin />}>
          <Route index element={<AdminDash />} />
           {/* <Route path="attendances" element={<Attendances />} />
          <Route path="comments" element={<Comment />} />
          <Route path="createNotices" element={<CreateNotices />} />
          <Route path="notices" element={<Notice />} />
          <Route path="employees" element={<Employees />} />
          <Route path="registerApplication" element={<RegisterApplication />} />
          <Route path="ProjectDash" element={<ProjectDash />} />
          <Route path="sendEmail" element={<SendEmail />} />
          <Route path="noticeDash" element={<NoticeDash />} />
          <Route path="profile" element={<Profile />} />
          <Route path="adminDash" element={<AdminDash />} />
          <Route path="adminLogout" element={<AdminLogout />} /> */}
        </Route>

<Route path="/pm" element={<LayoutProjectManager />}>
          <Route index element={<ProjectManagerDash />} />
          {/* <Route path="projects" element={<Projects />} />
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
<Route path="pmLogout" element={<PmLogout />} /> */}
        </Route>


<Route path="/user" element={<LayoutUser />}>
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
}
export default App;
