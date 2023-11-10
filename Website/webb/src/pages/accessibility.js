import './page.css';
import MyMap from '../common/components/mapSample.component';
//import searchBar from './common/components/searchBar';
import {React, useState, useEffect} from 'react';
import Select from 'react-select';
import {AwesomeButtonProgress} from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css'; 
import axios from 'axios';
import {buildings, isAccessible} from "./Map"

const Accessible = () => {
    return (
        <div className="SearchBar">
          <StartSearch/>
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


  const StartSearch = () => {
    //Store starting location selected by user to get ready for to query 
    const [Starting, setStart] = useState('');
  
    const handleChange = (event) => {
      setStart(event.label);
      console.log(isAccessible.get(Starting))
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

export default Accessible  


