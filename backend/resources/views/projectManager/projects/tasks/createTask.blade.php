<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .custom-select {
  font-family: Arial, sans-serif;
  width: 300px;
  margin: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 10px;
}

.custom-select label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

.custom-select select {
  width: 100%;
  height: 90px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 8px;
  font-size: 14px;
  background-color: #fff;
  color: #333;
  box-sizing: border-box;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

.custom-select select:focus {
  outline: none;
  border-color: #007bff;
}

.custom-select select option {
  padding: 10px;
}

.custom-select select option:checked {
  background-color: #007bff;
  color: #fff;
}

.custom-select select option:hover {
  background-color: #f0f0f0;
}

    </style>
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
        <h1>Assign Task</h1>
        <form id="taskForm">
            <label for="name">Task Name:</label>
            <input type="text" id="name" name="name" required><br>

            <label for="description">Description:</label>
            <textarea id="description" name="description" required></textarea><br>

            <div class="custom-select">
  <label for="employees">Select Employees:</label>
  <select id="employees" name="employee[]" multiple>
  @foreach ( $employees as $employee)
<option value="{{ $employee->id}}">{{ $employee->fname}}</option>
  @endforeach
  </select>
</div>
            <label for="startdate">Start Date:</label>
            <input type="date" id="startdate" name="startdate" required><br>

            <label for="enddate">End Date:</label>
            <input type="date" id="enddate" name="enddate" required><br>

            <label for="priority">Priority:</label>
            <select id="priority" name="priority" required>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select><br>
<input type="hidden" name="workspaceId" value="7" id="workspaceId">
<input type="hidden" name="projectId" value="7" id="projectId">
            <button type="submit">Submit</button>
        </form>
    </div>
    <div class="output" id="output"></div>




<script>
        document.getElementById('taskForm').addEventListener('submit', function(event) {
            event.preventDefault();  // Prevent normal form submission
            const token= localStorage.getItem("token");
const taskForm=document.getElementById("taskForm");
            // Get form data
            const name = document.getElementById('name').value;
            const description = document.getElementById('description').value;
            const sdate = document.getElementById('startdate').value;
            const edate = document.getElementById('enddate').value;
            const selectedOptions=Array.from(document.getElementById("employees").selectedOptions);
            const employees= selectedOptions.map(option=>option.value);
            
            const priority = document.getElementById('priority').value;
            const projectId = document.getElementById('projectId').value;
            const workspaceId = document.getElementById('workspaceId').value;

            document.getElementById('output').style.display="block"
            document.getElementById('output').innerHTML = `
                <h2>Task Details:</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Description:</strong> ${description}</p>
                <p><strong>Start Date:</strong> ${sdate}</p>
                <p><strong>End Date:</strong> ${edate}</p>
                <p><strong>Priority:</strong> ${priority}</p>
            `;
const formData= new FormData;
formData.append("name",name);
formData.append("description",description);
formData.append("sdate",sdate);
formData.append("edate",edate);
formData.append("priority",priority);
formData.append("workspaceId",workspaceId);
formData.append("projectId",projectId);
employees.forEach(employee => {
    formData.append('employee[]',employee)
 });
 
fetch("/api/taskCreate",{
method:"POST",
headers:
{
    'Authorization' :`Bearer ${token}`,
    
},
body:formData
}).then(response=>
{
    
    return response.json();
}
).then(data=>
{
   if(data.status==true)
   {
    alert("Task Assignment Successful") 
    // document.getElementById('output').style.display="none"
    // taskForm.reset();
    location.href="/api/taskView";
  
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