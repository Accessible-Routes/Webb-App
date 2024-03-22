import { React } from 'react';
import 'react-awesome-button/dist/styles.css';
import CustomNavBar from './common/components/CustomNavBar.component.js';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.js";
import About from "./pages/about.js";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
