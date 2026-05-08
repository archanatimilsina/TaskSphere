<?php
require("../../connection.php");
error_reporting(E_ALL);
ini_set('display_errors', 1);
if($_SERVER["REQUEST_METHOD"]==="POST")
{
    $input=json_decode(file_get_contents("php://input"),true);
    if(isset($input["date"]))
    {
        $date=$input['date'];
   
   $query="SELECT * FROM attendance WHERE attendance_date='$date'";
   $result=mysqli_query($con,$query);
   $attendanceAll=[];
   while($row=mysqli_fetch_assoc($result))
   {
    $attendanceAll[]=$row;
   }
   echo json_encode($attendanceAll);
   exit; 
}
elseif(isset($input['today']))
{
    $date=$input['today'];
    $query="SELECT * FROM attendance WHERE attendance_date='$date'";
    $result=mysqli_query($con,$query);
    $attendance=[];
    while($row=mysqli_fetch_assoc($result))
    {
     $attendance[]=$row;
    }
    echo json_encode($attendance);
    exit;
}
}


?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@500&display=swap" rel="stylesheet">
    <title>Document</title>
    <style>
        .head{
            height: 200px;
            width: 100%;
           
        }
        h1
        {
            text-align: center;
            font-size: 40px;
            font-family: 'Baloo 2', cursive;

        }
        #date-btn{
            
            width: 200px;
            height: 50px;
         position: absolute;
         top: 130px;
         right: 20px;
        }
        #attendance{
            min-width: 600px;
            width: auto;
            min-height: 300px;
            height: auto;
        }

     table tbody tr{
        height: 70px;
     }
     #delete-btn{
    border-left: 1px solid blue;
    padding: 5px;
   }

    #input-date{
    position: absolute;
   right: 140px;
   top: 160px;
    border: 1px solid black;
    width: 300px;
    height: 200px;
    z-index: 10;
    background-color: white;
    display: none;

   }
   #date-form{
    display: flex;
    flex-direction: column;
  padding: 30px;
    }
#date-form input{
    margin:20px 0 20px ;
    height: 40px;
    width: 100%;
}
#date-form button{
    background-color: blue;
    color: white;
}
#warn_div{
    display: flex;
    flex-direction: column;
    border: 1px solid black;
    width: 200px;
    height: 200px;
    margin: auto;
}
    </style>
</head>
<body>
    <div class="head">
    <h1>Click the date button</h1>
  <button id="date-btn" class="btn btn-primary">Check Attendance</button></div>
  <div id="input-date">
    <form action="" id="date-form">
        <h3>Input the date</h3>
        <input type="date" name="date" placeholder="Input Date">
        <button type="submit" id="okay_btn">Okay</button>
    </form>
  </div>
  <div class="attendance" id="attendance">
  <table class="table table-striped table-hover table-bordered align-middle">
        <thead>
            <tr>
                <th scope="col">S.N</th>
                <th scope="col">Name</th>
                <th scope="col">Attendance</th>
                <th scope="col">Buttons</th>
                
            </tr>
        </thead>
        <tbody id="attendanceTableBody">
     
        </tbody>
    </table>
  </div>

  <div id="warn-div">

  </div>
  <script>
    const check_btn=document.getElementById("date-btn");
    const input_div=document.getElementById("input-date");
    const okay_btn=document.getElementById("okay_btn");
const form=document.getElementById("date-form");
const today = new Date().toISOString().split('T')[0];

    const attendanceTableBody=document.getElementById("attendanceTableBody");
    check_btn.addEventListener("click",
        function()
        {
            if (input_div.style.display === "none") {
        input_div.style.display = "flex";
    } else {
        input_div.style.display = "none"; // Toggle back to none if clicked again
    }
        }
    );// When the form is submitted
form.addEventListener("submit", (event) => {
    event.preventDefault();

    let formData = new FormData(form);
    let date = formData.get("date");

    fetch("manage_attendance.php", {
        method: "POST",
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({ date: date })  // Fixing the JSON.stringify call
    })
    .then(response => response.json())
    .then(attendance => {
        attendanceTableBody.innerHTML = '';  // Clear previous entries
        attendance.forEach(entry => { 
             // Changed 'attendance' to 'entry' for clarity
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${entry.aid}</td>
                <td>${entry.employee_name}</td>
                <td>${entry.attendance}</td>
                <td>
                    <a href="update_attendance.php?id=${entry.aid}" id="edit-btn">Edit</a>
                    <a href="delete_attendance.php?id=${entry.aid}" id="delete-btn">Delete</a>
                </td>
            `;
            attendanceTableBody.appendChild(row);
        });
        input_div.style.display = "none"; 
    })
    .catch(err => {
        console.log(err);
    });
});

// Fetch today's attendance
fetch("manage_attendance.php", {
    method: "POST",
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ today: today})  // Format date properly
})
.then(response => response.json())
.then(data => {
    attendanceTableBody.innerHTML = '';  // Clear previous entries
    data.forEach(entry => {

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${entry.aid}</td>
            <td>${entry.employee_name}</td>
            <td>${entry.attendance}</td>
            <td>
                <a href="update_attendance.php?id=${entry.aid}" id="edit-btn" >Edit</a>
                <a href="delete_attendance.php?id=${entry.aid}" id="delete-btn" data-id=${entry.aid}>Delete</a>
            </td>
        `;
        attendanceTableBody.appendChild(row);
    });
})
.catch(err => console.log("Error fetching today's attendance:", err));

// const delete_btn=document.getElementById("delete-btn");
// delete_btn.addEventListener("click",
//     function()=>
// {
//     const warn_div=document.getElementById("warn-div");
//     const id=warn_div.getAttribute("data-id");

// if(warn_div.style.display==="none")
// {
//     warn_div.style.display="flex";
// }
// else
// warn_div.style.display="none";
// }
// );


  </script>
</body>
</html>