import './App.css';
import {React} from 'react';
import 'react-awesome-button/dist/styles.css'; 

import {BrowserRouter, Routes, Route} from "react-router-dom";
import MapPage from "./pages/Map.js";
import Accessible from "./pages/accessibility.js"


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
