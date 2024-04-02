import React from "react";
import { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import CONFIG from "../../../config.json";

import styles from "./NavBar.module.css";
import { flexbox } from "@mui/system";

function CustomNavBar({ toggle }) {
  const [sidebarOpen, setSideBarOpen] = useState(toggle);
  const handleViewSidebar = () => {
    setSideBarOpen(!sidebarOpen);
  };

  return (
    <Navbar bg="light" expand="lg" className={styles.navbar}>
      {sidebarOpen && (
        <>
          <Navbar.Brand as={NavLink} to="/">
            Accessible Routes
          </Navbar.Brand>
          <img
            width="45px"
            height="40px"
            alt="Accessible Routes logo"
            src={require("../../../assets/Logo.png")}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flexWrap: "nowrap",
              justifyContent: "space-between",

            }}
          >
            <div style={{ flex: 1 }}>
              <Nav.Link as={NavLink} to="/" className={styles.navLink}>
                Home
              </Nav.Link>
            </div>
            <div style={{ flex: 1 }}>
              <Nav.Link as={NavLink} to="/about" className={styles.navLink}>
                About
              </Nav.Link>
            </div>
            <div style={{ flex: 1 }}>
              <Nav.Link
                as={NavLink}
                to={CONFIG.report_issue_page_link}
                className={styles.navLink}
              >
                Contact Us
              </Nav.Link>
            </div>
          </div>
        </>
      )}
    </Navbar>
  );
}

export default CustomNavBar;