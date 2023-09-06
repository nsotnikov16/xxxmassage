<?php

namespace App\Services;

use App\Models\Master;
use App\Models\Programm;
use App\Models\Room;
use App\Models\Salon;

/**
 * Class SalonsService.
 */
class SalonsService
{

    public function getSalons()
    {
        return Salon::with(['masters', 'programms', 'rooms'])->whereHas('rooms')->orderByRaw('id')->get();
    }
    public function getAllInfo()
    {
        $result = ['data' => []];
        try {

            if (!$result['data']['salons'] = $this->getSalons()) {
                throw new \Exception("Салоны не найдены", 404);
            }

        } catch (\Throwable $e) {
            ResponseService::setError($e, $result);
        }

        return $result;
    }

    public function updateRoomForMaster($masterId, $roomId)
    {
        $result = ['data' => []];
        try {
            if (!$room = Room::find($roomId)) {
                throw new \Exception("Комната не найдена", 404);
            }

            if (!$master = Master::find($masterId)) {
                throw new \Exception("Такого мастера в базе не существует", 400);
            }

            $type = request('type');
            $masterRoom = $master->room()->first();
            if ($masterRoom && ($masterRoom->id != $roomId)) {
                throw new \Exception("Мастер занят уже в другой комнате", 400);
            }

            $master->room()->associate($type == 'delete' ? 0 : $roomId);
            $master->save();

            $result['data'] = $master;

        } catch (\Throwable $e) {
            ResponseService::setError($e, $result);
        }

        return $result;
    }

    public function updateProgrammInRoom($roomId)
    {
        $result = ['data' => []];
        try {
            if (!$room = Room::find($roomId)) {
                throw new \Exception("Комната не найдена", 404);
            }

            if (($progReq = (int) request('programm')) && !Programm::find($progReq)) {
                throw new \Exception("Программа не найдена либо была удалена", 404);
            }

            $room->programm()->associate($progReq);
            $room->save();

            $result['data'] = $room;
        } catch (\Throwable $e) {
            ResponseService::setError($e, $result);
        }

        return $result;
    }

    public function updateStatusRoom($roomId)
    {
        $result = ['data' => []];
        try {
            if (!$room = Room::find($roomId)) {
                throw new \Exception("Комната не найдена", 404);
            }

            $status = (int) request('status');

            $room->status = $status;
            $room->time_start = date('Y-m-d H:i:s'); // Добавляем текущую дату и время

            $room->save();

            $result['data'] = $room;
        } catch (\Throwable $e) {
            ResponseService::setError($e, $result);
        }

        return $result;
    }
}
