<?php

namespace App\Services;

use App\Http\Requests\RecordRequest;
use App\Http\Resources\RecordResource;
use App\Models\Record;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class RecordManagementService extends AbstractService
{
    private Record $record;

    /**
     * @param Record $record
     */
    public function __construct($record)
    {
        $this->record = $record;
    }

    public function all() : AnonymousResourceCollection
    {
        return RecordResource::collection($this->record->all());
    }

    public function create(RecordRequest $request) : RecordResource
    {
        $record = $this->record->create($request->only('title', 'release_year', 'imdb_id', 'images'));

        return RecordResource::make($record);
    }

    public function update(Record $record, RecordRequest $request) : RecordResource
    {
        $update = $record->update($request->only('title', 'release_year', 'imdb_id', 'images'));

        return RecordResource::make($record);
    }

    public function delete(Record $record) : bool
    {
        return $record->delete();
    }
}
