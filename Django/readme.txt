The backend for Accessible Routes is written using the Django Framework.

To start the backend, you have to create the database then migrate the database.
Part 1: Create the database
1. Install PostgreSQL and PgAdmin. The version that the production server uses is version 16 but any version should work.
2. Follow step 6 on here: https://stackpython.medium.com/how-to-start-django-project-with-a-database-postgresql-aaa1d74659d8
    Take note of 
3. 

Part 2: Migrate the database
1. (Optional) Create a python virtual environment and start it.
2. Run "pip install -r Django/requirements.txt"
3. Run "python Django/backend/manage.py makemigrations"
4. Run "python Django/backend/manage.py migrate"
5. Run "python Django/backend/manage.py runserver"

If start successfully, you should see something like "Starting development server at http://127.0.0.1:8000/"
If you are having issues, they may be related to setting up the Postgres database locally.

The main API that is needed is below:
Ask for an API key for requests that need API Keys.

GET <url>/api/all-buildings returns a list of json with buildings. 
GET <url>/api/all-rooms returns a json of each building and a list in each building for every room that exists.
GET <url>/api/rooms/<room_id> returns data about that room specifically.
POST <url>/api/create-room/ creates a room and connections to that room. Room data should be in the request body.
                                                                    NOTE: The room must exists meaning if you want connect two newly made rooms. 
                                                                    You must create the two rooms then modify them to connect them.
                                                                    This request is API key authenicated.
POST <url>/api/edit-room/ modify a room. Room must exist to modify its data. CURRENTLY BEING MADE

