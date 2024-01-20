<?php

namespace App\Policies;

use Illuminate\Auth\Access\Response;
use App\Models\Order;
use App\Models\User;

class OrderPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->role !== 'client';
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user): bool
    {
        if ($user->role === 'client') {
            return false;
        } else {
            return true;
        }
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user, $doctorDepartment): bool
    {
        if ($user->role === 'sales') {
            return true;
        }
        return $user->department === $doctorDepartment;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Order $order): bool
    {
        if ($user->role === 'sales') {
            return true;
        }
        return $user->department === $order->doctor->department;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Order $order): bool
    {
        if ($user->role === 'sales') {
            return true;
        }
        return $user->department === $order->doctor->department;
    }
}
