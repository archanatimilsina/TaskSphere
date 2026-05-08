<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@500&display=swap" rel="stylesheet">
  <script src="https://kit.fontawesome.com/c5a4938a4c.js" crossorigin="anonymous"></script>
  <title>Workspaces</title>
  <style>
    * {
      margin: 0;
      box-sizing: border-box;
      padding: 0;
    }
    body {
      background-color: #0f172a;
      font-family: 'Baloo 2', cursive;
      color: white;
      padding: 20px;
    }
    #heading {
      text-align: center;
      font-size: 3rem;
      margin-bottom: 30px;
      color: white;
    }
    .workspaceIndex {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 30px;
      max-width: 1200px;
      margin: auto;
    }
    .projectRow {
      background-color: #1e293b;
      border-radius: 20px;
      padding: 20px;
      height: 200px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .projectRow:hover {
      transform: translateY(-10px);
      box-shadow: 0 10px 20px rgba(0, 255, 170, 0.4);
    }
    .projectRow ul {
      list-style: none;
      padding: 0;
      width: 100%;
      text-align: center;
    }
    .projectRow ul li {
      font-size: 1.2rem;
      margin: 5px 0;
    }
    .statusBtn {
      width: 100px;
      height: 40px;
      color: white;
      background-color: #10b981;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      font-weight: bold;
      transition: background-color 0.3s ease;
    }
    .statusBtn:hover {
      background-color: #22c55e;
    }
  </style>
</head>
<body>

  <h1 id="heading">Workspaces</h1>

  <div class="workspaceIndex">
    <div class="projectRow">
      <ul>
        <li>1</li>
        <li>TaskSphere</li>
        <li>Working</li>
        <li><button class="statusBtn">Open</button></li>
      </ul>
    </div>

    <div class="projectRow">
      <ul>
        <li>2</li>
        <li>SwiftStay</li>
        <li>Completed</li>
        <li><button class="statusBtn">Open</button></li>
      </ul>
    </div>

    <div class="projectRow">
      <ul>
        <li>3</li>
        <li>Ownah</li>
        <li>Completed</li>
        <li><button class="statusBtn">Open</button></li>
      </ul>
    </div>

    <div class="projectRow">
      <ul>
        <li>4</li>
        <li>Mental Health Support System</li>
        <li>Completed</li>
        <li><button class="statusBtn">Open</button></li>
      </ul>
    </div>

    <div class="projectRow">
      <ul>
        <li>5</li>
        <li>Soul</li>
        <li>Working</li>
        <li><button class="statusBtn">Open</button></li>
      </ul>
    </div>

    <div class="projectRow">
      <ul>
        <li>6</li>
        <li>Soul API</li>
        <li>Completed</li>
        <li><button class="statusBtn">Open</button></li>
      </ul>
    </div>
  </div>

</body>
</html>
