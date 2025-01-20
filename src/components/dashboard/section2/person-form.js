import React, { useState } from "react";

const PersonForm = ({
  formData,
  setFormData,
  handleSubmit,
  successMessage,
  errorMessage,
  resetSearch,
}) => {
  const [mode, setMode] = useState("add");

  const handleChange = (e, formData, setFormData) => {
    const { id, value } = e.target;
    let newValue = value;

    // Validate input based on the field ID
    if (id === "firstName" || id === "lastName" || id === "tag") {
      newValue = value.replace(/[^a-zA-Z\s]/g, "");
    } else if (id === "age") {
      newValue = value.replace(/\D/g, "");
      if (
        newValue !== "" &&
        (parseInt(newValue) < 0 || parseInt(newValue) > 120)
      ) {
        newValue = formData.age;
      }
    } else if (id === "phoneNumber") {
      newValue = value.replace(/(?:\+|(?!^))\+|[^+\d]/g, "");
      if (newValue.length > 20) {
        newValue = newValue.substring(0, 20);
      }
    }

    setFormData({
      ...formData,
      [id]: newValue,
    });
  };

  return (
    <div
      className="card border-1 m-4 overflow-scroll"
      style={{ minHeight: "75vh", maxHeight: "75vh" }}
    >
      <div className="card-body p-4">
        <h5 className="card-title text-purple">
          {mode === "add" ? "Add Person" : "Search Person"}
        </h5>
        <ul className="nav nav-tabs mb-3" style={{ borderBottom: "none" }}>
          <li className="nav-item">
            <button
              className={`nav-link ${mode === "add" ? "btn btn-dark active" : "btn btn-outline-dark"}`}
              style={{
                borderRadius: "0px",
                color: mode === "add" ? "#fff" : "#343a40",
                backgroundColor: mode === "add" ? "#343a40" : "transparent",
                borderColor: "#343a40",
                textDecoration: "none",
                padding: "5px 10px",
                fontSize: "14px",
              }}
              onClick={() => setMode("add")}
            >
              Add
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${mode === "search" ? "btn btn-dark active" : "btn btn-outline-dark"}`}
              style={{
                borderRadius: "0px",
                color: mode === "search" ? "#fff" : "#343a40",
                backgroundColor: mode === "search" ? "#343a40" : "transparent",
                borderColor: "#343a40",
                textDecoration: "none",
                padding: "5px 10px",
                fontSize: "14px",
              }}
              onClick={() => setMode("search")}
            >
              Search
            </button>
          </li>
        </ul>
        <form onSubmit={(e) => handleSubmit(e, mode)}>
          <div className="mb-2 mt-4">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              value={formData.firstName}
              onChange={(e) => handleChange(e, formData, setFormData)}
              required
            />
          </div>
          {mode === "add" && (
            <>
              <div className="mb-2">
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
              <div className="mb-2">
                <label htmlFor="age" className="form-label">
                  Age
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="age"
                  value={formData.age}
                  onChange={(e) => handleChange(e, formData, setFormData)}
                  required
                />
              </div>
            </>
          )}
          <div className="mb-2">
            <label htmlFor="phoneNumber" className="form-label">
              Phone Number
            </label>
            <input
              type="text"
              className="form-control"
              id="phoneNumber"
              value={formData.phoneNumber}
              onChange={(e) => handleChange(e, formData, setFormData)}
              required
            />
          </div>
          {mode === "add" && (
            <div className="mb-2">
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
          )}
          <div className="d-flex gap-2 mt-3">
            <button
              type="submit"
              className="btn btn-success btn-sm flex-grow-1"
            >
              {mode === "add" ? "Add" : "Search"}
            </button>
            {mode === "search" && (
              <button
                type="button"
                className="btn btn-warning btn-sm flex-grow-1"
                onClick={resetSearch}
              >
                Reset
              </button>
            )}
          </div>
        </form>
        {successMessage && (
          <span className="text-success mt-3">{successMessage}</span>
        )}
        {errorMessage && (
          <span className="text-danger mt-3">{errorMessage}</span>
        )}
      </div>
    </div>
  );
};

export default PersonForm;
