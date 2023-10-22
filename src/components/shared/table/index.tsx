import { ReactNode } from "react";
import * as S from "./styles"

type TableRow = Record<string, string | number | ReactNode>;

type TableProps = { 
  HeadColumns: string[]; 
  BodyRow: TableRow[];
  toDetail?: (userId: string) => void 
};

export const Table = ({ HeadColumns, BodyRow, toDetail }: TableProps) => {
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
        {BodyRow?.map((information, rowIndex) => (
          //ON CLICK ATRIBUIDO PARA CADA LINHA
          <S.SharedTableRowStyled key={`${rowIndex}-tr`} onClick={toDetail ? () => toDetail(information.id as string) : undefined}>
            {Object.keys(information).map((key, cellIndex) => (
              //NÃO RENDERIZAR O ITEM CASO A KEY FOR ID, PRECISO DO ID PARA OUTRA COISA
              key !== 'id' ? (
                <S.SharedTableTdStyled key={`${rowIndex}-${cellIndex}-td`}>
                  {information[key]}
                </S.SharedTableTdStyled>
              ) : null
            ))}
          </S.SharedTableRowStyled>
        ))}
      </tbody>
    </S.SharedTableStyled>
  );
};


export default Table;