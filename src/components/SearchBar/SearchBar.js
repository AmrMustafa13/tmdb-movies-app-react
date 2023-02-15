import React, { useState, useEffect } from "react";
import "./SearchBar.css";
import { FiSearch } from "react-icons/fi";

const SearchBar = ({ searchItems }) => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      searchItems(searchText);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchText]);

  return (
    <div className="rmdb-searchbar">
      <div className="rmdb-searchbar-content">
        <FiSearch className="rmdb-fa-search" />
        <input
          type="text"
          className="rmdb-searchbar-input"
          placeholder="Search"
          onChange={handleSearch}
          value={searchText}
        />
      </div>
    </div>
  );
};

export default SearchBar;
