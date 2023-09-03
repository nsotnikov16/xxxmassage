<?php

namespace App\Services\Admin;

use App\Models\Salon;
use App\Services\ResponseService;

/**
 * Class AdminSalonService.
 */
class AdminSalonService
{
    public function getSalons()
    {
        $result = ['data' => []];
        try {
            if (!$result['data'] = Salon::all()) {
                throw new \Exception('Салоны не найдены', 404);
            }
        } catch (\Throwable $e) {
            ResponseService::setError($e, $result);
        }

        return $result;
    }

    public function editSalon($id)
    {
        $result = [];

        try {
            if (!$salon = Salon::find($id)) {
                throw new \Exception('Салон не найден', 400);
            }

            $salon->name = request('name');
            $salon->description = request('description');

            if (!$salon->save()) {
                throw new \Exception("Ошибка редактирования салона");
            }

            $result['data'] = $salon;
        } catch (\Throwable $e) {
            ResponseService::setError($e, $result);
        }

        return $result;
    }

    public function createSalon()
    {
        $result = [];

        try {
            $salon = Salon::create([
                'name' => request('name'),
                'description' => request('description'),
            ]);

            if (!$salon) {
                throw new \Exception("Ошибка при добавлении салона");
            }

            $result['data'] = $salon;
        } catch (\Throwable $e) {
            ResponseService::setError($e, $result);
        }

        return $result;
    }

    public function deleteSalon($id)
    {
        $result = [];

        try {

            if (!$salon = Salon::find($id)) {
                throw new \Exception('Салон по запросу не найден');
            }

            if (!$salon->delete()) {
                throw new \Exception("Ошибка при удалении салона");
            }

            $result['data'] = ['id' => $id];
        } catch (\Throwable $e) {
            ResponseService::setError($e, $result);
        }

        return $result;
    }
}
