import React from "react";

const PersonDetails = ({
  isLoading,
  editablePerson,
  handleInputChange,
  handleUpdate,
  handleBack
}) => {
  return (
    <div
      className="card border-1 m-4 d-flex flex-column overflow-scroll "
      style={{ minHeight: "75vh", maxHeight: "75vh" }}
    >
      <div className="card-body p-3 flex-grow-1 d-flex flex-column">
        <h5 className="card-title text-purple">Person Details</h5>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="row">
            <div className="col-md-6">
              <div className="mb-2">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  id="firstName"
                  name="firstName"
                  value={editablePerson.firstName}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-2">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  id="lastName"
                  name="lastName"
                  value={editablePerson.lastName}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-2">
                <label htmlFor="age" className="form-label">
                  Age
                </label>
                <input
                  type="number"
                  className="form-control form-control-sm"
                  id="age"
                  name="age"
                  value={editablePerson.age}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-2">
                <label htmlFor="phoneNumber" className="form-label">
                  Phone Number
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={editablePerson.phoneNumber}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            {/* Add more fields as necessary */}
            <div className="col-md-12 d-flex justify-content-between align-items-center mt-3">
              <button className="btn btn-dark btn-sm" onClick={handleBack}>
                Back
              </button>
              <button className="btn btn-dark btn-sm" onClick={handleUpdate}>
                Update Details
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonDetails;
