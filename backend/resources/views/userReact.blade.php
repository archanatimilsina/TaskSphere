<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@500&display=swap" rel="stylesheet">
  <script src="https://kit.fontawesome.com/c5a4938a4c.js" crossorigin="anonymous"></script>
  <title>User Dashboard</title>
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
  padding: 0 !important;
  margin: 0;
  display: flex;
  flex-direction: row;
  height: 100vh; 
}

#root {
  width: 100%;
  height: 100%; 
  display: flex; 
  flex-direction: row; 
}
  
  </style>
</head>

<body>
  <div id="root">

  </div>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4"
        crossorigin="anonymous"></script>
  @viteReactRefresh
  @vite('resources/js/react/user/UserApp.jsx')
</body>

</html>