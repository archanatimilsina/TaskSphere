<?php

namespace App\Http\Controllers\API;
use App\Http\Controllers\API\BaseController as BaseController;

use App\Http\Controllers\Controller;
use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TaskController extends BaseController
{
    public function taskCreateView()
    {
$employees= User::all();
return View('projectManager.projects.tasks.createTask',compact('employees'));

    }
    public function taskUpdateView(Request $request)
    {
        $employees= User::all();
        $taskId= $request->query('taskId');
$task= Task::where('id',$taskId)->first();
return View('projectManager.projects.tasks.updateTask',compact('task','employees'));

    }
public function taskView(Request $request)
{
$tasks= Task::all();
return view('projectManager/projects/tasks/manageTask',compact('tasks'));
}
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
    $task= Task::all();
    return $this->sendResponse($task,"All the tasks");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validate = Validator::make($request->all(), [
           'name' => 'required|string',
            'description' => 'required|string',
            'sdate' => 'required|date',
            'edate' => 'required|date', 
            'employee' => 'required|array'
        
        ]);
        if($validate->fails())
        {
            return $this->sendError("Validation Error" ,$validate->errors()->all(),402);
        }

$employee=json_encode($request->employee);

$task=Task::create([
    'name'=>$request->name,
    'description'=>$request->description,
    'sdate'=>$request->sdate,
    'edate'=>$request->edate,
    'employee'=>$employee,
   'priority'=> $request->priority,
   'workspaceId'=>$request->workspaceId,
   'projectId'=>$request->projectId
]);
return $this->sendResponse($task,"Data inserted Successfully");

    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
        $query=Task::query();
       $taskname=$request->query("name");
        $id=$request->query("id");
       if($taskname)
       {
$query->where('name','LIKE',"%{$taskname}%");
       }
       if($id)
{
    $query->where('id','LIKE',"%{$id}%");

}
$task=$query->get();
if($task->isEmpty())
{
    return $this->sendResponse([],"No data found");

}
      return $this->sendResponse($task,"Your result");

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validate = Validator::make($request->all(), [
            'name' => 'required|string',
            'description' => 'required|string',
            'sdate' => 'required|date',
            'edate' => 'required|date', 
            'employee' => 'required|array'
        ]);
        if($validate->fails())
        {
            return $this->sendError("Validation Error" ,$validate->errors()->all(),402);
        }
       
        $employee=json_encode($request->employee);
$taskUpdate= Task::where("id",$id)->update([
    'name'=>$request->name,
    'description'=>$request->description,
    'sdate'=>$request->sdate,
    'edate'=>$request->edate,
    'employee'=>$employee,
   'priority'=> $request->priority,
   'workspaceId'=>$request->workspaceId,
   'projectId'=>$request->projectId
]);
$task=User::where('id',$id)->first();
if($taskUpdate>0)
{
return $this->sendResponse($task,"Data is updated");
}
else{
    return $this->sendError("Data is not updated try again",[],402);
}

    } 
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
$taskid= $id;

        $task=Task::where('id',$taskid)->first();
       
        if(!$task)
        {
            return $this->sendError("task not found", [], 404);
        }
     $query=  $task->delete();
     if($query)
     {
               return $this->sendResponse([],"successfully deleted");

     }
    }
}
