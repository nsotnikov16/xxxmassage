<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\Admin\AdminRoomService;
use App\Services\ResponseService;
use Illuminate\Http\Request;

class AdminRoomsController extends Controller
{
    protected $service;
    public function __construct(AdminRoomService $service)
    {
        $this->service = $service;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $result = $this->service->getRooms();
        return ResponseService::json($result);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $result = $this->service->createRoom();
        return ResponseService::json($result);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $result = $this->service->editRoom($id);
        return ResponseService::json($result);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $result = $this->service->deleteRoom($id);
        return ResponseService::json($result);
    }
}
