<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\Task;
use App\Models\Todo;
use App\Models\User;
use App\Models\Workspace;
use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;

class ProjectManagerController extends BaseController
{

public function projectManagerDash()
{
    return view('projectManager/projectManagerDash');
}


public function projectManagerDashView(string $id)
{
 $todo=Todo::where('employeeId',$id)->get();
 $projects=Project::all();
 $workspaces=Workspace::all();
 $tasks=Task::all();
 $projectCount=Project::count();
 $workspaceCount=Workspace::count();
 $taskCount=Task::count();
$employeeCount=User::count();

 return $this->sendResponse([
    'todo'=> $todo,
    'projects'=>$projects,
    'workspaces'=> $workspaces,
    'tasks'=> $tasks,
    'projectCount'=> $projectCount,
    'workspaceCount'=>$workspaceCount,
    'taskCount'=>$taskCount,
    'employeeCount'=>$employeeCount

 ],"Project Manager Dash");
}
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
    
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
