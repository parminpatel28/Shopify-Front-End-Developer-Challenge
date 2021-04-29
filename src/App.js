import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import SearchResults from "./components/SearchResult";
import SearchBar from "./components/Search";
import AddNomination from "./components/AddNomination";
import RemoveNomination from "./components/RemoveNomination";
import Notification from "./components/Notification";
import axios from "axios";

export default function App() {
  const [moviesList, setMovies] = useState([]);
  const [searchValue, setsearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setnotFound] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [nomination, setNomination] = useState([]);
  const [displayNotification, setDisplayNotification] = useState(false);

  const getSearchResults = async (searchValue) => {
    const url = ` https://www.omdbapi.com/?s=${searchValue}&apikey=${process.env.REACT_APP_API_KEY}`;
    const data = await fetch(url);
    const response = await data.json();

    if (response.Search && response.Response === "True") {
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
    setIsLoading(false);
  }, [searchValue]);

  useEffect(() => {
    setDisplayNotification(false);
    const PreviousNominatedList = JSON.parse(
      localStorage.getItem("Nominated-Movies")
    );
    setNomination(PreviousNominatedList);
  }, []);

  useEffect(() => {
    if (nomination.length === 5 && moviesList.length !== 0) {
      setDisplayNotification(true);
    }
  }, [nomination, moviesList]);

  const closeNotification = () => {
    setDisplayNotification(false);
  };
  const saveToStorage = (movie) => {
    localStorage.setItem("Nominated-Movies", JSON.stringify(movie));
  };
  const nominateMovie = (selectedMovie) => {
    const nominationList = [...nomination, selectedMovie];
    setNomination(nominationList);
    saveToStorage(nominationList);
  };

  const removeNominate = (removeMovie) => {
    const newNominationList = nomination.filter(
      (nominate) => nominate.imdbID !== removeMovie.imdbID
    );
    setNomination(newNominationList);
    saveToStorage(newNominationList);
  };

  if (isLoading) {
    return (
      <div>
        <h1> Loading...</h1>
      </div>
    );
  } else {
    return (
      <div className="banner-top">
        <h1> The Shoppies</h1>
        <SearchBar searchValue={searchValue} setsearchValue={setsearchValue} />
        <h2> Movies</h2>

        <div className="container-fluid movie-display">
          <div className="row align-items-center mt-4 mb-4">
            <SearchResults
              movies={moviesList}
              notFound={notFound}
              errorMessage={errorMessage}
              NominationClick={nominateMovie}
              AddNominationBanner={AddNomination}
            />
          </div>

          {displayNotification ? (
            <Notification closeNotification={closeNotification} />
          ) : null}
        </div>
        <h2> Nominations</h2>
        <div className="container-fluid movie-display">
          <div className="row align-items-center mt-4 mb-4">
            <SearchResults
              movies={nomination}
              NominationClick={removeNominate}
              AddNominationBanner={RemoveNomination}
            />
          </div>
        </div>
      </div>
    );
  }
}
