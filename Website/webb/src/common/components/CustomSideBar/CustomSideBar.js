import React from "react";
import "./styles.css";

const SideBar = props => {
  const sidebarClass = props.isOpen ? "sidebar open" : "sidebar";
  return (
    <div className={sidebarClass}>
      <div> I slide into view </div>
      <div> Me Too! </div>
      <div> Me Three! </div>
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