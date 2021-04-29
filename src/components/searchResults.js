import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

const searchResult = (props) => {
  if (props.notFound && props.errorMessage !== "Incorrect IMDb ID.") {
    return (
      <div>
        <h2> {props.errorMessage}</h2>
      </div>
    );
  }
  return (
    <div className="main section">
      {props.movies.map((movie, index) => (
        <div className="image-container">
          <div className="">
            <img
              src={movie.Poster}
              alt="movie"
              width="100px"
              height="200px"
            ></img>
            <h3> {movie.Title}</h3>
            <h4> {movie.Year}</h4>
          </div>
        </div>
      ))}
    </div>
  );
};

export default searchResult;
