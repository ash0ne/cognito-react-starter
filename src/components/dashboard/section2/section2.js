import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Table from "../../commons/table/table";
import { handleChange, formatDate } from "../../../utils/utils";

/* Code to use the access token provided by the amplify wrapper and make an API call to the backend. */

const apiUrl = process.env.REACT_APP_BACKEND_APP_API_BASE_URL;
const SectionTwo = ({ tokens }) => {
  // ---------- States ------------
  const [persons, setPersons] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    phoneNumber: "",
    tag: "",
  });

  // ----------- API Calls -----------
  const fetchData = useCallback(async () => {
    //GET
    try {
      const response = await axios.get(`${apiUrl}v1/persons?page=0&size=20`, {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      });
      // Transforming the date format
      const formattedPersons = response.data.content.map((person) => ({
        ...person,
        createTime: formatDate(person.createTime),
      }));
      setPersons(formattedPersons);
    } catch (error) {
      console.error(
        "Error fetching data. Make sure you have the right backend config:",
        error,
      );
    } finally {
      setLoading(false);
    }
    console.log("Fetching data...");
  }, [tokens.accessToken]);

  const postData = async () => {
    //POST
    try {
      const response = await axios.post(`${apiUrl}v1/persons`, formData, {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      });
      if (response.status === 200) {
        // Set showSuccess to true to display success indicator
        setShowSuccess(true);
        // Reset form data after a short delay
        setTimeout(() => {
          setShowSuccess(false);
          setFormData({
            firstName: "",
            lastName: "",
            age: "",
            phoneNumber: "",
            tag: "",
          });
        }, 1500); // Adjust the delay as needed
      }
      fetchData();
    } catch (error) {
      console.error("Error making API call:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="row">
      <h3 className="m-4 text-dark">
        This section has the sample code to use the tokens from the Auth object
        and make an API call
      </h3>
      <div className="col-lg-4">
        <div
          className="card border-1 m-4 overflow-scroll"
          style={{ minHeight: "75vh", maxHeight: "75vh" }}
        >
          <div className="card-body p-4">
            {/* Form JSX used to input the data to be posted. */}
            <h5 className="card-title text-purple">Person</h5>
            <div className="mb-3 mt-4">
              <label htmlFor="firstName" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleChange(e, formData, setFormData)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleChange(e, formData, setFormData)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="age" className="form-label">
                Age
              </label>
              <input
                type="text"
                className="form-control"
                id="age"
                value={formData.age}
                onChange={(e) => handleChange(e, formData, setFormData)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phoneNumber" className="form-label">
                Phone Number
              </label>
              <input
                type="text"
                className="form-control"
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={(e) => handleChange(e, formData, setFormData)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="tag" className="form-label">
                Tag
              </label>
              <input
                type="text"
                className="form-control"
                id="tag"
                value={formData.tag}
                onChange={(e) => handleChange(e, formData, setFormData)}
              />
            </div>
            <div className="d-grid">
              <button className="btn btn-dark btn-lg" onClick={postData}>
                Add
              </button>
              {showSuccess && (
                <span className="text-success mt-3">
                  ✔ Successfully added!
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-7">
        {/* Display JSX for the fetched data */}
        {loading ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "75vh" }}
          >
            <div className="spinner-border text-secondary" role="status"></div>
          </div>
        ) : (
          <Table
            title="Persons"
            headings={[
              "First Name",
              "Last Name",
              "Age",
              "Phone Number",
              "Create Time",
            ]}
            data={persons}
            excludedKeys={["id", "tag"]}
          />
        )}
      </div>
    </div>
  );
};

export default SectionTwo;
