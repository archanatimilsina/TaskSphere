<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tasks</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
     <style>
        
    </style>
</head>

<body>
<a href="{{ route('taskCreateView') }}"><button>Assign Task</button></a>

<table class="table table-striped table-hover">
<thead>
    <tr>
      <th scope="col">S.N</th>
      <th scope="col">Name</th>
      <th scope="col">Description</th>
      <th scope="col">start date</th>
      <th scope="col">end date</th>
      <th scope="col">Members</th>
      <th scope="col">status</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    @foreach ($tasks as $keys => $task )
       <tr>
      <th scope="row">{{ $loop->iteration }}</th>
      <td>{{ $task->name }}</td>
      <td>{{ $task->description }}</td>
      <td>{{ $task->sdate }}</td>
      <td>{{ $task->edate }}</td>
      <td>{{ implode(', ', json_decode($task->employee,true)) }}</td>
      <td>{{ $task->status }}</td>
      <td>{{ $task->leader }}</td>
      <td>
<a href="" data-id="{{ $task->id  }}" class="editBtn">Edit</a> | <a href="" data-id="{{ $task->id}}" class="deleteBtnFirst" data-bs-toggle="modal" data-bs-target="#DeleteModal">Delete</a>


      </td>
     
    </tr>
    @endforeach
 
    </tbody>
</table>


<!-- Delete Modal -->
<div class="modal fade" id="DeleteModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="deleteLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
       
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      Are you sure you want to delete it?
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary closeModalButton" data-bs-dismiss="modal">close</button>
        <button type="button" class="btn btn-primary deleteBtn" >Delete</button>
      </div>
    </div>
  </div>
</div>
    <!-- Delete Modal -->



<script>
  const table= document.querySelector('.table');
  const editBtn= document.querySelector(".editBtn");
  const token = localStorage.getItem("token");
  table.addEventListener("click",event=>
  {
    event.preventDefault();
    
    //edit Operation
    if(event.target && event.target.classList.contains('editBtn'))
    {

      const taskId= event.target.getAttribute("data-id");
      editOperation(taskId);
  }
  //edit Operation
  
  }
    );

    const deleteModal = document.getElementById('DeleteModal'); 
    if (deleteModal) {
      deleteModal.addEventListener('show.bs.modal', function (event) {
        var Deletebutton = event.relatedTarget;
        var taskId = Deletebutton.getAttribute('data-id');
        var deleteBtn= document.querySelector(".deleteBtn");
        deleteBtn.addEventListener('click',function(event)
        {
          event.preventDefault();
          deleteOperation(taskId)
        })
    });
  }


  function editOperation(Id)
  {
    const taskId= Id;
    window.location.href=`/api/taskUpdateView?taskId=${taskId}`;
   
  }
  
  function deleteOperation(id)
  {
    const taskId= id;
   
    fetch(`/api/taskDelete`,{
            method: "DELETE",
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'

            },
            body: JSON.stringify({taskId :taskId})
          }).then(response=>
          {
            return response.json();
          }
        ).then(data=>{
          if(data.message=="successfully deleted")
          {
            const closeButton = document.querySelector('.closeModalButton');
closeButton.click();
location.reload();
          }
        });
  }
              </script>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
