## Append the following record to "hosts" file
127.0.0.1       fabric-test.local api.fabric-test.local

## Start the app
docker-compose up -d

## Setup the .env in api
cd api
cp .env.exemple .env

## Generate env key
./artisan key:generate

## Migrate db & seed
./artisan migrate --seed

## Install frontend
./yarn

## Check the following url's
http://fabric-test.local/
http://api.fabric-test.local/

## Run the tests
./artisan test
