// // import React from 'react';
// // import ReactDOM from 'react-dom/client';
// // import { BrowserRouter, Routes, Route } from 'react-router-dom';
// // import LayoutAdmin from './components/LayoutAdmin'; 
// // import Attendances from './components/Attendances';
// // import Notice from './components/Notice';
// // import CreateNotices from './components/CreateNotices';
// // import Comment from './components/Comment';
// // import Employees from './components/Employees';
// // import RegisterApplication from './components/RegisterApplication';
// // import ProjectDash from './components/ProjectDash';
// // import SendEmail from './components/SendEmail';
// // import NoticeDash from './components/NoticeDash';
// // import Profile from './components/Profile';
// // import AdminDash from './components/AdminDash';
// // import AdminLogout from './components/adminLogout';

// // const AdminApp= () => {
// //   return (
// //     <BrowserRouter basename="/react/admin">
// //       <Routes>
// //         <Route path="/" element={<LayoutAdmin />}>
// //         <Route index element={<AdminDash />} />
// //           <Route path="attendances" element={<Attendances />} />
// //           <Route path="comments" element={<Comment />} />
// //           <Route path="createNotices" element={<CreateNotices />} />
// //           <Route path="notices" element={<Notice />} />
// //           <Route path="employees" element={<Employees />} />
// //           <Route path="registerApplication" element={<RegisterApplication />} />
// //           <Route path="ProjectDash" element={<ProjectDash />} />
// //           <Route path="sendEmail" element={<SendEmail />} />
// //           <Route path="noticeDash" element={<NoticeDash />} />
// //           <Route path="profile" element={<Profile />} />
// //           <Route path="adminDash" element={<AdminDash />} />
// //           <Route path="adminLogout" element={<AdminLogout />} />
// //         </Route>
// //       </Routes>
// //     </BrowserRouter>
// //   );
// // };
// // export default AdminApp
// // // const root = ReactDOM.createRoot(document.getElementById('root'));
// // // root.render(<AdminApp />);



// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import LayoutAdmin from './LayoutAdmin';

// // Import your page components
// import AdminDash from './pages/AdminDash';
// import Attendances from './pages/Attendances';

// function AdminApp() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/admin" element={<LayoutAdmin />}>
//           <Route index element={<AdminDash />} /> 
          
//           <Route path="adminDash" element={<AdminDash />} />
//           <Route path="attendances" element={<Attendances />} />
//           <Route path="comments" element={<Comments />} />
//           <Route path="createNotices" element={<CreateNotices />} />
//           <Route path="notices" element={<Notices />} />
//           <Route path="employees" element={<Employees />} />
//           <Route path="registerApplication" element={<RegisterApplication />} />
//           <Route path="sendEmail" element={<SendEmail />} />
//           <Route path="adminLogout" element={<Logout />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default AdminApp;