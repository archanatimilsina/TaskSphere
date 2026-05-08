<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        .projectActions {
            height: 400px;
            border: 2px solid black;
            width: 80%;
            border-radius: 30px;
            margin: 90px auto;
            box-shadow: 5px 5px 13px -2px black;
            position: relative;

        }

        .workspaceActions {
            height: 400px;
            border: 2px solid black;
            width: 80%;
            border-radius: 30px;
            margin: 90px auto;
            box-shadow: 5px 5px 13px -2px black;
            position: relative;

        }
        .taskActions{
            height: 500px;
            border: 2px solid black;
            width: 80%;
            border-radius: 30px;
            margin: 90px auto;
            box-shadow: 5px 5px 13px -2px black;

            position: relative;

        }
        .design{
            height: 500px;
            border: 2px solid black;
            width: 80%;
            border-radius: 30px;
            margin: 90px auto;
            box-shadow: 5px 5px 13px -2px black;

            position: relative;

        }

        .top{
            height: 500px;
            border: 2px solid black;
            width: 100%;
            border-radius: 30px;
            margin: 90px auto;
            box-shadow: 5px 5px 13px -2px black;
            position: relative;  
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
  
        }
        .top ::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: url(images/image.png) top no-repeat;
            filter: blur(1px);
            z-index: -1;
        
        }
        .user{
            height: 500px;
            border: 2px solid black;
            width: 100%;
            border-radius: 30px;
            margin: 90px auto;
            box-shadow: 5px 5px 13px -2px black;
            position: relative;  
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
  
        }
        .user ::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: url(images/dms2.jpg) center no-repeat;
            filter: blur(1px);
            z-index: -1;
        
        }
        .projectManager{
            height: 500px;
            border: 2px solid black;
            width: 100%;
            border-radius: 30px;
            margin: 90px auto;
            box-shadow: 5px 5px 13px -2px black;
            position: relative;  
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
  
        }
        .projectManager ::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: url(images/gonXkillua.jpg) center no-repeat;
            filter: blur(1px);
            z-index: -1;
        
        }
        .admin{
            height: 500px;
            border: 2px solid black;
            width: 100%;
            border-radius: 30px;
            margin: 90px auto;
            box-shadow: 5px 5px 13px -2px black;
            position: relative;  
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
  
        }
        .admin ::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: url(images/n1.jpg) center no-repeat;
            filter: blur(1px);
            z-index: -1;
        
        }
         .projectActions ::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: url(images/luffy.jpg) top no-repeat;
            filter: blur(1.5px);
            z-index: -1;
        }

        .workspaceActions::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: url(images/guid3.jpg) center no-repeat;
            filter: blur(1.5px);
            z-index: -1;
        }
        .taskActions::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: url(images/heaven2.jpg) bottom no-repeat;
            filter: blur(1.5px);
            z-index: -1;
        }
        .design::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: url(images/hello.jpg) bottom no-repeat;
            filter: blur(1.5px);
            z-index: -1;
        }

        .projectActions h1 {
            text-align: center;
            font-family: cursive;
            font-size: 50px;
        }

        .workspaceActions h1 {
            text-align: center;
            font-family: cursive;
            font-size: 50px;
        }
        .taskActions h1 {
            text-align: center;
            font-family: cursive;
            font-size: 50px;
        }
        .design h1 {
            text-align: center;
            font-family: cursive;
            font-size: 50px;
        }

        .projectActions a button {
            width: 170px;
            height: 70px;
            margin-left: 30px;
            background-color: #F5E0B7;
            border: 1px solid black;
            border-radius: 10px;
            box-shadow: 5px 5px 9px -2px black;
            
        }
        .top h1{
            text-align: center;
            font-family: cursive;
            font-size: 50px;
        }
        .top a button {
            width: 170px;
            height: 70px;
            margin-left: 30px;
            background-color:rgb(255, 255, 255);
            border: 1px solid black;
            border-radius: 10px;
            box-shadow: 5px 5px 9px -2px black;
         font-weight: bold;
        }
        .user h1{
            text-align: center;
            font-family: cursive;
            font-size: 50px;
        }
        .user a button {
            width: 170px;
            height: 70px;
            margin-left: 30px;
            background-color:rgb(255, 255, 255);
            border: 1px solid black;
            border-radius: 10px;
            box-shadow: 5px 5px 9px -2px black;
         font-weight: bold;
        }
        .projectManager h1{
            text-align: center;
            font-family: cursive;
            font-size: 50px;
        }
        .projectManager a button {
            width: 170px;
            height: 70px;
            margin-left: 30px;
            background-color:rgb(255, 255, 255);
            border: 1px solid black;
            border-radius: 10px;
            box-shadow: 5px 5px 9px -2px black;
         font-weight: bold;
        }
        .admin h1{
            text-align: center;
            font-family: cursive;
            font-size: 50px;
        }
        .admin a button {
            width: 170px;
            height: 70px;
            margin-left: 30px;
            background-color:rgb(255, 255, 255);
            border: 1px solid black;
            border-radius: 10px;
            box-shadow: 5px 5px 9px -2px black;
         font-weight: bold;
        }
        .workspaceActions a button {
            width: 170px;
            height: 70px;
            margin-left: 30px;
            background-color:rgb(255, 255, 255);
            border: 1px solid black;
            border-radius: 10px;
            box-shadow: 5px 5px 9px -2px black;
        }
        .taskActions a button {
            width: 170px;
            height: 70px;
            margin-left: 30px;
            background-color:rgb(250, 250, 250);
            border: 1px solid black;
            border-radius: 10px;
            box-shadow: 5px 5px 9px -2px black;
        }
        .design a button {
            width: 170px;
            height: 70px;
            margin-left: 30px;
            background-color:rgb(250, 250, 250);
            border: 1px solid black;
            border-radius: 10px;
            box-shadow: 5px 5px 9px -2px black;
            margin-top: 30px;
        }
    </style>
</head>

<body>
    <div class="top">
      <h1>Welcome to index page</h1>
    <a href="{{route('registerView')}}"><button>
            Register
        </button></a>
    <a href="{{route('loginView')}}"><button>
            Login
        </button></a>
    <a href="{{route('adminPanel')}}"><button>
            Admin Panel
        </button></a>
    <a href="{{route('pmPanel')}}"><button>
            project Manager Panel
        </button></a>
    <a href="{{route('pmPanel')}}"><button>
            Project Dashboard
        </button></a>
    <a href="{{route('pmPanel')}}"><button>
            Workspace Dashboard
        </button></a>   
    </div>
   
    <div class="user">
      <h1>user Panel</h1>
      <a href="{{route('userDash')}}"><button>
          User Dashboard
        </button></a>
    <a href="{{route('registerView')}}"><button>
            Manage
        </button></a>
    <a href="{{route('loginView')}}"><button>
            Create
        </button></a>
    <a href="{{route('adminPanel')}}"><button>
            Update 
        </button></a>
    <a href="{{route('pmPanel')}}"><button>
          Delete
        </button></a>
    </div>
   
    <div class="projectManager">
      <h1>Project Manager Panel</h1>
      <a href="{{route('projectManagerDash')}}"><button>
          Project Manager Dashboard
        </button></a>
    <a href="{{route('registerView')}}"><button>
            Manage
        </button></a>
    <a href="{{route('loginView')}}"><button>
            Create
        </button></a>
    <a href="{{route('adminPanel')}}"><button>
            Update 
        </button></a>
    <a href="{{route('pmPanel')}}"><button>
          Delete
        </button></a>
    </div>

    <div class="admin">
      <h1>Admin Panel</h1>
      <a href="{{route('reactAdmin')}}"><button>
        Admin Dashboard
        </button></a>
    <a href="{{route('registerView')}}"><button>
            Manage
        </button></a>
    <a href="{{route('loginView')}}"><button>
            Create
        </button></a>
    <a href="{{route('adminPanel')}}"><button>
            Update 
        </button></a>
    <a href="{{route('pmPanel')}}"><button>
          Delete
        </button></a>
    </div>


    <div class="projectActions">
        <h1>
            Project
        </h1>
        <a href="{{route('projectView')}}"><button>
                Manage
            </button></a>
        <a href="{{route('projectCreateView')}}"><button>
                Create
            </button></a>
        <a href="{{route('projectUpdateView')}}"><button>
                Update
            </button></a>
        <a href="{{route('pmPanel')}}"><button>
                Delete
            </button></a>
        <a href="{{route('pmPanel')}}"><button>
                Show
            </button></a>
    </div>


    <div class="workspaceActions">
        <h1>
            Workspaces
        </h1>
        <a href="{{route('workspaceView')}}"><button>
                Manage
            </button></a>
        <a href="{{route('workspaceCreateView')}}"><button>
                Create
            </button></a>
        <a href="{{route('workspaceUpdateView')}}"><button>
                Update
            </button></a>
        <a href="{{route('pmPanel')}}"><button>
                Delete
            </button></a>
        <a href="{{route('pmPanel')}}"><button>
                Show
            </button></a>
    </div>


    <div class="taskActions">
        <h1>
            Tasks
        </h1>
        <a href="{{route('taskView')}}"><button>
                Manage
            </button></a>
        <a href="{{route('taskCreateView')}}"><button>
                Create
            </button></a>
        <a href="{{route('taskUpdateView')}}"><button>
                Update
            </button></a>
        <a href="{{route('pmPanel')}}"><button>
                Delete
            </button></a>
        <a href="{{route('pmPanel')}}"><button>
                Show
            </button></a>
    </div>

    <div class="design">
        <h1>
            Design
        </h1>
        <a href="{{route('projectDashDesign')}}"><button>
        Project Dashboard
            </button></a>
        <a href="{{route('workspaceDashDesign')}}"><button>
        Workspace Dash
            </button></a>
        <a href="{{route('taskDashDesign')}}"><button>
        taskDash
            </button></a>
        <a href="{{route('adminDashDesign')}}"><button>
        adminDash
            </button></a>
        <a href="{{route('projectManagerDashDesign')}}"><button>
        projectManagerDash
            </button></a>
            <a href="{{route('userDashDesign')}}"><button>
            userDash
            </button></a>
            <a href="{{route('projectIndexDesign')}}"><button>
            projectIndex
            </button></a>
            <a href="{{route('workspaceIndexDesign')}}"><button>
            workspaceIndex
            </button></a>
            <a href="{{route('taskIndexDesign')}}"><button>
            taskIndex
            </button></a>
         
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>

</body>

</html>