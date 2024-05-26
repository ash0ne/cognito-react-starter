import React from "react";
import { FaTrash } from "react-icons/fa";

const Table = ({
  title,
  headings,
  data,
  excludedKeys,
  currentPage,
  totalPages,
  onPageChange,
  deleteItem,
  importantKeys,
  importantHeadings,
}) => {
  const renderCell = (item, key) => (
    <td key={key} className="text-secondary p-1">
      {item[key]}
    </td>
  );

  const renderHeading = (heading, index) => <th key={index}>{heading}</th>;

  const renderMobileCell = (item, key) => {
    if (importantKeys && importantKeys.length > 0) {
      if (importantKeys.includes(key)) {
        return renderCell(item, key);
      }
    } else {
      return renderCell(item, key);
    }
    return null;
  };

  const renderMobileHeading = (heading, index) => {
    if (importantHeadings && importantHeadings.length > 0) {
      if (importantHeadings.includes(heading)) {
        return renderHeading(heading, index);
      }
    } else {
      return renderHeading(heading, index);
    }
    return null;
  };

  const renderDesktopCell = (item, key) => renderCell(item, key);

  const renderDesktopHeading = (heading, index) =>
    renderHeading(heading, index);

  const isMobile = window.innerWidth <= 768;

  return (
    <div
      className="card border-1 m-4 d-flex flex-column overflow-scroll"
      style={{ minHeight: "75vh", maxHeight: "75vh" }}
    >
      <div className="card-body p-4 flex-grow-1 d-flex flex-column">
        <h5 className="card-title text-purple">{title}</h5>
        <div className="flex-grow-1 overflow-auto">
          <table className="table mb-0">
            <thead>
              <tr>
                {isMobile
                  ? headings.map((heading, index) =>
                      renderMobileHeading(heading, index),
                    )
                  : headings.map((heading, index) =>
                      renderDesktopHeading(heading, index),
                    )}
                <th />
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index} className="p-0">
                  {Object.keys(item)
                    .filter((key) => !excludedKeys.includes(key))
                    .map((key) =>
                      isMobile
                        ? renderMobileCell(item, key)
                        : renderDesktopCell(item, key),
                    )}
                  <td className="p-1">
                    <button
                      className="btn btn-link p-0 m-0 text-danger"
                      style={{ verticalAlign: "middle" }}
                      onClick={() => deleteItem(item.id)}
                    >
                      <FaTrash style={{ margin: 0, padding: 0 }} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-center mt-3">
          <nav aria-label="Page navigation">
            <ul className="pagination pagination-sm">
              <li
                className={`page-item ${currentPage === 0 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => onPageChange(0)}
                  disabled={currentPage === 0}
                >
                  First
                </button>
              </li>
              <li
                className={`page-item ${currentPage === 0 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => onPageChange(currentPage - 1)}
                  disabled={currentPage === 0}
                >
                  Previous
                </button>
              </li>
              <li className="page-item disabled">
                <span className="page-link">
                  Page {currentPage + 1} of {totalPages}
                </span>
              </li>
              <li
                className={`page-item ${totalPages === 0 || currentPage === totalPages - 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => onPageChange(currentPage + 1)}
                  disabled={totalPages === 0 || currentPage === totalPages - 1}
                >
                  Next
                </button>
              </li>
              <li
                className={`page-item ${totalPages === 0 || currentPage === totalPages - 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => onPageChange(totalPages - 1)}
                  disabled={totalPages === 0 || currentPage === totalPages - 1}
                >
                  Last
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Table;
