<?php

namespace App\Http\Controllers\API;
use App\Http\Controllers\API\BaseController as BaseController;

use App\Http\Controllers\Controller;
use App\Models\Task;
use App\Models\User;
use App\Models\Workspace;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class WorkspaceController extends BaseController
{


    public function OneWorkspace(string $id)
    {
        $workspace= Workspace::where('workspaceId',$id)->first();
        return $this->sendResponse($workspace," one Workspace");
    }
public function workspaceTask(string $id)
{
$tasks= Task::where('workspaceId', $id)->get();
return $this->sendResponse($tasks,"All the workspace Task");


}

    public function workspaceDash()
{
    return view('project-manager.projects.workspaces.workspace-dash');
}

    public function workspaceCreateView()
    {
$employees= User::all();
return View('projectManager.projects.workspaces.createWorkspace',compact('employees'));

    }

    public function workspaceUpdateView(Request $request)
    {
        $employees= User::all();
        $workspaceId= $request->query('workspaceId');
     
$workspace= Workspace::where('id',$workspaceId)->first();
return View('projectManager.projects.workspaces.updateWorkspace',compact('workspace','employees'));

    }

    public function workspaceView()
    {
        $workspaces= Workspace::all();
        return view('projectManager/projects/workspaces/manageWorkspace',compact('workspaces'));
    }


    /**
     * Display a listing of the resource.
     */
    public function index()
    {
    $workspace= Workspace::orderBy('created_at', 'desc')->get();
    return $this->sendResponse($workspace,"All the workspaces");
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
            'leader' => 'required',
            'employee' => 'required|array'
           
        ]);
        if($validate->fails())
        {
            return $this->sendError("Validation Error" ,$validate->errors()->all(),402);
        }


        $employee=json_encode($request->employee);
        $leader=json_encode($request->leader);

$workspace=Workspace::create([
      'name'=>$request->name,
    'description'=>$request->description,
    'sdate'=>$request->sdate,
    'edate'=>$request->edate,
    'members'=>$employee,
   'leader'=> $leader,
   'projectId'=> $request->projectId
]);
return $this->sendResponse($workspace,"Data inserted Successfully");

    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
        $query=Workspace::query();
       $workspacename=$request->query("name");
       $id=$request->query("id");
       if($workspacename)
       {
$query->where('name','LIKE',"%{$workspacename}%");
       }
       if($id)
{
    $query->where('id','LIKE',"%{$id}%");

}


$workspace=$query->get();
if($workspace->isEmpty())
{
    return $this->sendResponse([],"No data found");

}
      return $this->sendResponse($workspace,"Your result");

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
            'leader' => 'required|array',
            'employee' => 'required|array'
        ]);
        if($validate->fails())
        {
            return $this->sendError("Validation Error" ,$validate->errors()->all(),402);
        }
        //image
        $employee=json_encode($request->employee);
        $leader=json_encode($request->leader);

$workspaceUpdate= Workspace::where("id",$id)->update([
   'name'=>$request->name,
    'description'=>$request->description,
    'sdate'=>$request->sdate,
    'edate'=>$request->edate,
    'members'=>$employee,
   'leader'=> $leader
]);
$workspace=Workspace::where('id',$id)->first();
if($workspaceUpdate>0)
{
return $this->sendResponse($workspace,"Data is updated");
}
else{
    return $this->sendError("Data is not updated try again",[],402);
}

    } 
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    { 
        $id=$request->workspaceId;
        $workspace=Workspace::where('id',$id)->first();
        if(!$workspace)
        {
            return $this->sendError("workspace not found", [], 404);
        }
     $query=  $workspace->delete();
     if($query)
     {
               return $this->sendResponse([],"successfully deleted");

     }
    }
}
