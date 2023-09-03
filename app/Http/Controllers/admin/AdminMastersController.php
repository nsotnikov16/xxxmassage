<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\Admin\AdminMasterService;
use App\Services\ResponseService;
use Illuminate\Http\Request;

class AdminMastersController extends Controller
{
    protected $service;
    public function __construct(AdminMasterService $service)
    {
        $this->service = $service;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $result = $this->service->getMasters();
        return ResponseService::json($result);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $result = $this->service->createMaster();
        return ResponseService::json($result);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $result = $this->service->editMaster($id);
        return ResponseService::json($result);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $result = $this->service->deleteMaster($id);
        return ResponseService::json($result);
    }
}
