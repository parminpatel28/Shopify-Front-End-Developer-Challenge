import React from "react";
import "../App.css";

const SearchBar = (props) => {
  return (
    <div className="profile-textboxes">
      <input
        type="text"
        className=""
        value={props.value}
        onChange={(event) => props.setsearchValue(event.target.value)}
        placeholder="Search for Movie..."
      ></input>
    </div>
  );
};

export default SearchBar;
