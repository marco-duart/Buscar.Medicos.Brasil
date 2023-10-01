import React from 'react';

type Props = {
  data: IDataUserArray
  columns: {
    header: string
    accessor: string
    subaccessor?:string
  }[]
}


function Table({ data, columns } : Props) {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index}>{column.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            {columns.map((column, colIndex) => (
              <td key={colIndex}>
              {column.subaccessor ? 
                (item[column.accessor][0][column.subaccessor])
                : 
                item[column.accessor]}
            </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;