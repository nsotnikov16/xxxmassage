<?php

namespace App\Services\Admin;

use App\Models\Programm;
use App\Services\ResponseService;

/**
 * Class AdminProgrammService.
 */
class AdminProgrammService
{
    public function getProgramms()
    {
        $result = ['data' => []];
        try {
            if (!$result['data'] = Programm::with('salons')->get()) {
                throw new \Exception('Программы не найдены', 404);
            }
        } catch (\Throwable $e) {
            ResponseService::setError($e, $result);
        }

        return $result;
    }

    public function editProgramm($id)
    {
        $result = [];

        try {
            if (!$programm = Programm::find($id)) {
                throw new \Exception('Программа не найдена', 400);
            }

            $programm->name = request('name');
            $programm->price = request('price');
            $programm->time = request('time');
            $programm->salons()->sync(request('salons'));

            if (!$programm->save()) {
                throw new \Exception("Ошибка редактирования программы");
            }

            $result['data'] = $programm->load('salons');
        } catch (\Throwable $e) {
            ResponseService::setError($e, $result);
        }

        return $result;
    }

    public function createProgramm()
    {
        $result = [];

        try {
            $programm = Programm::create([
                'name' => request('name'),
                'price' => request('price'),
                'time' => request('time'),
            ]);

            $programm->salons()->attach(request('salons'));

            if (!$programm) {
                throw new \Exception("Ошибка при добавлении программы");
            }

            $result['data'] = $programm->load('salons');
        } catch (\Throwable $e) {
            ResponseService::setError($e, $result);
        }

        return $result;
    }

    public function deleteProgramm($id)
    {
        $result = [];

        try {

            if (!$programm = Programm::find($id)) {
                throw new \Exception('Программа по запросу не найдена');
            }

            if (!$programm->delete()) {
                throw new \Exception("Ошибка при удалении программы");
            }

            $result['data'] = ['id' => $id];
        } catch (\Throwable $e) {
            ResponseService::setError($e, $result);
        }

        return $result;
    }
}
