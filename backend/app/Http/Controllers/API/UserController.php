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
class UserController extends BaseController
{

public function userDash()
{
    return view('userDashboard');
}

public function userDashView(string $id)
{
    $projectInvolved = [];
    $workspaceInvolved = [];
    $tasks = [];
    $userId = $id;

    $user = User::find($userId);
    $todo = Todo::where('employeeId', $userId)->get();
    $projects = Project::all();
    $workspaces = Workspace::all();
    $tasks = Task::all();

    foreach ($projects as $project) {
        $members = json_decode($project->members, true); 
        if (in_array($userId, $members)) {
            $projectInvolved[] = $project->id;
        }
    }


    foreach ($workspaces as $workspace) {
        $members = json_decode($workspace->members, true); 
        if (in_array($userId, $members)) {
            $workspaceInvolved[] = $workspace->id;
        }
    }
   
    foreach ($tasks as $task) {
        $members = json_decode($task->employee, true); 
        if (in_array($userId, $members)) {
            $taskInvolved[] = $task->id;
        }
    }

   
    $projectCount = Project::count();
    $workspaceCount = Workspace::count();
    $taskCount = Task::count();
    $employeeCount = User::count();

    return $this->sendResponse([
        'todo' => $todo,
        'projectInvolved' => $projectInvolved, 
        'workspaceInvolved' => $workspaceInvolved, 
        'taskInvolved' => $taskInvolved, 
        'projects' => $projects,
        'workspaces' => $workspaces,
        'tasks' => $tasks,
        'projectCount' => $projectCount,
        'workspaceCount' => $workspaceCount,
        'taskCount' => $taskCount,
        'employeeCount' => $employeeCount
    ], "UserDash");
}

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
