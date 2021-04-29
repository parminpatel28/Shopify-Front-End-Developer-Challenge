import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import SearchBar from "./components/search";
import SearchResults from "./components/searchResults";

const App = () => {
  const [moviesList, setMovies] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [searchValue, setsearchValue] = useState("");
  const [notFound, setnotFound] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const getSearchResults = async (searchValue) => {
    const url = ` http://www.omdbapi.com/?s=${searchValue}&apikey=${process.env.REACT_APP_API_KEY}`;
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
    setisLoading(false);
  }, [searchValue]);

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <div className="banner-top">
      <h1> The Shoppies</h1>

      <SearchBar searchValue={searchValue} setsearchValue={setsearchValue} />
      <h2> Movies</h2>
      <div className="container-fluid">
        <div className="row">
          <SearchResults
            className="section"
            movies={moviesList}
            notFound={notFound}
            errorMessage={errorMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
