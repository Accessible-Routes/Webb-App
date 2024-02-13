import './page.css';
import { React, useState, useEffect } from 'react';
import Button from '../common/components/Button.component';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import BuildingDropdown from '../common/components/BuildingDropdown.component';
import { requestAllBuildings, ParseLocationsAndRoute, parseArtifacts } from '../helpers/requestHelper';
import Map from '../common/components/Map';
import RouteStatusPanel from '../common/components/RouteStatusPanel.component';

const HomePage = () => {
  // STATES
  // buildings are stored as: {name, building_uid}
  const [startingBuilding, setStartingBuilding] = useState({});
  const [destinationBuilding, setDestinationBuilding] = useState({});
  const [allBuildings, setAllBuildings] = useState([]);

  // route and building details
  const [routeCordList, setRouteCordList] = useState([]);
  const [buildingLocations, setBuildingLocations] = useState([]);

  // artifacts (e.g. stairs details)
  const [stairCordList, setStairCordList] = useState([]);
  const [displayStairCords, setDisplayStairCords] = useState(false);

  // options and loading
  const [displayingRoute, setDisplayingRoute] = useState(false);
  const [foundRoute, setFoundRoute] = useState(false);

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

    // gather the location of all of the artifacts from the backend
    parseArtifacts(setStairCordList).catch((err) => {
      console.log('An error occurred. please contact developers and inform them of the following:');
      console.log('site could not not retrieve all stair locations from back-end.');
      console.log('failed with the following error:');
      console.log(err)
    })
  }, []);


  const requestRoute = async () => {
    const { buildings, route_details, route_found, error_found } = await ParseLocationsAndRoute(startingBuilding, destinationBuilding).catch((err) => { console.log('in the home page, the response from ParseLocationsAndRoute is: ', err) })

    if (!error_found) {
      if (route_found) {
        setBuildingLocations(buildings)
        setRouteCordList(route_details)
        setFoundRoute(true)
      } else {
        // if there is not path route available, clear all markers and routes on map
        setBuildingLocations([])
        setRouteCordList([])
        // display message to user that there was no route found between the buildings
      }
    }

    // inform user if no route was found
    if (error_found || route_found === false || !route_details?.length) {
      setBuildingLocations([])
      setRouteCordList([])
      setFoundRoute(false)
    }

    // after a route has been selected, display the route status
    setDisplayingRoute(true);
  }


  // RENDERING
  return (
    <div className="Home Page">
      <Map
        routeCordList={routeCordList}
        buildingLocations={buildingLocations} 
        stairCordList={stairCordList}
        displayStairCords={displayStairCords}
        />
      <div className="search-building-panel" >
        <p class="h4">Find Route</p>
        <BuildingDropdown
          place_holder_text={'select starting building'}
          building_options={allBuildings}
          setSelectedBuilding={setStartingBuilding} />
        <BuildingDropdown
          place_holder_text={'select ending building'}
          building_options={allBuildings}
          setSelectedBuilding={setDestinationBuilding} />
        <Button title={"find route"} onPressIn={requestRoute} />
        <RouteStatusPanel displayPanel={displayingRoute} foundRoute={foundRoute} startingBuilding={startingBuilding} destinationBuilding={destinationBuilding} />
        {/* TODO: replace with component: */}
        <FormControlLabel control={
        <Switch 
          onClick={() => {setDisplayStairCords(!displayStairCords)}}
        />} label="Display Stairs" />
      </div>
    </div>
  );
}

export default HomePage;
