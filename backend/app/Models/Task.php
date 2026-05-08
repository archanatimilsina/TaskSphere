<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable=[
'name','description','sdate','edate','employee','priority','workspaceId','projectId'];
}
