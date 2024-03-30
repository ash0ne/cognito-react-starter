import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
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
            backgroundColor: "#343a40",
            color: "white",
            height: "50vh",
          }}
        >
          <h1>Welcome to your home page</h1>
        </div>
      </div>

      {/* Go to Dashboard Button */}
      <Link
        to="/dashboard"
        className="btn btn-light position-absolute top-0 end-0 m-3"
      >
        Dashboard
      </Link>
      {/* Text Sections */}
      <div className="row mt-5">
        {/* Section 1 */}
        <div className="col-md-6">
          <h2>[Section 1]</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
            feugiat lorem, ut ultrices sapien.
          </p>
        </div>
        {/* Section 2 */}
        <div className="col-md-6">
          <h2>[Section 2]</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
            feugiat lorem, ut ultrices sapien.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
