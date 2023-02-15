import React from "react";
import "./MovieThumb.css";
import { Link } from "react-router-dom";

const MovieThumb = ({ image, clickable, movieId }) => {
  return (
    <div className="rmdb-moviethumb">
      {clickable ? (
        <Link to={`/${movieId}`}>
          <img src={image} alt="moviethumb" />
        </Link>
      ) : (
        <img src={image} alt="moviethumb" />
      )}
    </div>
  );
};

export default MovieThumb;
