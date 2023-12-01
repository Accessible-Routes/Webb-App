import axios from 'axios';

const requestAllBuildings = async (setAllBuildings) => {
    // request building data from back-end
    const allBuildingsURL = `http://13.56.159.146:8000/api/all-buildings`
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

    const baseUrl = `http://13.56.159.146:8000/api/get-route`
    const query_string = `?starting_location=${starting_building_uid}&ending_location=${destinationBuilding_uid}`
    let error = false;
    // const response2 = await axios.get(baseUrl + query_string).catch((err) => {
    //   console.log('error during retrieval of when getting response: ', err);
    //   error = true;
    // });

    var opts = {
      headers: {
        'mode':'cors'
      }
    }


    let response = () => {
      return new Promise(function(resolve, reject) {
        fetch(baseUrl + query_string, {
          params: {
            starting_location: starting_building_uid,
            ending_location: destinationBuilding_uid,
          }
        }, opts).then(response => {
          resolve(response);
          console.log('sent a successful request')
        }).catch(error => {
          error = true;
          reject(error);
        });
      });
    };
    // let responseData = await response();

    // console.log('response:')
    let response_var = await response();
    // console.log(response_var)
    
    // console.log(response_var.json());

    
    
    console.log(baseUrl + query_string)
    // let temp = response
    const RouteResponse = await response_var.json()
    // console.log(RouteResponse)

    

    // if(response === undefined || response.data === undefined){
    //     error = true;
    //     // TODO: fix error checking mechanism
    // }

    let route_found = true;
    let buildings = [];
    let route_details = [];
  
    if (!error) {
      {/*Parse start and ending locations */ }
      buildings = RouteResponse.buildings.map((building) => ({ latitude: Number(building.latitude), longitude: Number(building.longitude), title: building.title, location_type: building.location_type }))
  
      {/*Parse Route */ } 
      route_details = RouteResponse.route.map((spot) => ([ Number(spot.latitude), Number(spot.longitude) ]))
    }
  
    return { buildings, route_details, route_found, error }
  }

  const ParseLocationsAndRoute2 = async (startingBuilding, destinationBuilding) => {
  // request the start and ending building locations and route based on the
    // starting building and destination building UID's.

    const starting_building_uid = startingBuilding.building_uid;
    const destinationBuilding_uid = destinationBuilding.building_uid;

    const baseUrl = `http://13.56.159.146:8000/api/get-route`
    const query_string = `?starting_location=${starting_building_uid}&ending_location=${destinationBuilding_uid}`
    let error = false;
    // const response2 = await axios.


    let request_func = () => {
      return new Promise(function(resolve, reject) {

        axios.get(baseUrl + query_string).then((response_1) => {
          console.log('the request using axios worked. Please remove this comment when done');
          resolve(response_1);
        }).catch((error) => {
          console.log('the request using axios did NOT work. Please remove this comment when done');
          reject(error);
        });
      });
    };

    const response = await request_func();

    if(response === undefined || response.data === undefined){
        error = true;
        // TODO: fix error checking mechanism
    }

    let route_found = true;
    let buildings = [];
    let route_details = [];
  
    // if (!error) {
    //   {/*Parse start and ending locations */ }
    //   buildings = RouteResponse.buildings.map((building) => ({ latitude: building.latitude, longitude: building.longitude, title: building.title, location_type: building.location_type }))
  
    //   {/*Parse Route */ }
    //   route_details = RouteResponse.route.map((spot) => ({ latitude: spot.latitude, longitude: spot.longitude }))
    // }

    return { buildings, route_details, route_found, error }
}

export { requestAllBuildings, ParseLocationsAndRoute }
export default requestAllBuildings; 