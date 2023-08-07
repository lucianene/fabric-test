## Append the following record to "hosts" file
127.0.0.1       fabric-test.local api.fabric-test.local

## Start the app
docker-compose up -d

## Setup the .env in api
- cd api
- cp .env.exemple .env

## Generate env key
./artisan key:generate

## Migrate db & seed
./artisan migrate --seed

## Install frontend
./yarn

## Check the following url's
- http://fabric-test.local/
- http://api.fabric-test.local/

## Run the tests
./artisan test

## Further development
- Better error handler in laravel.
- I forgot to remove some comments, so a bit of cleanup will be necessary.
- More typescript types (for example I could write types for the services, interface on how to define a service, etc.).
- Move api key to env variables.
- Unit tests if the company requires it.
- Use a ui framework (I used css because I didn't put too much focus on the ui).
- I would reorganise the files in the src directory, for example each page will have it's own directory inside /pages, also the layout will be moved somewhere in /src/layouts and page specific layouts may live in the same dir with the page.
- I didn't implement the "images" part because I only see one image coming from the api. Also it's debatable how to store the image, store the image or store the link. Myself I would store the image somewhere on an s3 bucket.
- Create the potential matches function which is very easy to integrate.
- For orchestration, the easiest way is to add docker swarm and configure one more docker-compose.{test|prod|etc...).yaml file. I can also deploy it to kubernetes and load balance the backend.
- I'm not sure if it's an issue that I used nextjs, I can do this in react as well but it would take more time to do scaffolding.
- For the dev env I used nginx with proxy which is a very powerfull approach.
- You can see container logs by doing: docker-compose logs -f frontend/api/php-fpm
- I used useEffect with loadRecords inside the records service because I wanted to demonstrate how redux works. In real life I would load data on the component I need it and use caching patterns, for example I may want to renter it server side to make it visible to the search engines.
