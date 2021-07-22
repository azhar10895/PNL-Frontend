import React from "react";
import "../styles/SearchTable.css";

const SearchTable = ({ filter, setFilter }) => {
  return (
    <span className="p-2 ">
      <input className="SearchBar" value={filter || ""} onChange={(e) => setFilter(e.target.value)} placeholder="Search" />
    </span>
  );
};

export default SearchTable;