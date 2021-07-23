import { render } from "@testing-library/react";
import React, { useMemo } from "react";
import SearchTable from "./SearchTable.js";
import { useHistory } from "react-router-dom";
import { useTable, useSortBy, useGlobalFilter } from "react-table";
import { COLUMNS } from "../dashboard/coloumns.js";

const Table = (props) => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => props.data, []);

  const history = useHistory();
  const logout = () => {
    localStorage.removeItem("token");
    history.push("/");
  };

  console.log('data:::::',data)

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
  const { globalFilter } = state;
  return (
    <>
      <div className="row p-3 g-0">
        <div className="col-12 dashcard mt-2 align-top">
          <div className="row">
            <div className="col-7">
              <h2 className="color-forHeadings text-left">Dashboard</h2>
            </div>
            <div className="col-3">
              <SearchTable filter={globalFilter} setFilter={setGlobalFilter}/>
            </div>
            <div className="col-2">
              <h3 onClick={logout} className="float-end cursor-">
                Logout
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div className="dashcard">
      <table className="table-section" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  className="p-2"
                  {...column.getHeaderProps(column.Sorted?column.getSortByToggleProps(): '')}
                >
                  {column.render("Header")}

                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-arrow-up-short"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-arrow-down-short"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z"
                          />
                        </svg>
                      )
                    ) : (
                      ""
                    )}
                  </span>
                </th>
              )
              )}
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
