<?php

namespace App\Services\Admin;

use App\Models\Room;
use App\Services\ResponseService;

/**
 * Class AdminRoomService.
 */
class AdminRoomService
{
    public function getRooms()
    {
        $result = ['data' => []];
        try {
            if (!$result['data'] = Room::with('salon')->get()) {
                throw new \Exception('Комнаты не найдены', 404);
            }
        } catch (\Throwable $e) {
            ResponseService::setError($e, $result);
        }

        return $result;
    }

    public function editRoom($id)
    {
        $result = [];

        try {
            if (!$room = Room::find($id)) {
                throw new \Exception('Комната не найдена', 400);
            }

            $room->name = request('name');
            $room->salon()->associate(request('salon'));

            if (!$room->save()) {
                throw new \Exception("Ошибка редактирования комнаты");
            }

            $result['data'] = $room->load('salon');
        } catch (\Throwable $e) {
            ResponseService::setError($e, $result);
        }

        return $result;
    }

    public function createRoom()
    {
        $result = [];

        try {
            $room = Room::create([
                'name' => request('name'),
            ]);

            $room->salon()->associate(request('salon'));

            if (!$room) {
                throw new \Exception("Ошибка при добавлении комнаты");
            }

            $result['data'] = $room->load('salon');
        } catch (\Throwable $e) {
            ResponseService::setError($e, $result);
        }

        return $result;
    }

    public function deleteRoom($id)
    {
        $result = [];

        try {

            if (!$room = Room::find($id)) {
                throw new \Exception('Комната по запросу не найдена');
            }

            if (!$room->delete()) {
                throw new \Exception("Ошибка при удалении Комнаты");
            }

            $result['data'] = ['id' => $id];
        } catch (\Throwable $e) {
            ResponseService::setError($e, $result);
        }

        return $result;
    }
}
