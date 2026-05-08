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
    justify-content: space-between;
    padding: 30px;
    align-items: center;
}
.projectRow ul li {
    list-style: none;
    font-size: 1.3rem;
    color: #1e293b;
}

.statusBtn {
    width: 100px;
    height: 40px;
    color: white;
    background-color: green;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s;
}
.statusBtn:hover {
    background-color: #4ade80; /* light green */
}
.topBar {
    display: flex;
    justify-content: flex-end;
    width: 80%;
    margin: 0 auto;
    margin-bottom: 10px;
}

    </style>
</head>

<body>
    <h1 id="heading">Projects</h1>
    <div class="topBar">
  <i class="fa-solid fa-filter btn btn-link" id="filter"></i>
</div>

  <div class="projectRow">
<ul>
    <li>1</li>
    <li>TaskSphere</li>
    <li>Working</li>
    <li><button class="statusBtn"> 
        Open
    </button></li>
</ul>
  </div>
  <div class="projectRow">
<ul>
    <li>2</li>
    <li>SwiftStay</li>
    <li>Completed</li>
    <li><button class="statusBtn"> 
        Open
    </button></li>
</ul>
  </div>
  <div class="projectRow">
<ul>
    <li>3</li>
    <li>Ownah</li>
    <li>Completed</li>
    <li><button class="statusBtn"> 
        Open
    </button></li>
</ul>
  </div>
  <div class="projectRow">
<ul>
    <li>4</li>
    <li>Mental health support system</li>
    <li>Completed</li>
    <li><button class="statusBtn"> 
        Open
    </button></li>
</ul>
  </div>
  <div class="projectRow">
<ul>
    <li>5</li>
    <li>Soul</li>
    <li>Working</li>
    <li><button class="statusBtn"> 
        Open
    </button></li>
</ul>
  </div>
  <div class="projectRow">
<ul>
    <li>6</li>
    <li>Soul API</li>
    <li>Completed</li>
    <li><button class="statusBtn"> 
        Open
    </button></li>
</ul>
  </div>


    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4" crossorigin="anonymous"></script>
<script>

</script>
</body>
</html>