<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    use HasFactory;

    // Colunas que o Laravel pode preencher automaticamente
    protected $fillable = [
        'user_id',
        'category_id',
        'title',
        'description',
        'due_date',
        'is_completed',
        'alert_sent'
    ];
}
