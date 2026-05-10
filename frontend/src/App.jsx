import { BrowserRouter, Routes, Route } from 'react-router-dom';


import LayoutAdmin from './components/admin/components/LayoutAdmin';
import LayoutProjectManager from './components/projectManager/components/LayoutProjectManager';
import LayoutUser from './components/user/components/LayoutUser';



import AdminDash from './components/admin/components/AdminDash';
import AdminComment from './components/admin/components/Comment';
import AdminCreateNotices from './components/admin/components/CreateNotices';
import AdminNotice from './components/admin/components/Notice';
import AdminEmployees from './components/admin/components/Employees';
import AdminRegisterApplication from './components/admin/components/RegisterApplication';
import AdminProjectDash from './components/admin/components/ProjectDash';
import AdminSendEmail from './components/admin/components/SendEmail';
import AdminNoticeDash from './components/admin/components/NoticeDash';
import AdminProfile from './components/admin/components/Profile';
import AdminLogout from './components/admin/components/AdminLogout'; 



import PmDash from './components/projectManager/components/ProjectManagerDash';
import PmProjects from './components/projectManager/components/Projects';
import PmWorkspaces from './components/projectManager/components/Workspaces';
import PmTasks from './components/projectManager/components/Tasks';
import PmAttendances from './components/projectManager/components/Attendances';
import PmProjectCreateForm from './components/projectManager/components/ProjectCreateForm';
import PmCreateWorkspace from './components/projectManager/components/CreateWorkspace';
import PmTaskForm from './components/projectManager/components/TaskForm';
import PmWorkspaceTaskForm from './components/projectManager/components/WorkspaceTaskForm';
import PmComment from './components/projectManager/components/Comment';
import PmMembers from './components/projectManager/components/Members';
import PmWorkspaceDash from './components/projectManager/components/WorkspaceDash';
import PmProfile from './components/projectManager/components/Profile';
import PmNotice from './components/projectManager/components/Notice';
import PmNoticeDash from './components/projectManager/components/NoticeDash';
import PmLogout from './components/projectManager/components/PmLogout';



import UserDash from './components/user/components/UserDash';
import UserProjects from './components/user/components/Projects';
import UserWorkspaces from './components/user/components/Workspaces';
import UserTasks from './components/user/components/Tasks';
import UserProjectDash from './components/user/components/ProjectDash';
import UserComment from './components/user/components/Comment';
import UserWorkspaceDash from './components/user/components/WorkspaceDash';
import UserProfile from './components/user/components/Profile';
import UserNotice from './components/user/components/Notice';
import UserNoticeDash from './components/user/components/NoticeDash';
import UserLogout from './components/user/components/UserLogout';


function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/admin" element={<LayoutAdmin />}>
          <Route index element={<AdminDash />} />
          <Route path="adminDash" element={<AdminDash />} />
          <Route path="comments" element={<AdminComment />} />
          <Route path="createNotices" element={<AdminCreateNotices />} />
          <Route path="notices" element={<AdminNotice />} />
          <Route path="employees" element={<AdminEmployees />} />
          <Route path="registerApplication" element={<AdminRegisterApplication />} />
          <Route path="ProjectDash" element={<AdminProjectDash />} />
          <Route path="sendEmail" element={<AdminSendEmail />} />
          <Route path="noticeDash" element={<AdminNoticeDash />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="adminLogout" element={<AdminLogout />} />
        </Route>

        <Route path="/pm" element={<LayoutProjectManager />}>
          <Route index element={<PmDash />} />
          <Route path="projectManagerDash" element={<PmDash />} />
          <Route path="projects" element={<PmProjects />} />
          <Route path="workspaces" element={<PmWorkspaces />} />
          <Route path="tasks" element={<PmTasks />} />
          <Route path="attendances" element={<PmAttendances />} />
          <Route path="projectCreateForm" element={<PmProjectCreateForm />} />
          <Route path="workspaceCreateForm" element={<PmCreateWorkspace />} />
          <Route path="TaskCreateForm" element={<PmTaskForm />} />
          <Route path="workspaceTaskForm" element={<PmWorkspaceTaskForm />} />
          <Route path="comments" element={<PmComment />} />
          <Route path="members" element={<PmMembers />} />
          <Route path="workspaceDash" element={<PmWorkspaceDash />} />
          <Route path="profile" element={<PmProfile />} />
          <Route path="notices" element={<PmNotice />} />
          <Route path="noticeDash" element={<PmNoticeDash />} />
          <Route path="pmLogout" element={<PmLogout />} />
        </Route>

        <Route path="/user" element={<LayoutUser />}>
          <Route index element={<UserDash />} />
          <Route path="userDash" element={<UserDash />} />
          <Route path="projects" element={<UserProjects />} />
          <Route path="workspaces" element={<UserWorkspaces />} />
          <Route path="tasks" element={<UserTasks />} />
          <Route path="projectDash" element={<UserProjectDash />} />
          <Route path="comments" element={<UserComment />} />
          <Route path="workspaceDash" element={<UserWorkspaceDash />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="notices" element={<UserNotice />} />
          <Route path="noticeDash" element={<UserNoticeDash />} />
          <Route path="UserLogout" element={<UserLogout />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;