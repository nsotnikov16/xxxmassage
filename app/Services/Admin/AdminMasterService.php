<?php

namespace App\Services\Admin;

use App\Models\Master;
use App\Services\ResponseService;

/**
 * Class AdminMasterService.
 */
class AdminMasterService
{
    public function getMasters()
    {
        $result = ['data' => []];
        try {
            if (!$result['data'] = Master::with('salons')->get()) {
                throw new \Exception('Мастера не найдены', 404);
            }
        } catch (\Throwable $e) {
            ResponseService::setError($e, $result);
        }

        return $result;
    }

    public function editMaster($id)
    {
        $result = [];

        try {
            if (!$master = Master::find($id)) {
                throw new \Exception('Мастер не найден', 400);
            }

            $master->name = request('name');
            $master->description = request('description');
            $master->salons()->sync(request('salons'));

            if (!$master->save()) {
                throw new \Exception("Ошибка редактирования мастера");
            }

            $result['data'] = $master->load('salons');
        } catch (\Throwable $e) {
            ResponseService::setError($e, $result);
        }

        return $result;
    }

    public function createMaster()
    {
        $result = [];

        try {
            $master = Master::create([
                'name' => request('name'),
                'description' => request('description')
            ]);

            $master->salons()->attach(request('salons'));

            if (!$master) {
                throw new \Exception("Ошибка при добавлении мастера");
            }

            $result['data'] = $master->load('salons');
        } catch (\Throwable $e) {
            ResponseService::setError($e, $result);
        }

        return $result;
    }

    public function deleteMaster($id)
    {
        $result = [];

        try {

            if (!$master = Master::find($id)) {
                throw new \Exception('Мастер по запросу не найдена');
            }

            if (!$master->delete()) {
                throw new \Exception("Ошибка при удалении мастера");
            }

            $result['data'] = ['id' => $id];
        } catch (\Throwable $e) {
            ResponseService::setError($e, $result);
        }

        return $result;
    }
}
