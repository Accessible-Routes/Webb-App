import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";

const SideBar = props => {
  const sidebarClass = props.isOpen ? "sidebar open" : "sidebar";
  return (
    <div className={sidebarClass} style={{flex:1}}>
      <Link to="/about">About</Link>
      
      <button onClick={props.toggleSidebar} className="sidebar-toggle">
        Toggle Sidebar
      </button>
    </div>
  );
};

const Header = props => {
    return (
      <header>
        <button onClick={props.onClick}>Click Me!</button>
      </header>
    );
  };

export {Header, SideBar};