<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\API\BaseController as BaseController;

use App\Http\Controllers\Controller;
use App\Models\Notice;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class NoticeController extends BaseController
{


    public function singleNotice(string $id)
    {
        $notice = Notice::find($id);

        if (!$notice) {
            return $this->sendError("Notice not found", [], 404);
        }
        return $this->sendResponse($notice, 'Single notice fetched successfully');
    }

    public function allNotices(Request $request)
    {

$notices= Notice::all();
return $this->sendResponse($notices, 'All notices fetched successfully');
    }


  
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
    
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $ext = $image->getClientOriginalExtension();
            $imagename = time() . '_' . uniqid() . '.' . $ext; // dot was missing in your code
            $image->move(public_path('uploads/notices/'), $imagename);
        }
    
        $notice = Notice::create([
            'noticeHead' => $request->noticeHead,
            'noticeDescription' => $request->noticeDescription,
            'image' => $imagename,
        ]);
    
        return $this->sendResponse($notice, "Notice inserted successfully");
    }

   }