<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Workspace extends Model
{
    protected $fillable=[
        'name','description','sdate','edate','members','leader'];
}
