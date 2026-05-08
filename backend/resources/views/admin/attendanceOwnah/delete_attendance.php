<?php
require("../../connection.php");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Task Delete Page</title>
</head>
<body>
    <?php 
     if(isset($_GET['id']))
     {
       $id=$_GET['id'];
       $query="DELETE FROM attendance WHERE aid=$id";
       $result=mysqli_query($con,$query);
       if($result)
       {
        echo" <script>
        alert('Data is deleted Successfully');
        window.location.href='manage_attendance.php';
        </script>";
       }
      
     }
    
    ?>
</body>
</html>