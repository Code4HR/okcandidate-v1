[ ![Codeship Status for Code4HR/okcandidate](https://codeship.com/projects/3ea4e4a0-d842-0133-4a1f-6a1daaefbd5c/status?branch=master)](https://codeship.com/projects/143177)

# OKCandidate
Find out which candidates for local offices match with you

OK Candidate is a web app for matching voters with candidates for local offices.

## Problem
Most people don’t know their candidates for local offices. Publishing voter guides is laborious and most voters are not going to take the time to read them. Even the most engaged voters have difficulty determining which candidates to support for some local offices.

## Solution
We propose an app that works like a dating site for matching voters with their candidates. This has been done for presidential elections but never at the local level, where it is most needed.

## Background
A common feature of dating sites is the age-old questionnaire. A group of users are given a list of questions. Potential compatibility between members of the group is calculated based on the user’s responses and the level of importance they have placed in finding someone who shares their views.  We believe the same approach can be taken to match candidates with voters.

## Approach
We are going to publish a platform and web application in which:
- News editors create questions
- Candidates answer the questions
- Voters answer the questions
- Voters see which candidates match their answers best

## Assumptions
- News editors will create questions for every office in an election
- News editors will recruit candidates to answer questions
- News editors and other supporters will promote the app to voters
- Volunteers will build the app

## Continuous Deployment
 - We auto-build a Docker container from the `master` github branch, [store it on Docker Hub](https://hub.docker.com/r/code4hr/okcandidate/), and update production within ~10 min of each commit to `master`.
 - We do the same for our hosted staging (http://okcandidate-staging.code4hr.org) with the `develop` github branch.
 - All Docker images, cloud servers, and deployment process are managed by Docker Cloud, and reported to our Slack team #hrva-devops channel.

## Contributing
When you open a pull request, please ask to merge against the `develop` branch.  Merged pull requests will automatically be deployed to a staging server.  When we want to release into production, the `develop` branch will be merged into `master`, which automatically deploys to an Azure box.

## Local Development with Docker

Using Docker to develop on OKC locally is ideal (but not required). Benefits:
 - Using Docker Compose, it will auto create the node and psql environment for you.
 - You'll be using the exact same setup/versions we do in production.
 - Use a simple one-line command (below) to start or stop whole environment.
 - When you're done, just delete the Docker container and image and not have to worry about "cleaning up".

To run locally for development with postgres and node running in Docker containers, with nodemon watching for file changes on your local machines clone of this repo, follow these steps:
 - Install [Docker Toolbox](https://www.docker.com/products/overview#/docker_toolbox) (Mac/Windows), the [Docker for Mac/Windows Beta](https://beta.docker.com), or Docker binaries docker-engine and docker-compose directly (Linux/Mac/Windows)
 - Clone this repo
 - In repo directory, run docker-compose with our dev yaml file: `docker-compose -f docker-compose-dev.yml up -d`. This pulls our latest images, builds the local repo, and starts psql and node servers (with nodemon).
 - First time starting these containers? You'll need to put in some sample data to postgres. Run these two docker commands which will spin up a tempory container, import data to postgres, then stop/remove themselves. Enter `complicatedPassword` from your `docker-compose-dev.yml` file when it asks for it.
   - `docker run -it --link okcandidate_okcpostgres_1:postgres -v $(pwd)/database:/var/import --rm postgres sh -c 'exec psql -h postgres -U okc okc < /var/import/okcandidate_database_create.sql'`
   - `docker run -it --link okcandidate_okcpostgres_1:postgres -v $(pwd)/database:/var/import --rm postgres sh -c 'exec psql -h postgres -U okc okc < /var/import/okcandidate_database_sampledata.sql'`
 - Edit files in repo directory on your machine, and point to either http://192.168.99.100:8000 or http://localhost:8000 (depending on your Docker setup and host OS).
 - Want to check container status? try `docker-compose -f docker-compose-dev.yml ps`.
 - Need to see logs? try `docker-compose -f docker-compose-dev.yml logs` (you can also follow logs, and just list logs for specific container, use `--help`).
 - Want to make commands easier? copy `docker-compose-dev.yml` to `docker-compose.yml` and then you can just do `docker-compose ps` etc.
 - Once your change is ready, just commit to local git feature-branch and push like you normally would.
 - When you're done for the day, stop the OKC containers: `docker-compose -f docker-compose-dev.yml stop -d`
 - When you're done forever, and want to cleanup: `docker-compose -f docker-compose-dev.yml down -v --rmi all`

Note: To run OKC in the cloud (e.g. your city's staging/production) with a separate postgres container you could use docker-compose with something like our docker-compose-sample.yml

## Local Dev Installation (without Docker)
```
sudo npm install -g envify
git clone git@github.com:Code4HR/okcandidate.git
npm install
npm run dev
```

## Database Setup (without Docker)
OKCandidate uses Postgres as its database.  A couple of fixture files are available to create the initial tables and populate them with fixture data. There are two approaches to setting up the database:

1. __Using PGAdmin3__
  1. After connecting to your local instance, right click on databases and select _New Database_. Give it a name like `okcandidate_dev` or `okcandidate`. Everything else can be left default. Click `OK`
  2. Click on your newly created database in the Object Browser and select the SQL button in the top ribbon to open a new SQL editor window.
  3. Open `okcandidate_database_create.sql` in the SQL editor and run the file with the play button. This will create your table structure.
  4. If you want to install sample data open `okcandidate_database_sampledata.sql` and run it as well.
2. __From the command line__
  1. run `psql` to get to the postgres console. Create the database using the first line in the okcandidate_database_create.sql file or something similar. a simple command would be:<br />`CREATE DATABASE okcandidate_dev`
  2. Exit the postgres console with `\q`.
  3. Assuming your database name is `okcandidate_dev` you would then run following commands from the database directory:

```
// from databases directory
psql -d okcandidate_dev -a -f okcandidate_database_create.sql
psql -d okcandidate_dev -a -f okcandidate_database_sampledata.sql
```

You will additionally want to create a user to connect to the database. From within PGAdmin3 you can do this by right-clicking on Login Roles in the Object Browser. From the postgres console you do this with the command:<br /><br />`CREATE USER username WITH PASSWORD 'MyPassword'`<br /><br />Replacing username and 'MyPassword' with your choice of user name and password respectively.

The created user will also need permissions on your database. You can add these permissions with the following two commands, run in the `okcandidate_dev` database:

```
GRANT SELECT, INSERT, UPDATE, DELETE
ON ALL TABLES IN SCHEMA public to username;

GRANT USAGE, SELECT
ON ALL SEQUENCES IN SCHEMA public TO username;
```

## Work with local database (without Docker)

We can configure OKCandidate to work with your local database using environment variables.
Make a file (don't put it in source control) that has the following...
```
export OKC_DB_NAME=databasename
export OKC_DB_USER=username
export OKC_DB_PASSWORD=password
export SMARTY_STREETS_AUTH_ID=smartystreetsauthid
export SMARTY_STREETS_AUTH_TOKEN=smartystreetsauthtoken
export GOOGLE_ANALYTICS=UA-39303796-11
```
... replacing `databasename`, `username`, and `password` with the information used during setup of the database.

If database is on a separate machine, you can use `export OKC_DB_HOST=hostname` to overwrite the default localhost.

You should always add these variables to the environment before starting the server.  For example, if I named
my file `okcandidate_dev_blaine` I would run this from the terminal.

```
source okcandidate_dev_blaine
```
