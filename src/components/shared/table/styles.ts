import styled from "styled-components";

export const SharedTableStyled = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 6px;
`;

export const SharedTableThStyled = styled.th`
  padding: 0 20px;
  text-align: left;
  height: 72px;
  background-color: ${(props) => props.theme.colors.darkGreen};
  font-size: ${(props) => props.theme.fontSizes.sm};
  font-family: ${(props) => props.theme.fontFamily.Poppins};
  color: ${(props) => props.theme.colors.white};
  font-weight: 600;

  &:first-child {
    border-top-left-radius: 16px;
  }

  &:last-child {
    border-top-right-radius: 16px;
    text-align: center;
  }
`;

export const SharedTableRowStyled = styled.tr`
  &:nth-child(odd) {
    background-color: ${(props) => props.theme.colors.gray200};
  }

  &:nth-child(even) {
    background-color: ${(props) => props.theme.colors.gray300};
  }
`;

export const SharedTableTdStyled = styled.td`
  padding: 0 20px;
  height: 80px;
  font-size: ${(props) => props.theme.fontSizes.sm};
  font-family: ${(props) => props.theme.fontFamily.Poppins};
  color: ${(props) => props.theme.colors.darkGray100};

  &:last-child {
    text-align: center;
  }
`;
