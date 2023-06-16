import logo from './logo.svg';
import './App.css';
import MyMap from './common/components/mapSample.component';
import searchBar from './common/components/searchBar';
import {React, useState } from 'react';

function App() {
  return (
    <div className="Page">
        <MyMap/>
        <Search/>
    </div>
  );
}

const Search = () =>{
  const BarStyle = {width: "14.60vw", height: "4vh", background: "#F0F0F0", border: "#000000", padding: "0.2rem", };
  return(
    <input
    style={BarStyle}
    //key="search-bar"
    //value={keyword}
    placeholder={"Choose Building"}
    //onChange={(e) => onChange(e.target.value)}
    />
  );
}

const SearchDest = () =>{
  const BarStyle = {width: "14.60vw", height: "4vh", background: "#F0F0F0", border: "#000000", padding: "0.2rem", };
  return(
    <input
    style={BarStyle}
    placeholder={"Choose Destination"}
    />
  );
}

export default App;