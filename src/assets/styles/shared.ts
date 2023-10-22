import { styled } from "styled-components";
import { Link } from "react-router-dom";


//GENÉRICO

export const TableDFlexTab = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

//GLOBAL???
export const PageTitle = styled.div`
  font-size: ${(props) => props.theme.fontSizes.xl};
  font-family: ${(props) => props.theme.fontFamily.Sora};
  color: ${(props) => props.theme.colors.darkGray100};
  font-weight: 600;
  margin-bottom: 30px;
`;

export const DetailFormTitle = styled.div`
  font-size: ${(props) => props.theme.fontSizes.md};
  font-family: ${(props) => props.theme.fontFamily.Sora};
  color: ${(props) => props.theme.colors.darkGray100};
  font-weight: 600;
  margin-bottom: 30px;
`;

//PARA TABLES COM TAB
export const TableContainer = styled.div`
  width: 1582px;
  padding: 30px;
  border-radius: 0px 24px 24px 24px;
  background-color: ${(props) => props.theme.colors.white};
  box-shadow: 0px 7px 30px 0px #bbc0cd66;
`;

//RADIOS COMPLETO
export const TableContainerRad = styled.div`
  width: 1582px;
  padding: 30px;
  border-radius: 24px;
  background-color: ${(props) => props.theme.colors.white};
  box-shadow: 0px 7px 30px 0px #bbc0cd66;
`;

//ESPAÇAMENTO ENTRE OS TABS
export const TableButtonsTab = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

//COMPLETAR ESPAÇO
export const ContentRefil = styled.div`
  min-height: 900px;
`;

//CURRENTTAB COMO PROP
export const TableButtonTab = styled("button")<{ active: string }>`
  background-color: ${(props) => (props.active ? "#FFFFFF" : "#F5F5F5")};
  font-size: ${(props) => props.theme.fontSizes.md};
  font-family: ${(props) => (props.active ? "font-family: 'Sora', sans-serif;" : "font-family: 'Poppins', sans-serif")};
  color: ${(props) => props.theme.colors.darkGray100};
  font-weight: ${(props) => (props.active ? 600 : 400)};
  border: none;
  width: 180px;
  height: 64px;
  border-radius: 16px 16px 0px 0px;
  cursor: pointer;
  span {
    padding: 6px 6px;
    border-radius: 100px;
    color: ${(props) => (props.active ? "#FFFFFF" : "#212121")};
    background-color: ${(props) => (props.active ? "#046639" : "#B4E08E")};
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

export const TableTextInput = styled.input`
  width: 400px;
  height: 56px;
  border: 1.5px solid #e0e0e0;
  border-radius: ${(props) => props.theme.radius.sm};
  padding: 0 15px;
  margin-bottom: 20px;
`;

export const TableSelect = styled.select`
  width: 400px;
  height: 56px;
  border: 1.5px solid #e0e0e0;
  border-radius: ${(props) => props.theme.radius.sm};
  padding: 0 15px;
  margin-bottom: 20px;
`;

export const TableValueInput = styled.input`
  width: 184px;
  height: 56px;
  border: 1.5px solid #e0e0e0;
  border-radius: ${(props) => props.theme.radius.sm};
  padding: 0 15px;
  margin-bottom: 20px;
`;

export const TableTextArea = styled.textarea`
  width: 824px;
  height: 182px;
  border: 1.5px solid #e0e0e0;
  border-radius: ${(props) => props.theme.radius.sm};
  padding: 20px 15px;
  margin-bottom: 20px;
`;

export const TableSubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: 400px;
  height: 56px;
  border: none;
  background-color: ${(props) => props.theme.colors.darkGreen};
  font-size: ${(props) => props.theme.fontSizes.sm};
  font-family: ${(props) => props.theme.fontFamily.Poppins};
  color: ${(props) => props.theme.colors.white};
  border-radius: ${(props) => props.theme.radius.md};
  font-weight: 600;
  cursor: pointer;

  span {
    font-size: ${(props) => props.theme.fontSizes.xl};
    font-weight: 400;
  }
`;

//LINK
export const TableLink = styled(Link)`
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #EEEEEE;
  border-radius: 50%;
  img {
    width: 24px;
    height: 24px;
  }
`;

export const NewEditTitle = styled.div`
  font-size: ${(props) => props.theme.fontSizes.md};
  font-family: ${(props) => props.theme.fontFamily.Sora};
  color: ${(props) => props.theme.colors.darkGray100};
  font-weight: 600;
`;

//BUTTON
export const TableNewButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: 262px;
  height: 56px;
  border: none;
  background-color: ${(props) => props.theme.colors.lightGreen100};
  font-size: ${(props) => props.theme.fontSizes.sm};
  font-family: ${(props) => props.theme.fontFamily.Poppins};
  color: ${(props) => props.theme.colors.white};
  border-radius: ${(props) => props.theme.radius.md};
  font-weight: 600;
  cursor: pointer;

  span {
    font-size: ${(props) => props.theme.fontSizes.xl};
    font-weight: 400;
  }
`;

//INPUT
export const TableIco = styled.button`
  border: none;
  background: none;
  padding: 0;
  visibility: hidden;
  img {
    visibility: visible;
    cursor: pointer;
  }
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

//ABSOLUTE AND RELATIVE
export const DivRelativeInput = styled.div`
  position: relative;
`;

export const LabelAbsoluteInput = styled.label`
  position: absolute;
  top: -15px;
  left: 12px;
  padding: 5px;
  font-size: ${props => props.theme.fontSizes.xsm};
  font-family: ${props => props.theme.fontFamily.Poppins};
  background-color: ${props => props.theme.colors.white};
`;

//CHECKBOX

export const LabelCheckboxFlex = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 150px;
`;

export const LabelCheckboxColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const StatusCheckbox = styled.div`
  font-size: ${props => props.theme.fontSizes.sm};
  font-family: ${props => props.theme.fontFamily.Poppins};
  color: ${(props) => props.theme.colors.darkGray100};
`;

export const LabelCheckbox = styled.label`
  font-size: ${props => props.theme.fontSizes.xsm};
  font-family: ${props => props.theme.fontFamily.Poppins};
  color: ${(props) => props.theme.colors.gray100};
`;