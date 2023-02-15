import React from "react";
import "./FourColGrid.css";

const FourColGrid = ({ header, loading, children }) => {
  return (
    <div className="rmdb-grid">
      {header && !loading && <h1>{header}</h1>}
      <div className="rmdb-grid-content">
        {children.map((element, i) => {
          return (
            <div key={i} className="rmdb-grid-element">
              {element}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FourColGrid;
