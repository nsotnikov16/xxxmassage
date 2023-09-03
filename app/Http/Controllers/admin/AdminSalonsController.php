<?php

namespace App\Http\Controllers\Admin;

use App\Services\ResponseService;
use Illuminate\Http\Request;
use App\Services\Admin\AdminSalonService;
use App\Http\Controllers\Controller;

class AdminSalonsController extends Controller
{

    protected $service;
    public function __construct(AdminSalonService $service)
    {
        $this->service = $service;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $result = $this->service->getSalons();
        return ResponseService::json($result);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $result = $this->service->createSalon();
        return ResponseService::json($result);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $result = $this->service->editSalon($id);
        return ResponseService::json($result);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $result = $this->service->deleteSalon($id);
        return ResponseService::json($result);
    }
}
