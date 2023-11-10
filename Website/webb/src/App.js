import './App.css';
import MyMap from './common/components/mapSample.component';
//import searchBar from './common/components/searchBar';
import {React, useState, useEffect} from 'react';
import Select from 'react-select';
import {AwesomeButtonProgress} from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css'; 
import axios from 'axios';

import {BrowserRouter, Routes, Route} from "react-router-dom";
//import Accessibility from "./pages/accessibility";
import MapPage from "./pages/Map.js";
import Accessible from "./pages/accessibility.js"


/*
function App() {
  Call();
  return (
    <div className="Page">
        <MyMap/>
        <a href="https://google.com">
          <button id="mapButton">Swap to Accessibility View</button>
        </a>
        <div className="Search">
            <StartDropDown/>
            <EndDropDown/>
            <Button/>
        </div>
    </div>
  );
}*/

function App() {
  return(
    <div className = "App">
      <BrowserRouter>
        <Routes>
          <Route path ="" element={<MapPage/>}/>
          <Route path ="/accessibility" element ={<Accessible/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
