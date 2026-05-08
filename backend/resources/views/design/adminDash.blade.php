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
      font-family: 'Baloo 2', cursive;
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

    /* 🔄 Horizontal Scrollbar Styling */
    .workspaceIndex {
      display: flex;
      flex-wrap: nowrap; /* ✨ Change: No wrap */
      gap: 30px;
      overflow-x: auto; /* ✨ Enable horizontal scroll */
      padding: 20px;
      margin-top: 10px;
    }

    .projectRow {
      min-width: 280px; /* ✨ Ensure width for horizontal scroll */
      background-color: #1e293b;
      border-radius: 15px;
      padding: 20px;
      color: white;
      text-align: center;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      flex-shrink: 0; /* ✨ Prevent shrinking on scroll */
    }

    .projectRow:hover {
      transform: translateY(-10px);
      box-shadow: 0 6px 12px rgba(0, 255, 170, 0.3);
    }

    .projectRow ul {
      list-style: none;
      padding: 0;
    }

    .projectRow ul li {
      margin: 10px 0;
      font-size: 1.2rem;
    }

    .statusBtn {
      background-color: #10b981;
      color: white;
      border: none;
      border-radius: 20px;
      padding: 10px 20px;
      font-weight: bold;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .statusBtn:hover {
      background-color: #22c55e;
    }
    .workspaceHead
    {
      font-family: Arial, sans-serif;
font-size: 1.4rem;
    }
    .secondDiv
    {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      padding: 40px;
    }
    .todoHead
    {
      font-family: 'Baloo 2', cursive;
   
    }
    .todo
    {
      width: 45%;
      height: 500px;
    position: relative;

      box-shadow: 0 4px 4px 4px rgba(0,0,0,0.1);
      border-radius: 10px;
      padding: 20px;
      
    }
 .todoBody
 {
  width: 92%;
  height: 80%;
  overflow-y: auto;
  position: absolute;
  margin: auto;
 }
 .projectBody
 {
  width: 92%;
  height: 80%;
  overflow-y: auto;
  position: absolute;
  margin: auto;
 }
    .project
    {
      width: 45%;
      height: 500px;
  position: relative;
      box-shadow: 0 4px 4px 4px rgba(0,0,0,0.1);
      border-radius: 10px;
      padding: 20px;
    }
    .projectHead
    {
      font-family: 'Baloo 2', cursive;
 
    }
    .todolist
    {
      width: 98%;
      margin: auto;
      background-color: #1e293b;
      border: 1px solid black;
      border-radius: 20px;
      height: 70px;
      margin-top: 10px;
      
    }
    .projectlist
    {
      width: 98%;
      margin: auto;
      border: 1px solid black;
      background-color: #1e293b;
      border-radius: 20px;
      height: 70px;
      margin-top: 10px;

    }
    .todoBar
    {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      border-bottom: 1px solid gray;
    }
    .projectBar
    {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      border-bottom: 1px solid gray;
    }
    .todoItem {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 20px;
  color: white;
  font-family: 'Arial', sans-serif;
}
.projectItem {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 20px;
  color: white;
  font-family: 'Arial', sans-serif;
  font-size: 1rem;
}
.projectlist:hover{
  transform: translateY(-2px);
}
.todolist:hover{
  transform: translateY(-2px);

}


.todoSerial {
  width: 30px;
  font-weight: bold;
}
.todoName {
  flex: 1;
  margin-left: 10px;
}
.todoStatus {
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 0.9rem;
  font-weight: bold;
}
.todoStatus.pending {
  background-color: #facc15; /* yellow */
  color: black;
}

.todoStatus.done {
  background-color: #10b981; /* green */
  color: white;
}
#pmheading {
            font-size: 2.5rem;
            color: black;
           border-bottom: 1px solid gray;
           margin-bottom: 20px;
        }

        #filter {
            font-size: 1.8rem;
            color: #f1f5f9;
            cursor: pointer;
            transition: color 0.3s, transform 0.3s;
        }

        #filter:hover {
            color: #94a3b8;
            transform: scale(1.2);
        }

        .pmtable-container {
            max-height: 70vh;
            overflow-y: auto;
            border: 1px solid #334155;
            border-radius: 10px;
            background-color: #0f172a;
            padding: 10px;
        }

        .pmtable-container table {
            width: 100%;
            border-collapse: collapse;
        }

        .pmtable-container table thead {
            position: sticky;
            top: 0;
            background-color: #1e293b;
            z-index: 1;
        }

        th, td {
            padding: 12px 15px;
            text-align: left;
            border-bottom: 1px solid #334155;
        }

        th {
            color: #cbd5e1;
        }


        @media screen and (max-width: 768px) {
            #heading {
                font-size: 2rem;
            }

            th, td {
                font-size: 0.9rem;
                padding: 8px 10px;
            }

            #filter {
                font-size: 1.5rem;
            }
        }
.pmthirdDiv
{
  
  box-shadow: 0 4px 4px 4px rgba(0,0,0,0.1);
      border-radius: 10px;
      padding: 20px;
      height: fit-content;
}
#pmTaskTableBody tr{
  background-color: white;
}
#pmTaskTableBody tr:hover{
  background-color: #334155;
}
.ApplicationAcceptBtn button{
  width: 70px;
    height: 40px;
    color: white;
    background-color: green;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s;
}
.ApplicationRejectBtn button{
  width: 70px;
    height: 40px;
    color: white;
    background-color: Red;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s;
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
    <h3 class="workspaceHead">Services</h3>
    <div class="workspaceIndex">
      <div class="AdminEmail projectRow"><ul><li><strong>Send Email</strong></li><li><button class="statusBtn">Open</button></li></ul></div>
      <div class="AdminAttendance projectRow"><ul><li><strong>Check Attendance</strong></li><li><button class="statusBtn">Open</button></li></ul></div>
      <div class="AdminNotice projectRow"><ul><li><strong>Create Notice</strong></li><li><button class="statusBtn">Open</button></li></ul></div>
      <div class="AdminEmployeeData projectRow"><ul><li><strong>Check Employee Data</strong></li><li><button class="statusBtn">Open</button></li></ul></div>
      <div class="RegisterApplication projectRow"><ul><li><strong>Register Application</strong></li><li><button class="statusBtn">Open</button></li></ul></div>
      <div class="Feedback projectRow"><ul><li><strong>Check Feedbacks</strong></li><li><button class="statusBtn">Open</button></li></ul></div>      
    </div>

    <div class="secondDiv">
      <div class="todo">
        <div class="todoBar">
       <h1 class="todoHead">
  Todo
</h1>   
  <i class="fa-solid fa-plus btn btn-link" id="filter"></i>
        </div>

<div class="todoBody">
  <div class="todolist">
  <div class="todoItem">
    <span class="todoSerial">1</span>
    <span class="todoName">Complete dashboard</span>
    <span class="todoStatus pending">Pending</span>
  </div>
</div>
<div class="todolist">
<div class="todoItem">
    <span class="todoSerial">2</span>
    <span class="todoName">Check Attendance</span>
    <span class="todoStatus pending">Pending</span>
  </div>
</div>
<div class="todolist">
<div class="todoItem">
    <span class="todoSerial">3</span>
    <span class="todoName">Design admin panel</span>
    <span class="todoStatus done">Done</span>
  </div>
</div>
<div class="todolist">
<div class="todoItem">
    <span class="todoSerial">4</span>
    <span class="todoName">Complete list</span>
    <span class="todoStatus done">Done</span>
  </div>
</div>
<div class="todolist">
<div class="todoItem">
    <span class="todoSerial">5</span>
    <span class="todoName">Finish Design</span>
    <span class="todoStatus pending">Pending</span>
  </div>
</div>
<div class="todolist">
<div class="todoItem">
    <span class="todoSerial">6</span>
    <span class="todoName">API Handle</span>
    <span class="todoStatus done">Done</span>
  </div>
</div>
</div>

      </div>
      <div class="project">
      <div class="projectBar">
       <h1 class="projectHead">
  Projects
</h1>   
  
        </div>
        <div class="projectBody">
  <div class="projectlist">
  <div class="projectItem">
   <span class="projectSNO">1</span>
   <span class="projectTitle">Swiftstay</span>
   <span>
    <span class="ApplicationBtn ApplicationAcceptBtn"><button>Accept</button></span>
   <span class="ApplicationBtn ApplicationRejectBtn"><button>Reject</button></span>
   </span>
  </div>
</div>
<div class="projectlist">
  <div class="projectItem">
   <span class="projectSNO">2</span>
   <span class="projectTitle">Tasksphere</span>
   <span>
    <span class="ApplicationBtn ApplicationAcceptBtn"><button>Accept</button></span>
   <span class="ApplicationBtn ApplicationRejectBtn"><button>Reject</button></span>
   </span>
  </div>
</div>
<div class="projectlist">
  <div class="projectItem">
   <span class="projectSNO">3</span>
   <span class="projectTitle">Soul</span>
   <span>
    <span class="ApplicationBtn ApplicationAcceptBtn"><button>Accept</button></span>
   <span class="ApplicationBtn ApplicationRejectBtn"><button>Reject</button></span>
   </span>
  </div>
</div>
<div class="projectlist">
  <div class="projectItem">
   <span class="projectSNO">4</span>
   <span class="projectTitle">SoulApi</span>
   <span>
    <span class="ApplicationBtn ApplicationAcceptBtn"><button>Accept</button></span>
   <span class="ApplicationBtn ApplicationRejectBtn"><button>Reject</button></span>
   </span>
  </div>
</div>
<div class="projectlist">
  <div class="projectItem">
   <span class="projectSNO">5</span>
   <span class="projectTitle">Ownah</span>
   <span>
    <span class="ApplicationBtn ApplicationAcceptBtn"><button>Accept</button></span>
   <span class="ApplicationBtn ApplicationRejectBtn"><button>Reject</button></span>
   </span>
  </div>
</div>
<div class="projectlist">
  <div class="projectItem">
   <span class="projectSNO">6</span>
   <span class="projectTitle">Mental support system</span>
   <span>
    <span class="ApplicationBtn ApplicationAcceptBtn"><button>Accept</button></span>
   <span class="ApplicationBtn ApplicationRejectBtn"><button>Reject</button></span>
   </span>
  </div>
</div>
</div>
      </div>
    </div>

</body>
</html>
