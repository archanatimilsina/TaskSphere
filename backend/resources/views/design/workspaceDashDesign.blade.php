<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@500&display=swap" rel="stylesheet">
  <script src="https://kit.fontawesome.com/c5a4938a4c.js" crossorigin="anonymous"></script>
  <title>User Dashboard</title>
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    html, body {
      height: 100vh;
      overflow: hidden;
      font-family: Arial, sans-serif;
    }

    body {
      display: flex;
    }

    .sidebar {
      width: 250px;
      background-color: #1e293b;
      color: white;
      display: flex;
      flex-direction: column;
      padding: 20px;
      transition: all 0.3s ease;
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      overflow-y: auto;
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
      margin-left: 250px;
      height: 100vh;
      overflow-y: auto;
      padding: 20px;
      background-color: #f1f5f9;
      flex: 1;
    }

    .toggle-btn {
      display: none;
      background-color: #1e293b;
      color: white;
      padding: 10px;
      cursor: pointer;
    }

    @media (max-width: 768px) {
      .sidebar {
        position: absolute;
        left: -250px;
        top: 0;
        height: 100%;
        z-index: 1000;
      }

      .sidebar.active {
        left: 0;
      }

      .toggle-btn {
        display: block;
        position: absolute;
        top: 10px;
        left: 10px;
        z-index: 1100;
      }

      #main {
        margin-left: 0;
      }
    }
.headBar
{
  width: 700px;
  display: flex ;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin: auto;
  margin-top: 50px;
  
  
}
.headBar span{
  color: black;
  font-family: 'Baloo 2', cursive;
}

 
  </style>
</head>
<body>
  <div class="sidebar" id="sidebar">
    <h2>Tasksphere</h2> 
    <a href="#" onclick="navigateTo('/react/user/projects')">Projects</a>
    <a href="#" onclick="navigateTo('/react/user/workspaces')">Workspaces</a>
    <a href="#" onclick="navigateTo('/react/user/tasks')">Tasks</a>
    <a href="#" onclick="navigateTo('/react/user/attendances')">Attendance</a>
    <a href="#">Notices</a>
    <a href="#">Settings</a>
    <a href="#">Logout</a>
  </div>

  <div id="main">
<div class="headBar">
  <span>Comment</span>
  <span>Tasks</span>
  <span>Members</span>
</div>
</div>


</body>
</html>
