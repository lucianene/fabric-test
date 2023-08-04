<?php

namespace Tests\Feature;

use App\Mail\CandidateContactedEmail;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class RecordManagementTest extends TestCase
{
    use RefreshDatabase, DatabaseMigrations;

    public function setUp(): void
    {
        parent::setUp();

        // I know it's not optimal but in this case to demonstrate for the assigment it's ok.
        $this->artisan('db:seed');
    }

    public function testRecordIndexSuccess()
    {
        $response = $this->get('/records');
        $response->assertStatus(200);
    }

    public function testRecordIndexIsValidJson()
    {
        $response = $this->get('/records');
        $response->assertJsonStructure([
            ["title", "release_year", "imdb_id"],
        ]);
    }

    public function testRecordCreateFails()
    {
        $response = $this->post('/records');
        $response->assertStatus(302);
    }

    public function testRecordCreateSuccess()
    {
        $response = $this->post('/records', [
            'title' => 'test title',
            'release_year' => '2023',
            'imdb_id' => 'fash9f8ashfasf83hq2890rhfqe789fgh8',
        ]);
        $response->assertJsonStructure(["title", "release_year", "imdb_id"]);
        $response->assertStatus(200);
    }

    public function testRecordUpdateFails()
    {
        $response = $this->put('/records/99999', [
            'title' => 'new test title',
        ]);
        $response->assertStatus(404);
    }

    public function testRecordUpdateSuccess()
    {
        $response = $this->put('/records/1', [
            'title' => 'new test title',
            'release_year' => '2023',
            'imdb_id' => 'fash9f8ashfasf83hq2890rhfqe789fgh8',
        ]);
        $response->assertJsonFragment(["title" => 'new test title']);
        $response->assertStatus(200);
    }

    public function testRecordDeleteFails()
    {
        $response = $this->delete('/records/99999');
        $response->assertStatus(404);
    }

    public function testRecordDeleteSuccess()
    {
        $response = $this->delete('/records/3');
        $response->assertStatus(200);
    }
}
