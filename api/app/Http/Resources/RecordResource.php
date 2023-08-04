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
            'title'        => $candidate->title,
            'release_year' => $candidate->release_year,
            'imdb_id'      => $candidate->imdb_id,
            'images'       => $candidate->images,
            'created_at'   => $candidate->created_at,
        ];
    }
}
