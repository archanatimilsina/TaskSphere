<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\API\BaseController as BaseController;

class CommentController extends BaseController
{
 
    public function store(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'noticeHead' => 'required|string',
            'noticeDescription' => 'required|string',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
    
        if ($validate->fails()) {
            return $this->sendError("Validation Error", $validate->errors()->all(), 422);
        }
    
        $imagename = null;
    
        $notice = Comment::create([
            'noticeHead' => $request->noticeHead,
            'noticeDescription' => $request->noticeDescription,
            'image' => $imagename,
        ]);
    
        return $this->sendResponse($notice, "Notice inserted successfully");
    }

   }


