import React from "react";
import "../App.css";

const SearchBar = (props) => {
  return (
    <div className="profile-textboxes">
      <input
        type="text"
        value={props.value}
        onChange={(event) => props.setsearchValue(event.target.value)}
        placeholder="Search for Movies..."
      ></input>
    </div>
  );
};

export default SearchBar;
