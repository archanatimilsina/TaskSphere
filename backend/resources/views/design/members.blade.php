<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@500&display=swap" rel="stylesheet">
    <script src="https://kit.fontawesome.com/c5a4938a4c.js" crossorigin="anonymous"></script>

    <title>Document</title>
    <style>
       * {
    margin: 0;
    box-sizing: border-box;
    padding: 0;
    font-family: 'Baloo 2', sans-serif;
}
body {
    background-color: #1e293b;
}

#heading {
    color: white;
    font-size: 4rem;
    text-align: center;
    margin-top: 50px;
    margin-bottom: 30px;
}

.projectRow {
    background-color: white;
    border-radius: 20px;
    width: 80%;
    margin: 30px auto;
    height: 100px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s, box-shadow 0.2s;
}
.projectRow:hover {
    transform: scale(1.01);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
}

.projectRow ul {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding: 30px;
    align-items: center;
}
.projectRow ul li {
    list-style: none;
    font-size: 1.3rem;
    color: #1e293b;
}


    </style>
</head>

<body>
    <h1 id="heading">Employees</h1>


  <div class="projectRow">
<ul>
    <li>1</li>
    <li>Ram Krishna Shrestha</li>
    <li>Project Manager</li>
</ul>
  </div>
  <div class="projectRow">
<ul>
    <li>2</li>
    <li>Balaram Bhatta</li>
    <li>Admin</li>
   
</ul>
  </div>
  <div class="projectRow">
<ul>
    <li>3</li>
    <li>Salik Ram Karki</li>
    <li>Frontend Developer</li>

</ul>
  </div>
  <div class="projectRow">
<ul>
    <li>4</li>
    <li>Manita Adhikari</li>
    <li>Manager</li>

</ul>
  </div>
  <div class="projectRow">
<ul>
    <li>5</li>
    <li>Smarika Twaina</li>
    <li>Backend Developer</li>

</ul>
  </div>
  <div class="projectRow">
<ul>
    <li>6</li>
    <li>Dikshya Dahal</li>
    <li>Designer</li>
  
</ul>
  </div>


    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4" crossorigin="anonymous"></script>
<script>

</script>
</body>
</html>