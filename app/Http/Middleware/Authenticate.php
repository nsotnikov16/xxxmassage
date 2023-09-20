<?php

namespace App\Http\Middleware;

use App\Services\ResponseService;
use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     */
    /* protected function redirectTo(Request $request): ?string
    {
        return $request->expectsJson() ? null : route('login');
    } */

    protected function unauthenticated($request, array $guards)
    {
        abort(ResponseService::json(['error' => 'Вы не авторизованы', 'code' => 401]));
    }
}
