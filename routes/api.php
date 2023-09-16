<?php

use App\Http\Controllers\Admin\AdminProgrammsController;
use App\Http\Controllers\Admin\AdminMastersController;
use App\Http\Controllers\Admin\AdminSalonsController;
use App\Http\Controllers\Admin\AdminRoomsController;
use App\Http\Controllers\SalonsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/all', [SalonsController::class, 'index']);
Route::patch('/masters/{master_id}/updateRoom/{room_id}', [SalonsController::class, 'updateRoomForMaster']);
Route::patch('/rooms/{room_id}/updateProgramm', [SalonsController::class, 'updateProgrammInRoom']);
Route::patch('/rooms/{room_id}/updateStatus', [SalonsController::class, 'updateStatusRoom']);

Route::prefix('admin')->group(function () {
    Route::resource('salons', AdminSalonsController::class);
    Route::resource('programms', AdminProgrammsController::class);
    Route::resource('masters', AdminMastersController::class);
    Route::resource('rooms', AdminRoomsController::class);
});
