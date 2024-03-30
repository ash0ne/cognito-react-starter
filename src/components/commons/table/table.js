import React from "react";

// The Table component that takes the Title, Headings and Data to construct a table inside a bootstrap card.
// Keys that needs to be excluded from display can be managed via the `excludedKeys` param.
const Table = ({ title, headings, data, excludedKeys }) => {
  return (
    <div
      className="card border-1 m-4 overflow-scroll"
      style={{ minHeight: "75vh", maxHeight: "75vh" }}
    >
      <div className="card-body p-4">
        <h5 className="card-title text-purple">{title}</h5>
        <table className="table">
          <thead>
            <tr>
              {headings.map((heading, index) => (
                <th key={index}>{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                {Object.keys(item)
                  .filter((key) => !excludedKeys.includes(key))
                  .map((key) => (
                    <td key={key}>{item[key]}</td>
                  ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
