<?php

namespace App\Http\Controllers\API;
use App\Http\Controllers\API\BaseController as BaseController;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CompanyController extends BaseController
{
    // public function companyView()
    // {
    //     $companies= Company::all();
    //     return view('admin/company/compan')
    // }
public function allCompany()
{
    $companies= Company::all();
    return $this->sendResponse($companies,"ALl the Companies");
}
}
