<!-- <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
      a{
        text-decoration: none;
        color: black;
      }
    </style>
</head>
<body>
  <button>
    <a href="{{ route('workspaceCreate') }}">Create Workshop</a>
  </button>


</body>
</html> -->


{{-- projectManager/projects/projectDash.blade.php --}}
<h1>Project Dashboard</h1>
<p>Project Name: {{ $project->name }}</p>
<p>Project Description: {{ $project->description }}</p>
<p>Project Start Date: {{ $project->sdate }}</p>
<p>Project End Date: {{ $project->edate }}</p>
<p>Project Creation Time: {{ $project->created_at }}</p>
<p>Project Status: {{ $project->status }}</p>
<p>Project Employee: {{
implode(', ',json_decode($project->members)) }}
</p>
<p>Project Status: {{ $project->status }}</p>

<!-- Add more fields as needed -->
