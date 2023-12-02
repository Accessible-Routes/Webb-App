import './page.css';
import { React, useState, useEffect } from 'react';
import Button from '../common/components/Button.component';
import BuildingDropdown from '../common/components/BuildingDropdown.component';
import { Link } from "react-router-dom";
import { requestAllBuildings, ParseLocationsAndRoute } from '../helpers/requestHelper';
import Map from '../common/components/Map';


const HomePage = () => {
  // STATES
  // buildings are stored as: {name, building_uid}
  const [startingBuilding, setStartingBuilding] = useState({});
  const [destinationBuilding, setDestinationBuilding] = useState({});
  const [allBuildings, setAllBuildings] = useState([]);

  // route and building details
  const [routeCordList, setRouteCordList] = useState([]);
  const [buildingLocations, setBuildingLocations] = useState([]);

  // EFFECTS
  useEffect(() => {
    // on mount

    // gather the name and UID of all the buildings from the backend
    requestAllBuildings(setAllBuildings).catch((err) => {
      console.log('An error occurred. please contact developers and inform them of the following:');
      console.log('site could not not retrieve all buildings from back-end.');
      console.log('failed with the following error:');
      console.log(err)
    })
  }, []);


  const requestRoute = async () => {
    const { buildings, route_details, route_found, error } = await ParseLocationsAndRoute(startingBuilding, destinationBuilding).catch((err) => {console.log('in the home page, the response from ParseLocationsAndRoute is: ', err)})

    // console.log(route_details)
    if (!error) {
      if (route_found) {
        console.log('setting building and route')

        setBuildingLocations(buildings)
        setRouteCordList(route_details)
      } else {
        // if there is not path route available, clear all markers and routes on map
        setBuildingLocations([])
        setRouteCordList([])
      }
    } else {
      console.log('route parsing error')
      console.log(error)

    }
  }


  // RENDERING
  return (
    <div className="Home Page">
      <Map 
        routeCordList={routeCordList}
        buildingLocations={buildingLocations}/>
      <div className="Search Building">
        <BuildingDropdown
          place_holder_text={'select starting building'}
          building_options={allBuildings}
          setSelectedBuilding={setStartingBuilding} />
        <BuildingDropdown
          place_holder_text={'select ending building'}
          building_options={allBuildings}
          setSelectedBuilding={setDestinationBuilding} />
        <Button title={"find route"} onPressIn={requestRoute} />
      </div>
    </div>
  );
}

export default HomePage;
