<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\Admin\AdminProgrammService;
use App\Services\ResponseService;
use Illuminate\Http\Request;

class AdminProgrammsController extends Controller
{
    protected $service;
    public function __construct(AdminProgrammService $service)
    {
        $this->service = $service;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $result = $this->service->getProgramms();
        return ResponseService::json($result);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $result = $this->service->createProgramm();
        return ResponseService::json($result);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $result = $this->service->editProgramm($id);
        return ResponseService::json($result);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $result = $this->service->deleteProgramm($id);
        return ResponseService::json($result);
    }
}
