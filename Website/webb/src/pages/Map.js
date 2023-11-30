import './page.css';
import MyMap from '../common/components/mapSample.component';
import { React, useState, useEffect } from 'react';
import Button from '../common/components/Button.component';
import BuildingDropdown from '../common/components/BuildingDropdown.component';
import { Link } from "react-router-dom";
import { requestAllBuildings } from '../helpers/requestHelper';


const isAccessible = new Map()

const MapPage = () => {

  // STATES
  // buildings are stored as: {name, building_uid}
  const [startingBuilding, setStartingBuilding] = useState({});
  const [destinationBuilding, setDestinationBuilding] = useState({});
  const [allBuildings, setAllBuildings] = useState([]);

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


  // RENDERING
  return (
    <div className="Page">
      <MyMap />
      <div className="Search Building">
        <BuildingDropdown
          place_holder_text={'select starting building'}
          building_options={allBuildings}
          setSelectedBuilding={setStartingBuilding} />
        <BuildingDropdown
          place_holder_text={'select ending building'}
          building_options={allBuildings}
          setSelectedBuilding={setDestinationBuilding} />
        <Button title={"find route"} onPressIn={() => { console.log('pressed find route button') }} />
      </div>
    </div>
  );
}

export default MapPage
export { isAccessible };
