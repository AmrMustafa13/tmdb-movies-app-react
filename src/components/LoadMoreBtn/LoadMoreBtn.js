import React from "react";
import "./LoadMoreBtn.css";

const LoadMoreBtn = ({ loadMoreItems }) => {
  return (
    <div className="rmdb-loadmorebtn" onClick={loadMoreItems}>
      <p>Load More</p>
    </div>
  );
};

export default LoadMoreBtn;
