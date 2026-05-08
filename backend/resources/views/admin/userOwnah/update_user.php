<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">
    <title>Title</title>
    <style>
          *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      #register{
        width: 560px;
        height: 660px ;
        border: 1px solid black;
        margin: 50px auto;
        border-radius: 20px;
      }
      #heading{
       
     text-align: center;
     margin: 20px 0;

      }

       form label{
            display: inline;
            font-size: 18px;
             font-family: 'Baloo 2', cursive;
             margin-left: 37px;
             margin-top: 13px;
        }
        form{
            display: flex;
           flex-direction: column;
        }
         form input{
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
    </style>
</head>
<body>
    
  <div class="container" id="register">
 <h1 id="heading">update Employee detail</h1>
    <form action="#" method="POST">
        <label for="Name">Name</label>
        <input type="text" required name="tname">
        <label for="description">Address</label>
        <input type="text" required name="description" id="description">
        <label for="assign-username">Phone Number</label>
        <input type="text" required name="phone">
        <label for="start date">Department</label>
        <input type="date" required name="email">
        <label for="End date">Secret Code</label>
        <input type="date" required name="email">
      <input type="submit" name="submit" class="submit-btn" value="submit">
    </form>
  </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4" crossorigin="anonymous"></script>
</body>
</html>