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
       $select="SELECT * FROM cashiers where cid='$id'";
       $result=mysqli_query($con,$select);
       $data=mysqli_fetch_assoc($result);

       $query="DELETE FROM cashiers WHERE cid='$id'";
       $result=mysqli_query($con,$query);
       header('location:index.php');
     }
    
    ?>
</body>
</html>