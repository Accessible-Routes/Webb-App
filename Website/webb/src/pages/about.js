import React from "react";
import CustomNavBar from "../common/components/Navbars/CustomNavbar";

const About = () => {
  return (
    <>
      <CustomNavBar />
      <div
        style={{
          display: "flex",
          flexDirection: "column", // Stack items vertically
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          padding: "0 20px", // Add padding for better readability
          textAlign: "center", // Center-align text
        }}
      >
        <img
          src={require("../assets/Logo.png")}
          alt="Accessible Routes Logo"
          style={{ width: "300px", marginBottom: "20px" }} // Adjust width as needed
        />
        <div style={{ maxWidth: "600px", margin: "auto" }}>
          {" "}
          {/* Center content horizontally */}
          <h1
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              marginBottom: "20px",
            }}
          >
            About Accessible Routes
          </h1>
          <p style={{ fontSize: "18px", lineHeight: "1.5" }}>
            Accessible Routes was created during the summer semester of 2023 as
            a project in the Rensselaer Center for Open Source Software (RCOS).
            The goal of Accessible Routes is to help physically disabled
            students, staff, and faculty at RPI navigate our historic campus on
            a hill efficiently. This project would not be possible without the
            support of the Disabled Students at Rensselaer club (DSR).
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
