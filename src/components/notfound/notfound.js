import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const NotFound = () => {
  return (
    <div
      className="container-fluid"
      style={{ fontFamily: "JetBrains Mono, monospace" }}
    >
      {/* Top Banner */}
      <div className="row">
        <div
          className="col top-banner d-flex justify-content-center align-items-center"
          style={{
            backgroundColor: "#8B0000",
            color: "white",
            height: "50vh",
          }}
        >
          <h1>404 - Oops! The page you are looking for doesn't exist</h1>
        </div>
      </div>

      {/* Message */}
      <div className="row mt-5">
        <div
          className="col top-banner d-flex justify-content-center align-items-center"
          style={{
            color: "#8B0000",
            height: "30vh",
          }}
        >
          if you are lost,{" "}
          <Link to="/" style={{ fontFamily: "JetBrains Mono, monospace" }}>
            Go Home
          </Link>
          .
        </div>
      </div>
    </div>
  );
};

export default NotFound;
