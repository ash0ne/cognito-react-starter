import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Table from "../../commons/table/table";
import { handleChange, formatDate } from "../../../utils/utils";

const apiUrl = process.env.REACT_APP_BACKEND_APP_API_BASE_URL;

const SectionTwo = ({ tokens }) => {
  // ---------- States ------------
  const [persons, setPersons] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    phoneNumber: "",
    tag: "",
  });

  // ----------- API Calls -----------
  const fetchData = useCallback(
    async (page = 0) => {
      //GET
      try {
        setLoading(true);
        const response = await axios.get(
          `${apiUrl}v1/persons?page=${page}&size=10`,
          {
            headers: {
              Authorization: `Bearer ${tokens.accessToken}`,
            },
          },
        );
        // Transforming the date format
        const formattedPersons = response.data.content.map((person) => ({
          ...person,
          createTime: formatDate(person.createTime),
        }));
        setPersons(formattedPersons);
        setTotalPages(response.data.totalPages);
        setCurrentPage(page);
      } catch (error) {
        console.error(
          "Error fetching data. Make sure you have the right backend config:",
          error,
        );
      } finally {
        setLoading(false);
      }
      console.log("Fetching data...");
    },
    [tokens.accessToken],
  );

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

  const deleteItem = async (id) => {
    try {
      const response = await axios.delete(`${apiUrl}v1/persons/${id}`, {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      });
      if (response.status === 200) {
        console.log(`Item with ID ${id} deleted successfully.`);
        fetchData(currentPage);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      fetchData(newPage);
    }
  };

  return (
    <div className="row">
      <h3 className="m-4 text-dark">
        This section has the code to use tokens from the Auth object and make
        API calls
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
            <div className="d-flex gap-2">
              <button
                className="btn btn-success btn-sm flex-grow-1"
                onClick={postData}
              >
                Add
              </button>
              <button
                className="btn btn-dark btn-sm flex-grow-1"
                onClick={postData}
              >
                Search
              </button>
            </div>
            {showSuccess && (
              <span className="text-success mt-3">✔ Successfully added!</span>
            )}
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
            importantHeadings={["First Name", "Phone Number"]} // Only these are showin in mobile layouts
            importantKeys={["firstName", "phoneNumber"]} // Only these are showin in mobile layouts
            data={persons}
            excludedKeys={["id", "tag"]}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            deleteItem={deleteItem}
          />
        )}
      </div>
    </div>
  );
};

export default SectionTwo;
