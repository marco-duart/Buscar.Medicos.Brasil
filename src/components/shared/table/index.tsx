import { ReactNode } from "react";
import * as S from "./styles"

type TableRow = Record<string, string | number | ReactNode>;

type TableProps = { 
  HeadColumns: string[]; 
  BodyRow: TableRow[];
};

export const Table = ({ HeadColumns, BodyRow }: TableProps) => {
  return (
    <S.SharedTableStyled>
      <thead>
        <tr>
          {HeadColumns.map((columnText, index) => (
            <S.SharedTableThStyled key={`${index}-th`}>{columnText}</S.SharedTableThStyled>
          ))}
        </tr>
      </thead>
      <tbody>
        {/* EM VEZ DE OLHAR O OBJETO PELOS VALORES, RESOLVI VER PELAS CHAVES */}
        {BodyRow?.map((information, rowIndex) => (
          <S.SharedTableRowStyled key={`${rowIndex}-tr`}>
            {Object.keys(information).map((key, cellIndex) => (
              <S.SharedTableTdStyled key={`${rowIndex}-${cellIndex}-td`}>{information[key]}</S.SharedTableTdStyled>
            ))}
          </S.SharedTableRowStyled>
        ))}
      </tbody>
    </S.SharedTableStyled>
  );
};

export default Table;