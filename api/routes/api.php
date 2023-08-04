<?php

use App\Http\Controllers\RecordManagementController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
 */

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/', function () {
    return response()->json([
        'status' => 'ok',
        'api_version' => '1.0',
    ]);
});

Route::prefix('records')->group(function () {
    Route::get('/', [RecordManagementController::class, 'index']);
    Route::post('/', [RecordManagementController::class, 'create']);
    Route::put('/{record}', [RecordManagementController::class, 'update']);
    Route::delete('/{record}', [RecordManagementController::class, 'delete']);
});
