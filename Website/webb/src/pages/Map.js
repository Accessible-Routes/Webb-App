import './page.css';
import MyMap from '../common/components/mapSample.component';
import { React, useState } from 'react';
import axios from 'axios';
import Button from '../common/components/Button.component';
import BuildingDropdown from '../common/components/BuildingDropdown.component';
import { Link } from "react-router-dom"

var buildings = []

const isAccessible = new Map()

const MapPage = () => {

  const [startingBuilding, setStartingBuilding] = useState({});
  const [destinationBuilding, setDestinationBuilding] = useState({});

  // rendering code:
  Call(); // call to pull all buildings 
  return (
    <div className="Page">
      <MyMap />
      <button id="mapButton">
        <Link to="/accessibility"> Swap to Accessibility View </Link>
      </button>
      <div className="Search Building">
        <BuildingDropdown
          place_holder_text={'select starting building'}
          building_options={buildings}
          setSelectedBuilding={setStartingBuilding} />
        <BuildingDropdown
          place_holder_text={'select ending building'}
          building_options={buildings}
          setSelectedBuilding={setDestinationBuilding} />
        <Button title={"find route"} onPressIn={() => { console.log('pressed find route button') }} />
      </div>
    </div>
  );
}


function containsBuilding(obj, list) {
  var i;
  for (i = 0; i < list.length; i++) {
    if (list[i].label === obj.Name) {
      return true;
    }
  }
  return false;
}

const Call = () => {
  buildings = []
  axios
    .get('http://13.56.159.146:8000/api/all-buildings')
    .then((result) => {
      for (let i = 0; i < result.data.length; i++) {
        console.log(containsBuilding(result.data[i], buildings))
        console.log(result.data[i], buildings)
        if (containsBuilding(result.data[i], buildings) == false) {
          buildings.push({
            value: result.data[i].UUID,
            label: result.data[i].Name
          })
          isAccessible.set(result.data[i].Name, result.data[i].accessible)
        }
      }
    }).catch((err) => {
      console.log(err)
    })
}

export default MapPage
export { buildings, isAccessible };
