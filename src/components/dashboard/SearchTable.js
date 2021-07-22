import React from "react";

const SearchTable = ({ filter, setFilter }) => {
  return (
    <span>
      <input value={filter || ""} onChange={(e) => setFilter(e.target.value)} placeholder="Search" />
    </span>
  );
};

export default SearchTable;