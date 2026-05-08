<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class BaseController extends Controller
{
    public function sendResponse($result,$message)
    {
$response=
[
    'status' =>true,
    'message'=> $message,
    'data' => $result
];
return response()->json($response,200);
    }
    public function sendError($error,$errorMessage=[],$code=422)
    {
        $response =
        [
'status' => false,
'error' => $error,

        ];
        if(!empty($errorMessage))
        {
            $response['errorMessage']=$errorMessage;
        }
        return response()->json($response,$code);
    }
}
