import './App.css';
import MyMap from './common/components/mapSample.component';
//import searchBar from './common/components/searchBar';
import {React, useState } from 'react';
import Select from 'react-select';
import {AwesomeButtonProgress} from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css'; 



function App() {
  return (
    <div className="Page">
        <MyMap/>
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
        Progress
    </AwesomeButtonProgress>
  );
}

const options = [
  { value: 'test', label: 'Amos Eaton' },
  { value: 'test2', label: 'DCC'}
]

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
      options={options} />
    </div>
  );
  //<p>{Starting}</p>
}

const EndDropDown = () => {
  //Store destination location selected by user to get ready for query
  const [Ending, setStart] = useState('');

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
      options={options} />
    </div>
  );
  //<p>{Ending}</p>
}

const SearchStart = () =>{
  const BarStyle = {width: "14.60vw", height: "4vh", background: "#F0F0F0", border: '3px solid rgba(0, 0, 0, 0.5)', padding: "0.2rem", };
  const [inputText, setInputText] = useState("");
  const handleChange = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };
  return(
    <div>
      <input
      style={BarStyle}
      //key="search-bar"
      //value={keyword}
      onChange={handleChange}
      placeholder={"Choose Starting Location"}
      />
    </div>
  );
}

const SearchDest = () =>{
  const BarStyle = {width: "14.60vw", height: "4vh", background: "#F0F0F0", border: "3px solid rgba(0, 0, 0, 0.5)", padding: "0.2rem", };
  const [searchInput, setSearchInput] = useState("");
  return(
    <input
    style={BarStyle}
    placeholder={"Choose Destination"}
    />
  );
}

export default App;
