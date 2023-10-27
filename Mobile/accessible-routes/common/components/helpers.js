const MockResponse = {
  "route": [
    {
      "latitude": 42.73020035793919,
      "longitude": -73.68182322241921
    },
    {
      "latitude": 42.730443933307185,
      "longitude": -73.68061432268627
    },
    {
      "latitude": 42.730808708361856,
      "longitude": -73.67975985815578
    },
  ],

  "buildings": [
    {
      "title": "Lally Hally",
      "location_type": "start",
      "latitude": 42.73020035793919,
      "longitude": -73.68182322241921
    },
    {
      "title": "Building 2",
      "location_type": "end",
      "latitude": 42.730808708361856,
      "longitude": -73.67975985815578
    },
  ]
}


const MockResponse2 = {
  "route": [
    {
      "latitude": 42.72975825494276,
      "longitude": -73.67830944235584
    },
    {
      "latitude": 42.72997145681171,
      "longitude": -73.67746822832613
    },
    {
      "latitude": 42.73026414996813,
      "longitude": -73.67738462670044
    },
    {
      "latitude": 42.72993893531263,
      "longitude": -73.676754972665
    },
  ],

  "buildings": [
    {
      "title": "Place 1",
      "location_type": "start",
      "latitude": 42.72975825494276,
      "longitude": -73.67830944235584
    },
    {
      "title": "Union",
      "location_type": "end",
      "latitude": 42.72993893531263,
      "longitude": -73.676754972665
    },
  ]
}


const ParseLocationsAndRoute = (startLocationString, endLocationString) => {

  // Make Back-end call here to get Json, and parse similarly to the mock response.
  console.log("request: \nStart location: ", startLocationString, "\nEnd location: ", endLocationString)
  route_found = true;

  if (startLocationString === "route_2") {
    MockResponseTest =  MockResponse2
  } else if (startLocationString === "no_path") {
    route_found = false;
  } else {
    MockResponseTest = MockResponse
  }

  {/*Parse start and ending locations */ }
  buildings = MockResponseTest.buildings.map((building) => ({ latitude: building.latitude, longitude: building.longitude, title: building.title, location_type: building.location_type }))

  {/*Parse Route */ }
  route = MockResponseTest.route.map((spot) => ({ latitude: spot.latitude, longitude: spot.longitude }))

  error = false;
  

  return { buildings, route, route_found, error }
}



export default ParseLocationsAndRoute;