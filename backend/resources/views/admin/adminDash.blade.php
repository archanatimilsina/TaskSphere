<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@500&display=swap" rel="stylesheet">
  <script src="https://kit.fontawesome.com/c5a4938a4c.js" crossorigin="anonymous"></script>
  <title>Admin Dashboard</title>
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body{
      display: flex;
      height: 100vh;
      flex-direction: row;
      padding: 0 !important;
    }

    .sidebar {
      width: 250px;
      background-color: #1e293b;
      color: white;
      display: flex;
      flex-direction: column;
      padding: 20px;
      transition: all 0.3s ease;
    }

    .sidebar h2 {
      margin-bottom: 30px;
      font-size: 24px;
      text-align: center;
    }

    .sidebar a {
      padding: 12px 20px;
      margin: 5px 0;
      color: white;
      text-decoration: none;
      display: block;
      border-radius: 5px;
      transition: background 0.2s ease;
    }

    .sidebar a:hover {
      background-color: #334155;
    }

    #main {
      flex: 1;
      padding: 20px;
      background-color: #f1f5f9;
      overflow-y: auto;
    width: 100%;
    }

  </style>
</head>
<body>

  <div class="sidebar" id="sidebar">
    <h2>Tasksphere</h2> 
  <a href="#" onclick="navigateTo('/react/admin/adminDashboard')">Dashboard</a>
  <a href="#" onclick="navigateTo('/react/admin/attendances')">Attendance</a>
  <a href="#" onclick="navigateTo('/react/admin/comments')">Discussion Forum</a>
  <a href="#" onclick="navigateTo('/react/admin/createNotices')">Create Notices</a>
  <a href="#" onclick="navigateTo('/react/admin/notices')">Notices</a>
  <a href="#" onclick="navigateTo('/react/admin/employees')">Employees</a>
  <a href="#" onclick="navigateTo('/react/admin/registerApplication')">Register Application</a>
  <a href="#" onclick="navigateTo('/react/admin/sendEmail')">send Email</a>
    <a href="#">Settings</a>
    <a href="#">Logout</a>
  </div>
  <div id="main">
   
   
  </div>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4"
        crossorigin="anonymous"></script>  <script>
    function toggleSidebar() {
      const sidebar = document.getElementById('sidebar');
      sidebar.classList.toggle('active');
    }


  function navigateTo(path) {
    history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }
</script>


    @viteReactRefresh
    @vite('resources/js/react/admin/AdminApp.jsx')
</body>
</html>
