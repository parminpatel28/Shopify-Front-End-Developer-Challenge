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
  const Nomination = props.NominationBanner;
  return (
    <>
      {props.movies.map((movie, key) => (
        <div
          className="image-container d-flex justify-content-start m-3"
          key={key}
        >
          <div>
            <img
              src={movie.Poster}
              alt="movie"
              height="500px"
              width="300px"
            ></img>
            <div
              onClick={() => props.NominationClick(movie)}
              className="overlay d-flex align-items-center justify-content-center"
            >
              <Nomination />
            </div>
            <h3>{movie.Title}</h3>
            <h4>{movie.Year}</h4>
          </div>
        </div>
      ))}
    </>
  );
};

export default searchResult;
