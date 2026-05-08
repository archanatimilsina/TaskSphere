<?php

use App\Http\Controllers\API\AdminController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CompanyController;
use App\Http\Controllers\API\EmailController;
use App\Http\Controllers\API\EmployeeController;
use App\Http\Controllers\API\NoticeController;
use App\Http\Controllers\API\ProjectController;
use App\Http\Controllers\API\ProjectManagerController;
use App\Http\Controllers\API\TaskController;
use App\Http\Controllers\API\TodoController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\WorkspaceController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register',[AuthController::class,'signup'])->name('register');
Route::post('/emailverify', [AuthController::class,'emailVerify'])->name('registerVerify');
Route::post('/login',[AuthController::class,'login'])->name('login');
Route::get('/RegisterApplication',[EmployeeController::class,'EmployeeRegisterData'])->name('RegisterApplication');
Route::post('/passScode',[EmployeeController::class,'ScodeOperation'])->name('PassScode');
Route::delete( '/removeData/{applicationId}',[EmployeeController::class,'removeData'])->name('removeData');
Route::delete( '/deleteUserData/{applicationId}',[EmployeeController::class,'deleteUserData'])->name('deleteUserData');
Route::post('/rejection',[EmployeeController::class,'rejection'])->name('rejection');
Route::post('/userUpdateAdmin/{id}',[EmployeeController::class,'update'])->name('userUpdateAdmin');

Route::get("/userIndex",[UserController::class,'index'])->name("getUserData");
Route::get('/employeedata',[EmployeeController::class,'EmployeeData'])->name('EmployeeData');
Route::get('/allApplication',[EmployeeController::class,'registerApplication'])->name('All regsiter Applications');

Route::get('/taskIndex',[TaskController::class,'index'])->name('taskIndex');
Route::get('/workspaceIndex',[WorkspaceController::class,'index'])->name('workspaceIndex');
Route::get('/projectIndex',[ProjectController::class,'index'])->name('projectIndex');
Route::get('/companyIndex',[CompanyController::class,'index'])->name('companyIndex');

Route::post('/taskCreate',[TaskController::class,'store'])->name('taskCreate');
Route::post('/workspaceCreate',[WorkspaceController::class,'store'])->name('workspaceCreate');
Route::post('/projectCreate',[ProjectController::class,'store'])->name('projectCreate');
Route::post('/companyCreate',[CompanyController::class,'store'])->name('companyCreate');

Route::post('/taskUpdate/{id}',[TaskController::class,'update'])->name('taskUpdate');
Route::post('/workspaceUpdate/{id}',[WorkspaceController::class,'update'])->name('workspaceUpdate');
Route::post('/projectUpdate/{id}',[ProjectController::class,'update'])->name('projectUpdate');
Route::post('/companyUpdate',[CompanyController::class,'update'])->name('companyUpdate');

Route::post('/taskShow/{id}',[TaskController::class,'show'])->name('taskShow');
Route::post('/OneWorkspace/{id}',[TaskController::class,'OneWorkspace'])->name('OneWorkspace');
Route::post('/workspaceShow/{id}',[WorkspaceController::class,'show'])->name('workspaceShow');
Route::get('/projectShow/{id}',[ProjectController::class,'projectFetch'])->name('projectShow');

Route::delete('/taskDelete/{id}',[TaskController::class,'destroy'])->name('taskDelete');
Route::delete('/workspaceDelete',[WorkspaceController::class,'destroy'])->name('workspaceDelete');
Route::delete('/projectDelete',[ProjectController::class,'destroy'])->name('projectDelete');
Route::delete('/companyDelete',[CompanyController::class,'destroy'])->name('companyDelete');


Route::get('/workspaceView' ,[WorkspaceController::class,'workspaceView'])->name('workspaceView');
Route::get('/projectView' ,[ProjectController::class,'projectView'])->name('projectView');
Route::get('/taskView' ,[TaskController::class,'taskView'])->name('taskView');



Route::get('/workspaceExtract/{id}' , [ProjectController::class,'workspaceExtract'])->name('workspaceExtract');


Route::get('/projectCreateView',[ProjectController::class,'projectCreateView'])->name('projectCreateView');
Route::get('/workspaceCreateView',[WorkspaceController::class,'workspaceCreateView'])->name('workspaceCreateView');
Route::get('/taskCreateView',[TaskController::class,'taskCreateView'])->name('taskCreateView');

Route::get('/projectUpdateView',[ProjectController::class,'projectUpdateView'])->name('projectUpdateView');
Route::get('/workspaceUpdateView',[WorkspaceController::class,'workspaceUpdateView'])->name('workspaceUpdateView');
Route::get('/taskUpdateView',[TaskController::class,'taskUpdateView'])->name('taskUpdateView');


Route::get('/userDash/{id}' ,[UserController::class,'update'])->name('userDashUpdate');
Route::get('/projectManagerDash/{id}' ,[ProjectManagerController::class,'update'])->name('projectManagerDashUpdate');
Route::get('/adminDash/{id}' ,[AdminController::class,'update'])->name('adminDashUpdate');

Route::get('/userDashShow' ,[UserController::class,'show'])->name('userDashShow');
Route::get('/projectManagerDashShow' ,[ProjectManagerController::class,'show'])->name('projectManagerDashShow');
Route::get('/adminDashShow' ,[AdminController::class,'show'])->name('adminDashShow');

Route::get('/userDashDestroy' ,[UserController::class,'destroy'])->name('userDashDestroy');
Route::get('/projectManagerDashDestroy' ,[ProjectManagerController::class,'destroy'])->name('projectManagerDashDestroy');
Route::get('/adminDashDestroy' ,[AdminController::class,'destroy'])->name('destroyDestroy');

Route::get('/userDash' ,[UserController::class,'userDash'])->name('userDash');
Route::get('/projectManagerDash' ,[ProjectManagerController::class,'projectManagerDash'])->name('projectManagerDash');
Route::get('/adminDash' ,[AdminController::class,'adminDash'])->name('adminDash');

Route::get('/allUsers',[EmployeeController::class,'index'])->name('Allusers');
Route::get('/specificUser/{id}',[EmployeeController::class,'show'])->name('specificUser');
Route::get('/workspaceTask/{id}',[WorkspaceController::class,'workspaceTask'])->name("workspaceTask");

Route::post('/sendEmail',[EmailController::class,'sendEmail'])->name('sendEmail');
Route::post('/sendAcceptEmail',[EmailController::class,'sendAcceptEmail'])->name('sendAcceptEmail');
Route::post('/sendRejectEmail',[EmailController::class,'sendRejectEmail'])->name('sendRejectEmail');



Route::get('/singleNotice/{Id}',[NoticeController::class,'singleNotice'])->name('singleNotice');
Route::get('/allNotices',[NoticeController::class,'allNotices'])->name('allNotices');


Route::get('/projectManagerDashView/{id}',[ProjectManagerController::class,'projectManagerDashView'])->name('projectManagerDashView');
Route::get('/userDashView/{id}',[UserController::class,'userDashView'])->name('userDashView');
Route::get('/adminDashView/{id}',[AdminController::class,'adminDashView'])->name('adminDashView');
Route::post('/changeTodoStatus',[TodoController::class,'changeTodoStatus'])->name('changeTodoStatus');
Route::get('/projectInvolved',[ProjectController::class,'projectInvolved'])->name('projectInvolved');


Route::post('/logout',[AuthController::class,'logout'])->name('logout')->middleware('auth:sanctum');
