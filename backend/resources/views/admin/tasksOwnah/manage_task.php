
<?php
require("../../connection.php");
error_reporting((E_ALL));
ini_set("display_errors",1);
if($_SERVER['REQUEST_METHOD']==="POST")
{
    $input=json_decode(file_get_contents("php://input"),true);
    $sortValue=isset($input['sort']) ? $input['sort']:"";
    if($sortValue==="ByName")
    {
        $query="SELECT * FROM task ORDER BY tname";
    }
    elseif($sortValue==="ByPriority")
    {
        $query="SELECT * FROM task ORDER BY priority_no DESC";
    }
    $result=mysqli_query($con,$query);
    $task=[];
    while($row=mysqli_fetch_assoc($result))
    {
        $task[]=$row;
    }
    echo json_encode($task);
    exit ;
}
$query="SELECT * FROM task";
$result=mysqli_query($con,$query);
$alltask=[];
while($row=mysqli_fetch_assoc($result))
{
    $alltask[]=$row;
}

?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@500&display=swap" rel="stylesheet">
    <script src="https://kit.fontawesome.com/c5a4938a4c.js" crossorigin="anonymous"></script>  
      <title>Ownah Homepage</title>
      <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <style>
     .header{
        width: 100%;
        height: 100px;
      

     }
     .heading{
        text-align: center;
        font-weight: 300;
        padding: 10px;
        position: relative;
        font-size: 4rem;
     }
     .header i {
            font-size: 20px;
            position: absolute;
            top: 150px;
            right: 10px;
            text-decoration: none;
            color: black;
        }
     table tbody tr{
        height: 70px;
     }
    
  
  
   
   #delete-btn{
    border-left: 1px solid blue;
    padding: 5px;
   }
#create-btn{
    margin: 30px 20px 20px 30px;
    width: 150px;
    height: 40px;
    color: white;
    font-size: 20px;
    text-decoration: none;
}
#dropdown{
    position: static;
    top: 60px;

}
   
   </style>
</head>
<body>   
    <div class="header">
        <h1 class="heading mt-2 ">Tasks Assigned</h1>
           <!-- dropdown -->
           <div class="dropdown" id="dropdown">
            <i class="fa-solid fa-filter btn btn-link dropdown-toggle" id="filter" data-bs-toggle="dropdown"
                aria-expanded="false"></i>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
             <li><a class="dropdown-item" id="ByName">By Name</a></li>
             <li><a class="dropdown-item" id="ByPriority">By Priority</a></li>
            </ul>
        </div>
        <!-- dropdown -->
    </div>
    <button class="btn btn-link btn-primary" id="create-btn" >Create Task</button>
<div class="table-div">
    <table class="table table-striped table-hover table-bordered align-middle">
        <thead>
            <tr>
                <th scope="col">S.N</th>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Employee username</th>
                <th scope="col">Start Date</th>
                <th scope="col">End Date</th>
                <th scope="col">Priority</th>
                <th scope="col">Status</th>
                <th scope="col">Updated_at</th>
                <th scope="col">Access</th>
                
            </tr>
        </thead>
        <tbody id="TaskTableBody">
            <?php
            foreach($alltask as $row):
            ?>
            <tr >
                <td ><?php echo $row["tid"]; ?></td>
                <td><?php echo $row["tname"]; ?></td>
                <td><?php echo $row["tdescription"]; ?> </td>
                <td><?php echo $row["teusername"]; ?></td>
                <td><?php echo $row["tstart_date"]; ?></td>
                <td><?php echo $row["tend_date"]; ?></td>
                <td><?php echo $row["priority_no"]; ?></td>
                <td><button class="btn btn-info"><?php echo $row["tstatus"]; ?></button></td>
                <td> <?php echo $row["tcreated_at"]; ?></td>
                <td>
                    <a href="update_task.php" id="edit-btn">Edit</a>
                    <a href="delete_task.php" id="delete-btn">Delete</a>
                </td>
            </tr>
            <?php
            endforeach;
            ?>
        </tbody>
    </table>
</div>
    
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4" crossorigin="anonymous"></script>
<script>
$(document).ready(function() {
    $("#create-btn").click(function() {
        window.location.href = "tasks/create_task.php";  
    });
});
const priority=document.getElementById("ByPriority");
const name=document.getElementById("ByName");
const TaskTableBody=document.getElementById("TaskTableBody");
name.addEventListener("click",
    function()
    {
        TableData = "ByName";
        sendData(TableData); 
    }
);
priority.addEventListener("click",
    function()
    {
        TableData = "ByPriority";
        sendData(TableData); 
    }
);
function sendData(sortOption)
{
    const object={
        sort: sortOption
    }
    fetch("manage_task.php",
        {
            method:"POST",
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            body:JSON.stringify(object)
        }
    ).then(response=>
        {
            console.log(response);
            return response.json();
        }
    ).then(task=>{
        TaskTableBody.innerHTML = "";
        task.forEach(task => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${task.tid}</td>
                    <td>${task.tname}</td>
                    <td>${task.tdescription}</td>
                    <td>${task.teusername}</td>
                    <td>${task.tstart_date}</td>
                    <td>${task.tend_date}</td>
                    <td>${task.priority_no}</td>
                    <td>${task.tstatus}</td>
                    <td>${task.tcreated_at}</td>
                    <td>
                        <a href="update_user.php" id="edit-btn">Edit</a>
                        <a href="delete_user.php" id="delete-btn">Delete</a>
                    </td>

               
                `;
                TaskTableBody.appendChild(row);
            });
    }).catch(error=>{
        console.log(error)
    })
  
}

</script>
</body>
</html>