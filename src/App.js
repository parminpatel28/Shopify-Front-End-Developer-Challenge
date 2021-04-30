import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import SearchResults from "./components/SearchResult";
import SearchBar from "./components/Search";
import AddNomination from "./components/AddNomination";
import RemoveNomination from "./components/RemoveNomination";
import Notification from "./components/Notification";

export default function App() {
  //state Declaration
  const [moviesList, setMovies] = useState([]);
  const [searchValue, setsearchValue] = useState("");
  const [nomination, setNomination] = useState([]);
  const [displayNotification, setDisplayNotification] = useState(false);
  const [notFound, setnotFound] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const getSearchResults = async (searchValue) => {
    const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=${process.env.REACT_APP_API_KEY}`;
    const data = await fetch(url);
    const response = await data.json();

    if (response.Search) {
      setMovies(response.Search);
      setnotFound(false);
    } else {
      setErrorMessage(response.Error);
      setnotFound(true);
      setMovies([]);
    }
  };

  useEffect(() => {
    getSearchResults(searchValue);
  }, [searchValue]);

  useEffect(() => {
    if (nomination.length === 5 && moviesList.length !== 0) {
      setDisplayNotification(true);
    }
  }, [moviesList, nomination]);

  useEffect(() => {
    const movieFavourites = JSON.parse(
      localStorage.getItem("Nominated-Movies")
    );

    if (movieFavourites) {
      setNomination(movieFavourites);
    }
  }, []);

  function saveToStorage(movie) {
    return localStorage.setItem("Nominated-Movies", JSON.stringify(movie));
  }

  function nominateMovie(movie) {
    const newNomination = [...nomination, movie];
    setNomination(newNomination);
    saveToStorage(newNomination);
  }

  function removeNominate(removeMovie) {
    const newNominationList = nomination.filter(
      (nominate) => nominate.imdbID !== removeMovie.imdbID
    );
    setNomination(newNominationList);
    saveToStorage(newNominationList);
  }

  function closeNotification() {
    setDisplayNotification(false);
  }

  return (
    <div className="banner-top">
      <div>
        <h1> The Shoppies</h1>
        <SearchBar searchValue={searchValue} setsearchValue={setsearchValue} />
      </div>
      <div>
        <h2> Movies</h2>
      </div>

      <div className="container-fluid movie-display">
        <div className="row align-items-center mt-4 mb-4">
          <SearchResults
            movies={moviesList}
            NominationClick={nominateMovie}
            NominationBanner={AddNomination}
            notFound={notFound}
            errorMessage={errorMessage}
          />
        </div>
      </div>

      {displayNotification ? (
        <Notification closeNotification={closeNotification} />
      ) : null}

      <h2> Nominations</h2>
      <div className="container-fluid movie-display">
        <div className="row">
          <SearchResults
            movies={nomination}
            NominationClick={removeNominate}
            NominationBanner={RemoveNomination} // comes from the RemoveNomination Component
          />
        </div>
      </div>
    </div>
  );
}
