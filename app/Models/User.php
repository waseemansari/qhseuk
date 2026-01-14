<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;
use Auth;
class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasRoles;
 
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'status',
        'designation',
        'phone',
        'created_by',
        'branch_id',
        'role_id'
    ];
     public function branch()
    {
        return $this->belongsTo(Branch::class, 'branch_id')->select('id', 'name');
    }
    public function user()
    {
        return $this->belongsTo(User::class, 'created_by')->select('id', 'name');
    }
    

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            // 'password' => 'hashed',
        ];
    }

     protected static function booted()
    {
        static::creating(function ($user) {
            // Automatically set branch_id if not already set
            if (!$user->branch_id) {
                $user->branch_id = Auth::user()->branch_id ?? 0;
            }
            if (!$user->created_by) {
                $user->created_by = Auth::user()->id ?? 0;
            }
       
        });

    }
}
