<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Services\ResponseService;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Auth\LoginRequest;
use Exception;

class AuthenticatedSessionController extends Controller
{
    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request)
    {
        $result = [];
        try {

            $user = User::where('email', $request->email)->first();

            if (!$user) {
                throw new Exception('Неверный логин или пароль', 400);
            }
            $request->authenticate();

            $request->session()->regenerate();

            $result['data'] = ['name' => $user->name, 'email' => $user->email, 'id' => $user->id];
        } catch (\Throwable $e) {
            ResponseService::setError($e, $result);
        }

        return ResponseService::json($result);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): Response
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return response()->noContent();
    }
}
