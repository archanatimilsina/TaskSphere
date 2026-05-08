<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@500&display=swap" rel="stylesheet">
  <script src="https://kit.fontawesome.com/c5a4938a4c.js" crossorigin="anonymous"></script>
  <title>User Dashboard</title>
  
  <style>
   * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body{
      font-family: Arial, sans-serif;
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
    
    }

    .toggle-btn {
      display: none;
      background-color: #1e293b;
      color: white;
      padding: 10px;
      cursor: pointer;
    }


   
  </style>
</head>
<body>
  <div class="sidebar" id="sidebar">
    <h2>Tasksphere</h2> 
    <a href="#" onclick="navigateTo('/react/user/userdash')">Dashboard</a>
    <a href="#" onclick="navigateTo('/react/user/projects')">Projects</a>
    <a href="#" onclick="navigateTo('/react/user/workspaces')">Workspaces</a>
    <a href="#" onclick="navigateTo('/react/user/tasks')">Tasks</a>
    <a href="#" onclick="navigateTo('/react/user/attendances')">Attendance</a>
    <a href="#" onclick="navigateTo('/react/user/comments')">Discussion Forum</a>
    <a href="#">Notices</a>
    <a href="#">Settings</a>
    <a href="#">Logout</a>
  </div>
  <div id="main">

  </div>

  <script>
    

    function navigateTo(path) {
      history.pushState({}, '', path);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  </script>

  @viteReactRefresh
  @vite('resources/js/react/user/UserApp.jsx')

</body>
</html>
