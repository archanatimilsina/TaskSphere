<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Workspace Form</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f7fc;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }

        .form-container {
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 600px;
        }

        h1 {
            text-align: center;
            color: #333;
            margin-bottom: 20px;
            font-size: 28px;
        }

        label {
            font-size: 16px;
            color: #555;
            margin-bottom: 5px;
            display: block;
        }

        input[type="text"], input[type="date"], select, textarea {
            width: 100%;
            padding: 10px;
            margin-bottom: 15px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 16px;
            box-sizing: border-box;
            transition: all 0.3s ease-in-out;
        }

        input[type="text"]:focus, input[type="date"]:focus, select:focus, textarea:focus {
            border-color: #007bff;
            outline: none;
            box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
        }

        textarea {
            resize: vertical;
            height: 150px;
        }

        button {
            background-color: #007bff;
            color: white;
            padding: 12px 20px;
            border: none;
            border-radius: 5px;
            font-size: 18px;
            cursor: pointer;
            width: 100%;
            transition: all 0.3s ease-in-out;
        }

        button:hover {
            background-color: #0056b3;
        }

        .output {
            margin-top: 30px;
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            display: none;
        }

        .output h2 {
            text-align: center;
            color: #333;
            margin-bottom: 15px;
        }

        .output p {
            font-size: 16px;
            color: #555;
        }

        .output strong {
            color: #007bff;
        }
    </style>
</head>
<body>

    <div class="form-container">
        <h1>Create Workspace</h1>
        <form id="workspaceForm">
            <label for="name">Workspace Name:</label>
            <input type="text" id="name" name="name" required><br>

            <label for="description">Description:</label>
            <textarea id="description" name="description" required></textarea><br>

            <label for="startdate">Start Date:</label>
            <input type="date" id="startdate" name="startdate" required><br>

            <label for="enddate">End Date:</label>
            <input type="date" id="enddate" name="enddate" required><br>
            <div class="custom-select">
  <label for="employees">Select Employees:</label>
  <select id="employees" name="employee[]" multiple>
  @foreach ( $employees as $employee)
<option value="{{ $employee->id}}">{{ $employee->fname}}</option>
  @endforeach
  </select>
</div>
<div class="custom-select">
  <label for="leader">choose Leader:</label>
  <select id="leader" name="leader" multiple>
  @foreach ( $employees as $employee)
<option value="{{ $employee->id}}">{{ $employee->fname}}</option>
  @endforeach
  </select>
</div>

<input type="hidden" name="projectId" value="7" id="projectId">
            <button type="submit">Submit</button>
        </form>
    </div>

    <div class="output" id="output"></div>

    <script>
        document.getElementById('workspaceForm').addEventListener('submit', function(event) {
            event.preventDefault();  // Prevent normal form submission
            const token= localStorage.getItem("token");

            // Get form data
            const name = document.getElementById('name').value;
            const description = document.getElementById('description').value;
            const startDate = document.getElementById('startdate').value;
            const endDate = document.getElementById('enddate').value;
            const selectedEmployees = Array.from(document.getElementById('employees').selectedOptions).map(option => option.value);
            const selectedLeaders = Array.from(document.getElementById('leader').selectedOptions).map(option => option.value);
            const projectId = document.getElementById('projectId').value;

            // Display data (for now, just show it on the page)
            document.getElementById('output').style.display="block";
            document.getElementById('output').innerHTML = `
                <h2>Workspace Details:</h2>
                <p><strong>Workspace Name:</strong> ${name}</p>
                <p><strong>Description:</strong> ${description}</p>
                <p><strong>Start Date:</strong> ${startDate}</p>
                <p><strong>End Date:</strong> ${endDate}</p>
                <p><strong>Members:</strong> ${selectedEmployees}</p>
                <p><strong>Leader:</strong> ${selectedLeaders}</p>
            `;

            const formData= new FormData;
formData.append("name",name);
formData.append("description",description);
formData.append("sdate",startDate);
formData.append("edate",endDate);
formData.append("projectId",projectId);
selectedEmployees.forEach(employee=> {
                formData.append('employee[]',employee)
            });
            selectedLeaders.forEach(leader=> {
                formData.append('leader[]',leader)
            });

            fetch("/api/workspaceCreate",{
method:"POST",
headers:
{
    'Authorization' :`Bearer ${token}`,
    
},
body:formData
}).then(response=>
{
    console.log(response);
    return response.json();
}
).then(data=>
{
   if(data.status==true)
   {
    alert("Workspace created Successful") 
    location.href="/api/workspaceView";
  
   }
   else{
alert("Error! Try Again")
   }
}
)
        });
    </script>

</body>
</html>
