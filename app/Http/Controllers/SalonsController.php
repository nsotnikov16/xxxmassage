<?php

namespace App\Http\Controllers;

use App\Services\ResponseService;
use Illuminate\Http\Request;
use App\Services\SalonsService;

class SalonsController extends Controller
{
    protected $service;
    public function __construct(SalonsService $service)
    {
        $this->service = $service;
    }
    public function index()
    {
        $data = $this->service->getAllInfo();
        return ResponseService::json($data);
    }

    public function updateRoomForMaster($masterId, $roomId)
    {
        $data = $this->service->updateRoomForMaster($masterId, $roomId);
        return ResponseService::json($data);
    }

    public function updateProgrammInRoom($roomId)
    {
        $data = $this->service->updateProgrammInRoom($roomId);
        return ResponseService::json($data);
    }

    public function updateStatusRoom($roomId)
    {
        $data = $this->service->updateStatusRoom($roomId);
        return ResponseService::json($data);
    }
}
