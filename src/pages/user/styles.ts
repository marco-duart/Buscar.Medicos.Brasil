import { styled } from "styled-components";

//GENÉRICO

export const TableDFlexTab = styled.div`
  display: flex;
  justify-content: space-between;
`;

//GLOBAL???
export const TableContainer = styled.div`
  width: 1582px;
  padding: 30px;
  border-radius: 0px 24px 24px 24px;
  background-color: ${(props) => props.theme.colors.white};
  box-shadow: 0px 7px 30px 0px #bbc0cd66;
`;

//ESPAÇAMENTO ENTRE OS TABS
export const TableButtonsTab = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

//CURRENTTAB COMO PROP
export const TableButtonTab = styled("button")<{ active: string }>`
  background-color: ${(props) => (props.active ? "#FFFFFF" : "#F5F5F5")};
  border: none;
  width: 172px;
  height: 64px;
  border-radius: 16px 16px 0px 0px;
  cursor: pointer;
  span {
    width: 55px;
    height: 28px;
    border-radius: 100px;
  }
`;

//INPUT
export const TableSearchInput = styled.input`
  width: 400px;
  height: 56px;
  border: 1.5px solid #e0e0e0;
  border-radius: ${(props) => props.theme.radius.sm};
  padding: 0 15px;
  margin-bottom: 20px;
`;

//USERCOUNT

export const TableCountText = styled.div`
  font-size: ${(props) => props.theme.fontSizes.sm};
  font-family: ${(props) => props.theme.fontFamily.Poppins};
  color: "#000000";
`;

export const TableCountValue = styled.div`
  font-size: ${(props) => props.theme.fontSizes.md};
  font-family: ${(props) => props.theme.fontFamily.Sora};
  color: "#000000";
  font-weight: 600;
`;

//PAGINATION

export const PageCountOffset = styled.div`
  font-size: ${(props) => props.theme.fontSizes.xsm};
  font-family: ${(props) => props.theme.fontFamily.Poppins};
  color: ${(props) => props.theme.colors.white300};
  margin-top: 10px;
`;

export const PageCountButton = styled.button`
  border: none;
  background-color: ${(props) => props.theme.colors.white};
  font-size: ${(props) => props.theme.fontSizes.xsm};
  font-family: ${(props) => props.theme.fontFamily.Poppins};
  color: ${(props) => props.theme.colors.white300};
  margin-top: 10px;
  cursor: pointer;
`;
