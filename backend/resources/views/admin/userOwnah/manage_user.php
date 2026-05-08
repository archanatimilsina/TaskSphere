<?php
require("../../connection.php");
error_reporting(E_ALL);
ini_set('display_errors', 1);
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get JSON input and decode
    $input = json_decode(file_get_contents("php://input"), true);
    $sortValue = isset($input['sort']) ? $input['sort'] : "";
    // Prepare the qu       ery based on sort option
    if ($sortValue === "ByName") {
        $query = "SELECT * FROM employee ORDER BY ename"; 
    } elseif ($sortValue === "ByDateAdded") {
        $query = "SELECT * FROM employee ORDER BY created_at"; 
    } 
    // Execute the query
    
    $result = mysqli_query($con, $query);
    // Prepare the response array with the data
    $employees = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $employees[] = $row; // Store each row in the array
    }
    // Output JSON and exit
    echo json_encode($employees);
    exit; // Prevent any additional output
}

    // Fetch all employees by default
    $query = "SELECT * FROM employee";
    $result = mysqli_query($con, $query);   
    // Prepare the employee rows for the table
    $allemployees=[];
    while ($row = mysqli_fetch_assoc($result)) {
        $allemployees[] = $row; 
    }
   

?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">
        <script src="https://kit.fontawesome.com/c5a4938a4c.js" crossorigin="anonymous" defer></script>
        <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@500&display=swap" rel="stylesheet">
    <title>Ownah Homepage</title>
    <style>  
    * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        .header {
            width: 100%;
            height: 100px;
        }
        #delete-btn {
            border-left: 1px solid blue;
            padding: 5px;
        }
        .heading {
            text-align: center;
            font-weight: 300;
            padding: 10px;
            position: relative;
            font-size: 4rem;
        }
        .header i {
            font-size: 20px;
            position: absolute;
            top: 150px;
            right: 10px;
            text-decoration: none;
            color: black;
        }
        table tbody tr {
            height: 70px;
        }
        #delete-btn {
            border-left: 1px solid blue;
            padding: 5px;
        }
        #create-btn {
            margin: 30px 20px 20px 30px;
            width: 150px;
            height: 40px;
            color: white;
            font-size: 20px;
            text-decoration: none;
        }
        #dropdown {}
        .head{
            width: 900px;
            height: 150px;
            border: 1px solid black;
        }
    </style>
</head>

<body>
   
    <div class="header">
        <h1 class="heading mt-2 ">Employees Details</h1>
        <!-- dropdown -->
        <div class="dropdown" id="dropdown">
            <i class="fa-solid fa-filter btn btn-link dropdown-toggle" id="filter" data-bs-toggle="dropdown"
                aria-expanded="false"></i>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><a class="dropdown-item" id="ByName">By name</a></li>
                <li><a class="dropdown-item" id="ByDateAdded">By date added</a></li>
            </ul>
        </div>
        <!-- dropdown -->
    </div>
    <a class="btn btn-link btn-primary" id="create-btn" href="register_user.php">Create Employee account</a>
    <div class="table-div">
        <table class="table table-striped table-hover table-bordered align-middle">
            <thead>
                <tr>
                    <th scope="col">S.N</th>
                    <th scope="col">Name</th>
                    <th scope="col">Department</th>
                    <th scope="col">Address</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col">Buttons</th>
                </tr>
            </thead>
            <tbody id="employeeTableBody">
         <?php foreach ($allemployees as $row): ?>
                    <tr>
                        <td><?php echo $row['eid']; ?></td>
                        <td><?php echo $row['ename']; ?></td>
                        <td><?php echo $row['edepartment']; ?></td>
                        <td><?php echo $row['eaddress']; ?></td>
                        <td><?php echo $row['ephone']; ?></td>
                        <td>
                            <a href="update_user.php" id="edit-btn">Edit</a>
                            <a href="delete_user.php" id="delete-btn">Delete</a>
                        </td>
                    </tr>
                <?php endforeach; ?> 
            </tbody>
        </table>
    </div>
    <script>
    const filter = document.getElementById("filter");
    const dropdown = document.querySelector("#dropdown");
    var TableData = undefined;
    dropdown.style.position = "static";
    const employeeTableBody = document.getElementById("employeeTableBody");
    const ByName = document.getElementById("ByName");
    const ByDateAdded = document.getElementById("ByDateAdded");
    ByName.addEventListener("click", function () {
        TableData = "ByName";
        sendData(TableData); 
    });
    ByDateAdded.addEventListener("click", function () {
        TableData = "ByDateAdded";
        sendData(TableData); 
    });
    function sendData(sortOption) {
    const click = { sort: sortOption };
    fetch("manage_user.php", {
        method: "POST",
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(click)
    })
    .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();  
    })
    .then(employee => {
 
   employeeTableBody.innerHTML = '';
           
            employee.forEach(employee => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${employee.eid}</td>
                    <td>${employee.ename}</td>
                    <td>${employee.edepartment}</td>
                    <td>${employee.eaddress}</td>
                    <td>${employee.ephone}</td>
                    <td>
                        <a href="update_user.php" id="edit-btn">Edit</a>
                        <a href="delete_user.php" id="delete-btn">Delete</a>
                    </td>
                `;
                employeeTableBody.appendChild(row);
            });
    })
    .catch(error => {
        console.error("Fetch error:", error);
    });
}
</script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js"
integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4"
crossorigin="anonymous"></script>
</body>
</html>