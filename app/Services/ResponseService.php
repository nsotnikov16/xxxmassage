<?php

namespace App\Services;
use Illuminate\Http\Response;
/**
 * Class ResponseService.
 */
class ResponseService
{
    public static function json($result)
    {
        $defaultError = 'Ошибка сервера';
        $response = [];
        $code = 200;

        try {

            if (isset($result['error'])) {
                throw new \Exception($result['error'], (int) $result['code']);
            }

            if (isset($result['data']))
                $response = $result['data'];

            return Response::json($response, $code);
        } catch (\Throwable $th) {
            $code = $th->getCode();

            if (!$code || ($code > 599))
                $code = 500;
            $message = $th->getMessage() ?? $defaultError;
            return Response::json(['message' => $message], $code);
        }
    }

    public static function setError($error, &$result)
    {
        $result['error'] = $error->getMessage();
        $result['code'] = $error->getCode() ?? 500;
    }
}
