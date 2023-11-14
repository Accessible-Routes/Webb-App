import './page.css';
import MyMap from '../common/components/mapSample.component';
//import searchBar from './common/components/searchBar';
import {React, useState, useEffect, Component} from 'react';
import Select from 'react-select';
import {AwesomeButtonProgress} from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css'; 
import axios from 'axios';
import {buildings, isAccessible} from "./Map"
import {Link} from "react-router-dom"

import AccessibleDiv from './accessibleDiv';

const Accessible = () => {
    return (
        <div className="SearchBar">
          <h2>Building Accessibility</h2>
          <StartSearch/>
          <button id="accessButton">
            <Link to ="/"> Swap to Map View </Link>
          </button>
          <AccessibleDiv/>
        </div>
      
    );
  }

// class Accessible extends Component() {
//   render(){
//   return (
//       <div className="SearchBar">
//         <h2>Building Accessibility</h2>
//         <StartSearch/>
//         <button id="accessButton">
//           <Link to ="/"> Swap to Map View </Link>
//         </button>
//         <AccessibleDiv/>
//       </div>
//   );
//   }
// }



  var userInput = null

  const StartSearch = () => {
    //Store starting location selected by user to get ready for to query 
    const [Starting, setStart] = useState('');
  
    const handleChange = (event) => {
      setStart(event.label);
      console.log(isAccessible.get(Starting))
      userInput = isAccessible.get(Starting)
    }
    return(
      <div> 
        <Select 
        menuPortalTarget={document.body} 
        menuPosition = {'fixed'}
        placeholder = 'Choose Building'
        onChange = {handleChange}
        options={buildings}/>
      </div>
    );
    //<p>{isAccessible.get(Starting)}</p>
  }

  const AccessibleCheck = () => {
    return (
      <div className = "accessibleValue">
        <p>{userInput}</p>
      </div>
    );
}


export default Accessible  


