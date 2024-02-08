import axios from 'axios';

const endpoint = 'https://www.accessibleroutes.com:8000'

const mocked_artifacts_response = {
  data: {
    stairs_locations: [
      {
        "latitude": "42.730587",
        "longitude": "-73.682124",
      },
      {
        "latitude": "42.730263",
        "longitude": "-73.682972",
      }
    ]
  }
}


const requestAllBuildings = async (setAllBuildings) => {
  // request building data from back-end
  const allBuildingsURL = endpoint + `/api/all-buildings`
  const response = await axios.get(allBuildingsURL);

  // parse building payload into standardized building format
  let standardized_building_list = []

  for (const building_index in response.data) {
    const building = response.data[building_index]
    let standardized_building = {}

    // required for map drawing
    standardized_building['name'] = building.Name
    standardized_building['building_uid'] = building.UUID
    standardized_building['latitude'] = building.latitude
    standardized_building['longitude'] = building.longitude
    standardized_building['accessible'] = building.accessible

    // required for dropdown selector library
    standardized_building['label'] = building.Name
    standardized_building['value'] = building.UUID

    standardized_building_list.push(standardized_building);
  }

  // set all buildings to the standardized format
  setAllBuildings(standardized_building_list)
}


const ParseLocationsAndRoute = async (startingBuilding, destinationBuilding) => {
  // request the start and ending building locations and route based on the
  // starting building and destination building UID's.

  const starting_building_uid = startingBuilding.building_uid;
  const destinationBuilding_uid = destinationBuilding.building_uid;


  // check if input is valid
  if (starting_building_uid === undefined && destinationBuilding_uid === undefined) {
    return { buildings: [], route_details: [], route_found: false, error_found: true };
  }

  // returned variables
  let buildings = [];
  let route_details = [];
  let route_found = true;
  let error_found = false;
  const routeUrl = endpoint + `/api/get-route`;
  const query_string = `?starting_location=${starting_building_uid}&ending_location=${destinationBuilding_uid}`;
  const endpoint_uri = routeUrl + query_string;

  // function to request building data from back-end
  let requestRoute = () => {

    return new Promise(function (resolve, reject) {
      fetch(endpoint_uri, { timeout: 10000 }, {
      }).then(response => {
        // only accept sublime responses
        if (response.status === 200) {
          resolve(response);
        } else {
          const error_message = 'received an non 200 status response. Assuming that it was an error.' +
            'response: ' + response;
          reject(new Error(error_message));
        }
      }).catch(error => {
        error_found = true
        reject(error);
      });
    });
  };

  // request route and parse json from response
  const RouteResponse = await requestRoute()
    .then(response => {
      return response.json();
    })
    .catch(error => {
      error_found = true
      console.log('The following error occurred during the requesting of routes', error)
      return { buildings: [], route_details: [], route_found: false, error_found: true };
    });

  // parse parse json payload
  if (!error_found) {

    // Parse start and ending locations
    buildings = RouteResponse.buildings.map((building) => ({ latitude: Number(building.latitude), longitude: Number(building.longitude), title: building.title, location_type: building.location_type }))

    // Parse Route
    route_details = RouteResponse.route.map((spot) => ([Number(spot.latitude), Number(spot.longitude)]))
  }


  return { buildings, route_details, route_found, error_found };
}

const parseArtifacts = async (setStairCordList) => {
  // request all artifacts from back-end (e.g. stairs) (use mock stair artifact request)
  const response = mocked_artifacts_response;

  // parse artifact/stair location payload into standardized building format
  let standardized_stair_locations_list = []
  for (const stair_index in response.data["stairs_locations"]) {
    const stair_location = response.data["stairs_locations"][stair_index]
    let standardized_stair_location = {}

    standardized_stair_location['latitude'] = stair_location.latitude
    standardized_stair_location['longitude'] = stair_location.longitude

    standardized_stair_locations_list.push(standardized_stair_location);
  }

  // set all stair locations to the standardized format
  setStairCordList(standardized_stair_locations_list);
}


export { requestAllBuildings, ParseLocationsAndRoute, parseArtifacts }
export default requestAllBuildings; 
