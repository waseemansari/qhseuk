<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }  

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
        if (config('app.env') === 'production') {
                \Illuminate\Support\Facades\URL::forceScheme('https');
            }
        Inertia::share([
        'auth' => function () {
        if ($user = Auth::user()) {
            // Eager load roles & permissions
            $user->load('roles', 'permissions');

            return [
                'user' => $user,
                'roles' => $user->roles->pluck('name'),
                'permissions' => $user->getAllPermissions()->pluck('name'),
            ];
        }

        return [
            'user' => null,
            'roles' => [],
            'permissions' => [],
        ];
    },
]);
    }
    protected $listen = [
        \App\Events\ElearningStudentRegistered::class => [
            \App\Listeners\ElearningStudentRegisteredListner::class,
        ],
    ];
}
