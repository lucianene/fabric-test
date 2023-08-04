<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RecordResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return parent::toArray($request);
        $record = $this;

        return [
            'title'        => $record->title,
            'release_year' => $record->release_year,
            'imdb_id'      => $record->imdb_id,
            'images'       => $record->images,
            'created_at'   => $record->created_at,
        ];
    }
}
