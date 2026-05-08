<?php include('../../connection.php'); ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cashier Edit Page</title>
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
            height: 660px;
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
        <input type="text" required name="phone">
        <label for="start date">Start date</label>
        <input type="date" required name="email">
        <label for="End date">End date</label>
        <input type="date" required name="email">
      <input type="submit" name="submit" class="submit-btn" value="submit">
    </form>
  </div>
</div>
    </section>
  <?php 
  if(isset($_GET['id']))
  {
    $id=$_GET['id'];
    $select="SELECT * FROM cashiers where cid='$id'";
    $result=mysqli_query($con,$select);
    $data=mysqli_fetch_assoc($result);
  }
  ?>
 
<?php
 if(isset($_POST['submit']))
 {
    $name=$_POST['name'];
    $address=$_POST['address'];
    $email=$_POST['email'];
    $phone=$_POST['phone'];
    
$query1="UPDATE cashiers SET name='$name',address='$address',phone='$phone',email='$email' Where cid='$id'";
$result1=mysqli_query($con,$query1);

if($result1)
{
   ?>
   <script>
alert("Data Updated Successfully");
document.location.href='index.php';
</script>
<?php
}
 else{
   ?>
   <script>
alert("Cannot Run!!!");
document.location.href='edit.php';
</script>
<?php
 }

 }
?>

</div>
    </section>
</body>
</html>