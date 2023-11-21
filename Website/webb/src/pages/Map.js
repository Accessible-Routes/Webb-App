import './page.css';
import MyMap from '../common/components/mapSample.component';
//import searchBar from './common/components/searchBar';
import {React, useState, useEffect, Component} from 'react';
import Select from 'react-select';
import {AwesomeButtonProgress} from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css'; 
import axios from 'axios';

import {Link} from "react-router-dom"

const MapPage = () => {
  Call();
  return (
    <div className="Page">
      <MyMap/>
        <button id="mapButton">
          <Link to ="/accessibility"> Swap to Accessibility View </Link>
        </button>
      <div className="Search">
          <StartDropDown/>
          <EndDropDown/>
          <Button/>
      </div>
    </div>
  );
}
  

const Button = () => {
    return (
      <AwesomeButtonProgress type="secondary"
        onPress={async (element, next)=>{
          next();
        }}>
          Start
      </AwesomeButtonProgress>
    );
  }
  
  var buildings = []

  const isAccessible = new Map()
  
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
        for (let i = 0; i < result.data.length; i++){
          console.log(containsBuilding(result.data[i], buildings))
          console.log(result.data[i], buildings)
          if (containsBuilding(result.data[i], buildings) == false){
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
  
  const StartDropDown = () => {
    //Store starting location selected by user to get ready for to query 
    const [Starting, setStart] = useState('');
  
    const handleChange = (event) => {
      setStart(event.label);
    }
    return(
      <div> 
        <Select 
        menuPortalTarget={document.body} 
        menuPosition = {'fixed'}
        placeholder = 'Choose Starting Location' 
        onChange = {handleChange}
        options={buildings} />
      </div>
    );
    //<p>{Starting}</p>
  }
  
  const EndDropDown = () => {
    //Store destination location selected by user to get ready for query
    const [Ending, setEnd] = useState('');
  
    const handleChange = (event) => {
      setEnd(event.label);
    }
    return(
      <div> 
        <Select 
        menuPortalTarget={document.body} 
        menuPosition = {'fixed'}
        placeholder = 'Choose Starting Location' 
        onChange = {handleChange}
        options={buildings} />
      </div>
    );
    //<p>{Ending}</p>
  }

export default MapPage
export {buildings, isAccessible};
