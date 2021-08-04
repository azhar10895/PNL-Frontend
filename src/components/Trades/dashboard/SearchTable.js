import React from "react";
import "../styles/SearchTable.css";


const SearchTable = ({ filter, setFilter }) => {
  return (
    <span className="p-2 SearchBar">
      <input className="SearchBarInput" value={filter || ""} onChange={(e) => setFilter(e.target.value)} placeholder="Search" />
    </span>
  );
};

export default SearchTable;