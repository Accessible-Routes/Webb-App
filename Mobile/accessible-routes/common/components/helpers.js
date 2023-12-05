import axios from 'axios';

const endpoint_address = 'http://54.153.99.29:8000'


const ParseLocationsAndRoute = async (startLocationString, endLocationString) => {

  const baseUrl = endpoint_address + `/api/get-route`
  const query_string = `?starting_location=${startLocationString}&ending_location=${endLocationString}`
  let error = false;
  const response = await axios.get(baseUrl + query_string).catch((err) => {
    console.log('error during retrieval of when getting response: ', err);
    error = true;
  });

  console.log(baseUrl + query_string)
  RouteResponse = response.data
  route_found = true;
  let buildings = [];
  let route_details = [];

  if (!error) {
    {/*Parse start and ending locations */ }
    buildings = RouteResponse.buildings.map((building) => ({ latitude: building.latitude, longitude: building.longitude, title: building.title, location_type: building.location_type }))

    {/*Parse Route */ }
    route_details = RouteResponse.route.map((spot) => ({ latitude: spot.latitude, longitude: spot.longitude }))
  }
  return { buildings, route_details, route_found, error }
}



export {ParseLocationsAndRoute, endpoint_address}
export default ParseLocationsAndRoute;