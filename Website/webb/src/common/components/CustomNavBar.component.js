import React from "react";
import { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import CONFIG from "../../config.json";

import styles from "./NavBar.module.css";

import { Header, SideBar } from "./CustomSideBar/CustomSideBar";

function CustomNavBar() {
  const [sidebarOpen, setSideBarOpen] = useState(false);
  const handleViewSidebar = () => {
    setSideBarOpen(!sidebarOpen);
  };

  return (
    // <>
    //   <div style={{flex:1}}>HEY OVE RHERE</div>
    //   <SideBar isOpen={sidebarOpen} toggleSidebar={handleViewSidebar} />
    // </>
    <Navbar bg="light" expand="lg" className={styles.navbar}>
      <Container className={styles.navbarContainer}>
        
        <Navbar.Collapse>
          <Navbar.Brand as={NavLink} to="/">
            Accessible Routes
          </Navbar.Brand>
          <img
            width="45px"
            height="40px"
            alt="Accessible Routes logo"
            src={require("./Logo.png")}
          />
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" className={styles.navLink}>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/about" className={styles.navLink}>
              About
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to={CONFIG.report_issue_page_link}
              className={styles.navLink}
            >
              Contact Us
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Toggle className="navbar-toggler flex-row ml-md-auto d-md-flex">Toggle</Navbar.Toggle>
      </Container>
    </Navbar>
  );
}

export default CustomNavBar;
