<?php

namespace App\Http\Controllers\API;
use App\Http\Controllers\API\BaseController as BaseController;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AttendanceController extends BaseController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
    $cafes= User::all();
    return $this->sendResponse($cafes,"All the cafes");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'name' => 'required|string',
            'district' => 'required|string',
            'description' => 'required|string',
            'location' => 'required|string',
            'phone' => 'required|string', 
            'email' => 'required|email',
            'website' => 'required|url'
           
        ]);
        if($validate->fails())
        {
            return $this->sendError("Validation Error" ,$validate->errors()->all(),402);
        }

$cafe=User::create([
    'name'=>$request->name,
    'description'=>$request->description,
    'location'=>$request->location,
    'district'=>$request->district,
    'email'=>$request->email,
    'phone'=>$request->phone,
    'website'=>$request->website   
]);
return $this->sendResponse($cafe,"Data inserted Successfully");

    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
        $query=User::query();
       $cafename=$request->query("name");
       $district=$request->query("district");
       $location=$request->query("location");
       $rating=$request->query("rating");
       $id=$request->query("id");
       if($cafename)
       {
$query->where('name','LIKE',"%{$cafename}%");
       }
       if($id)
{
    $query->where('id','LIKE',"%{$id}%");

}


$cafes=$query->get();
if($cafes->isEmpty())
{
    return $this->sendResponse([],"No data found");

}
      return $this->sendResponse($cafes,"Your result");

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validate = Validator::make($request->all(), [
            'name' => 'required|string',
            'district' => 'required|string',
            'description' => 'required|string',
            'location' => 'required|string',
            'phone' => 'required|string', 
            'email' => 'required|email',
            'website' => 'required|url'    
        ]);
        if($validate->fails())
        {
            return $this->sendError("Validation Error" ,$validate->errors()->all(),402);
        }
        //image

$cafeUpdate= User::where("id",$id)->update([
    'name'=>$request->name,
    'description'=>$request->description,
    'location'=>$request->location,
    'district'=>$request->district,
    'email'=>$request->email,
    'phone'=>$request->phone,
    'website'=>$request->website,  
]);
$cafe=User::where('id',$id)->first();
if($cafeUpdate>0)
{
return $this->sendResponse($cafe,"Data is updated");
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
        $cafe=User::where('id',$id)->first();
        if(!$cafe)
        {
            return $this->sendError("cafe not found", [], 404);
        }
     $query=  $cafe->delete();
     if($query)
     {
               return $this->sendResponse([],"successfully deleted");

     }
    }
}
