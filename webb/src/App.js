import './App.css';
import MyMap from './common/components/mapSample.component';
//import searchBar from './common/components/searchBar';
import {React, useState } from 'react';


function App() {
  return (
    <div className="Page">
        <MyMap/>
        <div className="Search">
            <Search/>
            <SearchDest/>
        </div>
    </div>
  );
}

const Search = () =>{
  const BarStyle = {width: "14.60vw", height: "4vh", background: "#F0F0F0", border: '3px solid rgba(0, 0, 0, 0.5)', padding: "0.2rem", };
  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
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
      onChange={inputHandler}
      placeholder={"Choose Starting Location"}
      />
    </div>
  );
}

const SearchDest = () =>{
  const BarStyle = {width: "14.60vw", height: "4vh", background: "#F0F0F0", border: "3px solid rgba(0, 0, 0, 0.5)", padding: "0.2rem", };
  return(
    <input
    style={BarStyle}
    placeholder={"Choose Destination"}
    />
  );
}

export default App;
