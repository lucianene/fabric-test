<?php

namespace App\Http\Controllers;

use App\Http\Requests\RecordRequest;
use App\Models\Record;
use App\Services\RecordManagementService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class RecordManagementController extends Controller
{
    private RecordManagementService $recordManagementService;

    public function __construct(RecordManagementService $recordManagementService)
    {
        $this->recordManagementService = $recordManagementService;
    }

    public function index() : JsonResponse
    {
        return response()->json($this->recordManagementService->all());
    }

    public function create(RecordRequest $request) : JsonResponse
    {
        return response()->json($this->recordManagementService->create($request));
    }

    public function update(Record $record, RecordRequest $request) : JsonResponse
    {
        return response()->json($this->recordManagementService->update($record, $request));
    }

    public function delete(Record $record) : JsonResponse
    {
        return response()->json($this->recordManagementService->delete($record));
    }
}
