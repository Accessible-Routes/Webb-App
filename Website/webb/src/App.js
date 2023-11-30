import './App.css';
import {React} from 'react';
import 'react-awesome-button/dist/styles.css'; 

import {BrowserRouter, Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage.js";


function App() {
  return(
    <div className = "App">
      <BrowserRouter>
        <Routes>
          <Route path ="" element={<HomePage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
