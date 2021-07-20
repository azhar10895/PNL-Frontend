import { render } from "@testing-library/react";
import React, { useMemo } from "react";

import { useTable } from "react-table";
import { COLUMNS } from "../dashboard/coloumns.js";

const Table = (props) => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => props.data, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  })

  return (
    // <table className="m-auto">
    //   <thead>
    //     <tr>
    //       {columns.map((column) => (
    //         <th className="p-2">{column.Header}</th>
    //       ))}
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {data.map((item) => (
    //       <tr>
            // {columns.map((column) => (
            //   <td
            //     style={{color: ["GrossPNL", "NetPNL"].includes(column.accessor) ? item[column.accessor] > 0 ? "Green" : "Red" : "inherit" }}
            //     className="p-2"
              // >
    //             {item[column.accessor] || "-"}
    //           </td>
    //         ))}
    //       </tr>
    //     ))}
    //   </tbody>
    // </table>
    <table className="m-auto" {...getTableProps()}>
      <thead className="table-header">
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th className="p-2" {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className="table-body" {...getTableBodyProps()}>
        {rows.map((row,i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (<td {...cell.getCellProps()} style={{color: ["GrossPNL", "NetPNL"].includes(cell.accessor) ? row[cell.accessor] > 0 ? "Green" : "Red" : "inherit" }}
                className="p-2">{cell.render('Cell')}</td>)
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  );
};

export default Table;
