<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Todo;
use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;

class TodoController extends BaseController
{
    
    public function changeTodoStatus(Request $request)
{
    $status=$request->input("status");
    $TodoId=$request->input("id");

    $todo=Todo::where('id',$TodoId)->update([
        'status'=> $status,
    ]);
    return $this->sendResponse($todo,"Status is changed" );

}
}
