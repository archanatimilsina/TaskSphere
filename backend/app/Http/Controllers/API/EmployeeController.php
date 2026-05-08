<?php

namespace App\Http\Controllers\API;
use App\Http\Controllers\API\BaseController as BaseController;
use App\Mail\sendEmail;
use App\Models\User;
use App\Models\userVerifQueue;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class EmployeeController extends BaseController
{

    public function deleteUserData(string $id)
    {
        $employeeId= $id;
        $user=User::where("id",$employeeId)->delete();
        $msg="Data is deleted";
        if(!$user)
        {
             return $this->sendError("cannot delete data",404);
        }
        return $this->sendResponse($msg, "Data is Deleted Successfully") ;
    }

    public function update(Request $request, string $id)
    {
     $employeeId= $id;
     $scode= $request->input("scode");
     $role=$request->input('role');
     $user = User::find($employeeId);
     if (!$user) {
         return response()->json(['status' => false, 'message' => 'User not found'], 404);
     }
     
     $user->update([
         'scode' => $scode,
         'role' => $role
     ]);
      
     return $this->sendResponse($user,"Data is updated successfully");
    }


    public function show(string $id)
    {
        $user=User::where("id",$id)->first();
        return $this->sendResponse($user,"The specific User");
    }
    public function registerApplication()
    {
        $userApplication = userVerifQueue::all();
        return $this->sendResponse($userApplication,"All Register Application");

    }
    public function index()
    {
        $users = User::all();
        return $this->sendResponse($users,"All users");

    }
public function EmployeeRegisterData(Request $request)
{
    $userApplication = userVerifQueue::all();
    // dd($userApplication->toArray());
    return view('admin/RegisterApplication/index', compact('userApplication'));
    
}
public function EmployeeData(Request $request)
{
    $users = User::all();
    return view('projectManager/employees', compact('users'));
    
}
public function ScodeOperation(Request $request)
{
    $validateData = Validator::make(
        $request->all(),
        [
            'scode' => 'required',
            'role'=>'required'
        ]
    );
    if ($validateData->fails()) {
        return $this->sendError("Validation Error", $validateData->errors()->all(), 307);
    }
    $applicationId=$request->input('applicationId');
    $scode=$request->input('scode');
    $role=$request->input('role');
  $userApplication= userVerifQueue::where('id',$applicationId)->first();
  $user = User::create([
    'fname'=>$userApplication['fname'],
    'lname'=>$userApplication['lname'],
    'email'=>$userApplication['email'],
    'phone'=>$userApplication['phone'],
    'password'=>$userApplication['password'],
    'scode'=> $scode,
    'role'=>$role
  ]);
  if($user)
  {
    $fname=$userApplication['fname'];
    $subject="Successfully Registered";
    $content ="Hello $fname,Your Register Application has been accepted. Now you can enter this code when logging in: $scode";
    $footer="Keep this code as secret for professional reason.";
    Mail::to($userApplication['email'])->send(new sendEmail($subject,$content,$footer));
  }
  return $this->sendResponse($user, 'user registered successfully');
}

public function removeData($applicationId)
{
    

    $user= userVerifQueue::where("id",$applicationId)->delete();
    
    if($user)
    
    {
        return $this->sendResponse($user, 'user deleted Successfully');
    }
}
public function rejection(Request $request)
{

$applicationID= $request->input('applicationId');
$user = userVerifQueue::where('id',$applicationID)->delete();
if($user)
{
    return $this->sendResponse([],"User is removed from apllications");
}


}
}
