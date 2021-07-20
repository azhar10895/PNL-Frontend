import React, { useMemo } from "react";


import { COLUMNS } from "../dashboard/coloumns.js";

const Table = (props) => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => props.data, []);


  return (
    <table className="m-auto">
      <thead>
        <tr>
          {columns.map((column) => (
            <th className="p-2">{column.Header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr>
            {columns.map((column) => (
              <td
                style={{color: ["GrossPNL", "NetPNL"].includes(column.accessor) ? item[column.accessor] > 0 ? "Green" : "Red" : "inherit" }}
                className="p-2"
              >
                {item[column.accessor] || "-"}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
