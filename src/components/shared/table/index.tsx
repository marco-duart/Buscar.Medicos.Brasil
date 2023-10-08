import { ReactNode } from "react";

type TableRow = Record<string, string | number | ReactNode>;

type TableProps = { 
  HeadColumns: string[]; 
  BodyRow: TableRow[];
};

export const Table = ({ HeadColumns, BodyRow }: TableProps) => {
  console.log("BodyRow linha 10", BodyRow);
  return (
    <table>
      <thead>
        <tr>
          {HeadColumns.map((columnText, index) => (
            <th key={`${index}-th`}>{columnText}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {BodyRow?.map((information, rowIndex) => (
          <tr key={`${rowIndex}-tr`}>
            {Object.keys(information).map((key, cellIndex) => (
              <td key={`${rowIndex}-${cellIndex}-td`}>{information[key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;