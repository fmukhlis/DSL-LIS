<?php

namespace App\Providers;

use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        \App\Models\Order::class => \App\Policies\OrderPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        Gate::define('has-role', function (\App\Models\User $user, ...$roles) {
            foreach ($roles as $role) {
                if ($user->role === $role) {
                    return true;
                }
            }
            return false;
        });
        Gate::define('manage-order', function (\App\Models\User $user, int $num1, int $num2) {

            return $num1 > $num2
                ? \Illuminate\Auth\Access\Response::allow()
                : \Illuminate\Auth\Access\Response::deny('Youre not authorized!');
        });
    }
}
