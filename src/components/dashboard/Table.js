import React, { useMemo } from 'react'
import { useTable } from 'react-table'

import { COLUMNS } from '../dashboard/coloumns.js'

const Table = () => {
  const columns = useMemo(() => COLUMNS, [])
//   const data = useMemo(() => MOCK_DATA, [])
  const tableInstance = useTable({
    columns:columns,
})

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance

  return (
    <>
      <table {...getTableProps()}>
        <thead>
            {
                headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {
                            headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))
                        }
                        <th>

                        </th>
                    </tr>
                ))
            }
            <tbody {...getTableBodyProps()}>
                {
                    rows.map((row) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })
                }
            <tr>
                <td></td>
            </tr>
            </tbody>
        </thead>
      </table>
    </>
  )
}

export default Table;
