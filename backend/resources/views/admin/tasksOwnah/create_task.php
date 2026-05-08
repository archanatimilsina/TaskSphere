<?php
require("../../connection.php");
error_reporting(E_ALL);  // Report all errors
ini_set('display_errors', 1);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Task Create</title>
    <style>
        *
        {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
#tp-btn
        {
            background-color: blue;
            color: white;
            font-size: 16px; 
        font-family: 'Baloo 2', cursive;
        width: 150px;
        height: 40px;
   margin: 50px 50px;
   border-radius: 10px;
        }
        .form-data{
            width: 450px;
            height: 770px;
            border: 1px solid black;
            margin: auto;
            margin-top: 20px;
            margin-bottom: 50px;
        }
        .form-head{
            margin-top: 20px;
            text-align: center;
            font-size: 22px;
             font-family: 'Baloo 2', cursive;
        }
       .form-data form label{
            display: inline;
            font-size: 18px;
             font-family: 'Baloo 2', cursive;
             margin-left: 37px;
             margin-top: 13px;
        }
        .form-data form{
            display: flex;
           flex-direction: column;
        }
        .form-data form input{
        margin: auto;
            width: 80%;
            height: 40px;
            margin-top: 15px;
            font-size: 18px;
             font-family: 'Baloo 2', cursive;

        }
        .submit-btn{
            background-color: green;
            font-size: 20px;
            color: white;
        }
    #description{
        min-height: 90px;
        height: auto;

    }
    </style>
</head>
<body>
<section class="main">
<div class="container">
    <a href="manage_task.php"><button id="tp-btn">Manage Data</button></a>
  <div class="form-data">
  <h1 class="form-head">Enter data</h1>
    <form action="#" method="POST">
        <label for="Name"> Task Name</label>
        <input type="text" required name="tname">
        <label for="description">Description</label>
        <input type="text" required name="description" id="description">
        <label for="assign-username">Employee Username</label>
        <input type="text" required name="eusername">
        <label for="priority no">Priority No</label>
        <input type="text" required name="pno">
        <label for="start date">Start date</label>
        <input type="date" required name="sdate">
        <label for="End date">End date</label>
        <input type="date" required name="edate">
      <input type="submit" name="submit" class="submit-btn" value="submit">
    </form>
  </div>
</div>
    </section>
    <?php
    if(isset($_POST['submit']))
    {
       $tname=$_POST['tname'];
       $tdescription=$_POST['description'];
       $eusername=$_POST['eusername'];
       $priority_no=$_POST['pno'];
       $sdate=$_POST['sdate'];
       $edate=$_POST['edate'];
       $tstatus="Not Started";
       
      if($tname!="" && $eusername!="" && $tdescription!="")
      {
        $iquery="INSERT INTO task (tname,tdescription,teusername,tstart_date,tend_date,tstatus,priority_no) VALUES ('$tname','$tdescription','$eusername','$sdate','$edate','$tstatus','$priority_no')";
        $iresult=mysqli_query($con,$iquery);
        if($iresult)
        {
            echo '<script>alert("Task is assigned successfully");</script>';
            $nhead="Task is assigned";
            $nbody=$tdescription;
            $nquery="INSERT INTO notification(nhead,nbody,neusername) VALUES('$nhead','$nbody','$eusername')";
            $nresult=mysqli_query($con,$nquery);  
        }
      }
    }
    ?>
</body>
</html>
