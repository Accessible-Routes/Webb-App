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

export { requestAllBuildings }
export default requestAllBuildings; 