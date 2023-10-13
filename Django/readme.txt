The backend for Accessible Routes is written using the Django Framework.

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

