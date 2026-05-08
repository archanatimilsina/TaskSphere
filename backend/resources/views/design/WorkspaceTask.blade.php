<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Task Table</title>

    <!-- Fonts & Icons -->
    <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@500&display=swap" rel="stylesheet">
    <script src="https://kit.fontawesome.com/c5a4938a4c.js" crossorigin="anonymous"></script>

    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            background-color: #1e293b;
            font-family: 'Baloo 2', sans-serif;
            color: #e2e8f0; /* Light slate color */
            padding: 20px;
        }

        .header-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            padding: 10px 20px;
            border-bottom: 2px solid #334155;
        }

        #heading {
            font-size: 2.5rem;
            color: #f8fafc;
        }

        #filter {
            font-size: 1.8rem;
            color: #f1f5f9;
            cursor: pointer;
            transition: color 0.3s, transform 0.3s;
        }

        #filter:hover {
            color: #94a3b8;
            transform: scale(1.2);
        }

        .table-container {
            max-height: 70vh;
            overflow-y: auto;
            border: 1px solid #334155;
            border-radius: 10px;
            background-color: #0f172a;
            padding: 10px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        thead {
            position: sticky;
            top: 0;
            background-color: #1e293b;
            z-index: 1;
        }

        th, td {
            padding: 12px 15px;
            text-align: left;
            border-bottom: 1px solid #334155;
        }

        th {
            color: #cbd5e1;
        }

        tbody tr:hover {
            background-color: #334155;
        }

        @media screen and (max-width: 768px) {
            #heading {
                font-size: 2rem;
            }

            th, td {
                font-size: 0.9rem;
                padding: 8px 10px;
            }

            #filter {
                font-size: 1.5rem;
            }
        }
    </style>
</head>
<body>

    <!-- Top Header with Title & Filter -->
    <div class="header-bar">
        <h1 id="heading">Tasks</h1>
        <i class="fa-solid fa-filter" id="filter" title="Filter"></i>
    </div>

    <!-- Scrollable Table Container -->
    <div class="table-container">
        <table>
            <thead>
                <tr>
                    <th>S.N</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Employee Username</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Status</th>
                    <th>Priority</th>
                    <th>Updated At</th>
                </tr>
            </thead>
            <tbody id="TaskTableBody">
                <!-- Sample Rows -->
                <tr>
                    <td>1</td>
                    <td>Website Redesign</td>
                    <td>Update homepage layout</td>
                    <td>johndoe</td>
                    <td>2025-04-10</td>
                    <td>2025-04-20</td>
                    <td>Ongoing</td>
                    <td>High</td>
                    <td>2025-04-21 14:30</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>API Fix</td>
                    <td>Resolve login issues</td>
                    <td>janedoe</td>
                    <td>2025-04-15</td>
                    <td>2025-04-18</td>
                    <td>Completed</td>
                    <td>Medium</td>
                    <td>2025-04-19 10:00</td>
                </tr>
            </tbody>
        </table>
    </div>

</body>
</html>
