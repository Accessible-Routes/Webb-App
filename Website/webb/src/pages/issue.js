import React from "react";

const Issue = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <h1 style={{ marginBottom: "20px", textAlign: "center" }}>
        Use this form to report any issues you have:
      </h1>
      <a href="https://stackoverflow.com/questions/50350085/how-to-make-a-hyperlink-external-in-react" rel="noreferrer">
        FORM
      </a>
    </div>
  );
};

export default Issue;
