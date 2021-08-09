import React, { useState } from "react";
import { useTable } from "react-table";
// import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Trades.css";

const Tables = (props) => {
  const [click, setClick] = useState(0);
  const data = props.data;
  const columns = props.columns;
  console.log("data props::::::::::", data);
  console.log("columns propssssssss", columns);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });
  const sortHandler = (event) => {
    if (click === 0) {
      props.tradesSort(event.target.value, 1);
      setClick(1);
    } else if (click === 1) {
      props.tradesSort(event.target.value, -1);
      setClick(2);
    } else {
      props.tradesSort(event.target.value, null);
      setClick(0);
    }
  };

  return (
    <>
      <div className="tradesTable">
        <table {...getTableProps()} className="table table-striped">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} className="outer">
                {headerGroup.headers.map((column) => (
                  <th className="p-2" {...column.getHeaderProps()}>
                    <button
                      onClick={sortHandler}
                      className="inner"
                      value={column.render("Header")}
                    >
                      {column.render("Header")}
                    </button>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()} className="p-2">
                        {cell.render("Cell")}
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

export default Tables;
