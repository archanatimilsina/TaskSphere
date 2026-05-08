<?php
require("../../connection.php");

// // Fetch attendance status based on ID
// if (isset($_GET['id'])) {
//     $id = $_GET['id'];
//     $squery = "SELECT * FROM attendance WHERE aid='$id'";
//     $sresult = mysqli_query($con, $squery);

//     if (mysqli_num_rows($sresult) > 0) {
//         $row = mysqli_fetch_array($sresult);
//         $user = ["attendance" => $row['attendance']];
//     } else {
//         $user = ["attendance" => ""]; // Handle the case where no record is found
//     }
    
//     echo json_encode($user); // Send the attendance status as JSON
//     exit; // Exit to prevent further script execution
// }

// Update attendance status based on form submission
if (isset($_POST['submit'])) {
    $id = $_POST['id'];
    $attendance = $_POST['attendance'];
    $query = "UPDATE attendance SET attendance='$attendance' WHERE aid='$id'";
    $result = mysqli_query($con, $query);

    if ($result) {
        echo" <script>
                alert('Data is updated Successfully');
                window.location.href='manage_attendance.php';
                </script>";
    } else {
        echo "<script>alert('Error updating data');</script>";
    }
    exit; // Exit after processing the form
}
// ?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@500&display=swap" rel="stylesheet">
    <title>Title</title>
    <style>
        *{
            margin: 0;
            padding: 0;box-sizing: border-box;
        }

   #status_update select, label, option{
  width: 90%;
  font-size: 25px;
  font-family: 'Baloo 2', cursive;
   }
   #status_update label{
    margin-top: 15px;
    font-family: 'Baloo 2', cursive;
   }
   #status_update select{
    margin: 15px 0 20px 0;
    font-family: 'Baloo 2', cursive;
   }

   #status_update{
        width: 280px;
        height: 280px;
        margin: 70px auto;
        padding: 20px;
        display: flex;
        flex-direction: column;
        align-items: space-between;
border-radius: 20px;
background-color: pink;


     }
   #okay-btn
   {
    width: 110px;
outline: none;
color: white;
background-color: green;
font-family: 'Baloo 2', cursive;
   }
   #okay-btn:hover{
    opacity: 0.7;
   }
   #goBack-btn{
    width: 110px;
    background-color: red;
    color: white; font-family: 'Baloo 2', cursive;
  
   }
   #goBack-btn:hover{
    opacity: 0.7;
   }
    </style>
</head>
<body>
<div id="status_update" class="border border-gray border-4">
    <h2>
        Choose Status
    </h2>
    <form action="" method="POST">
    <input type="hidden" name="id" value="<?php echo $_GET['id']; ?>">
    <label for="select">Select Attendance</label>
    <select name="attendance" id="attendance-select">
        <option value="present">Present</option>
        <option value="absent">Absent</option>
    </select>

    <div class="btns">
        <button  type="submit" class="btn" id="okay-btn" name="submit">Okay</button>
        <button class="btn" id="goBack-btn">Go Back</button>
    </div>
</form>
</div>
   
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4" crossorigin="anonymous"></script>
<script>
//    fetch("update_attendance.php?id=<?php echo $_GET['id']; ?>")
//       .then(response=>{
//         return response.json()
//     }).then(data=>{
//     const attendance_select=document.getElementById("attendance-select");
//     attendance_select.value=data.attendance;
//     }).catch(err=>{
//         console.log(err)
//     });
</script>
</body>
</html>