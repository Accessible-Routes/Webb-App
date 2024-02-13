import { React } from 'react';
import 'react-awesome-button/dist/styles.css';
import CustomNavBar from './common/components/CustomNavBar.component.js';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.js";
import Issue from "./pages/issue.js";


function App() {
  return (
    <Router>
      <CustomNavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/issue" element={<Issue />} />
      </Routes>
    </Router>
  );
}

export default App;
