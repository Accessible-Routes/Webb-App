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


const Accessible = () => {
    return (
        <div className="SearchBar">
          <h1>Building Accessibility</h1>
          <StartSearch/>
          <button id="accessButton">
            <Link to ="/"> Swap to Map View </Link>
          </button>
          <AccessibleDiv/>
        </div>
      
    );
  }


  var userInput = null

  const StartSearch = () => {
    //Store starting location selected by user to get ready for to query 
    const [Starting, setStart] = useState('');
  
    const handleChange = (event) => {
      setStart(event.label);
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
  }

  class AccessibleDiv extends Component {
    state = {
      accessible: "Starting"
    };
    render() {
      return (
        <div className = "Accessibility">
          <button id = "GetBuilding"
            onClick={() => {
              this.getResult();
            }}
          >
            Get Building
          </button>
          <br />
          <br />
          {(this.state.accessible === "Starting" || this.state.accessible === null || this.state.accessible === undefined) &&
          <div>Choose A Building</div>
          }
          {this.state.accessible  === false &&
          <div>This Building is not Accessible</div>
          }

          {this.state.accessible === true && 
          <div>This Building is Accessible</div>
          }
        </div>
      );
    }

    handleChange(event) {
      this.state ({ Starting: event.label })
      console.log (event.label)
    }
  
    getResult() {
      console.log(userInput)
      this.setState({ accessible: userInput });
      console.log(userInput);
    }
  }


export default Accessible  


