import { render } from "@testing-library/react";
import React, { useMemo } from "react";
import SearchTable from "./SearchTable.js";
import { useTable, useSortBy, useGlobalFilter } from "react-table";
import { COLUMNS } from "../dashboard/coloumns.js";
import Sort from "./Sort.js";
const Table = (props) => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => props.data, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy
  );
  // const { globalFilter } = state;
  return (
    <>

      <div className="fixedTable">
        <table className="table-section" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    className="p-2"
                    {...column.getHeaderProps(
                      column.Sorted ? column.getSortByToggleProps() : ""
                    )}
                  >
                    {column.render("Header")}
                    <span>
                      <Sort column={column}/>
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="table-body" {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        style={{
                          color: ["GrossPNL", "NetPNL"].includes(
                            cell.column.Header
                          )
                            ? cell.value > 0
                              ? "Green"
                              : "Red"
                            : "inherit",
                        }}
                        className="p-2"
                      >
                        {cell.value === undefined ? "-" : cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
