import { styled } from "styled-components";
import { Link } from "react-router-dom";
import Modal from "react-modal";

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
  min-width: 1582px;
  /* width: 1582px; */
  padding: 30px;
  border-radius: 0px 24px 24px 24px;
  background-color: ${(props) => props.theme.colors.white};
  box-shadow: 0px 7px 30px 0px #bbc0cd66;
`;

//RADIOS COMPLETO
export const TableContainerRad = styled.div`
  min-width: 1582px;
  /* width: 1582px; */
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
  padding: 2%;
  display: flex;
  flex-direction: column;
  min-height: 900px;
`;

//CURRENTTAB COMO PROP
export const TableButtonTab = styled("button")<{ active: string }>`
  background-color: ${(props) => (props.active ? "#FFFFFF" : "#F5F5F5")};
  font-size: ${(props) => props.theme.fontSizes.md};
  font-family: ${(props) =>
    props.active
      ? "font-family: 'Sora', sans-serif;"
      : "font-family: 'Poppins', sans-serif"};
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
  background-color: #eeeeee;
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
  font-size: ${(props) => props.theme.fontSizes.xsm};
  font-family: ${(props) => props.theme.fontFamily.Poppins};
  background-color: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.gray100};
`;

export const LabelNotAbsoluteInput = styled.label`
  padding: 5px;
  font-size: ${(props) => props.theme.fontSizes.xsm};
  font-family: ${(props) => props.theme.fontFamily.Poppins};
  background-color: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.gray100};
`;

export const DivCheckboxPad = styled.div`
  margin-left: 20px;
`;

export const HrStyled = styled.hr`
  width: 382px;
  margin: 20px 0;
  color: ${(props) => props.theme.colors.gray100};
`;

export const LabelUserCheckbox = styled.label`
  font-size: ${(props) => props.theme.fontSizes.sm};
  font-family: ${(props) => props.theme.fontFamily.Poppins};
  color: ${(props) => props.theme.colors.gray100};
`;

export const UserCheckbox = styled.input`
  all: unset;
  display: inline-block;
  border: 1px solid ${(props) => props.theme.colors.white200};
  width: 18px;
  height: 18px;
  &:checked {
    background-color: ${(props) => props.theme.colors.white200};
  }
  &:checked::before {
    content: "✓";
    font-size: 14px;
    color: #fff;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const CheckboxUserDiv = styled.div`
  display: flex;
  gap: 10px;
  margin: 10px 0;
`;

export const UserTextArea = styled.textarea`
  width: 400px;
  height: 182px;
  border: 1.5px solid #e0e0e0;
  border-radius: ${(props) => props.theme.radius.sm};
  padding: 20px 15px;
  margin-bottom: 20px;
`;

//MODAL

export const ModalEditDelete = styled(Modal)`
  padding: 40px 60px;
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 24px;
  width: 618px;
  height: 359px;
  transform: translate(-50%, -50%);
  background-color: white;
  box-shadow: 0px 0px 25px 0px #A3A3A333;
`;
 
export const ModalMessage = styled.div`
  text-align: center;
  font-size: ${(props) => props.theme.fontSizes.xl};
  font-family: ${(props) => props.theme.fontFamily.Sora};
  color: ${(props) => props.theme.colors.darkGray100};
  span {
    color: #ff3333;
    text-decoration: underline;
  }
`;

export const ModalConfirmation = styled.div`
  text-align: center;
  font-size: ${(props) => props.theme.fontSizes.xxl};
  font-family: ${(props) => props.theme.fontFamily.Sora};
  color: ${(props) => props.theme.colors.darkGray100};
`;

export const ModalButton = styled.button`
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
`;

export const ModalLink = styled.div`
  font-size: ${(props) => props.theme.fontSizes.sm};
  font-family: ${(props) => props.theme.fontFamily.Poppins};
  color: red;
  cursor: pointer;
`;

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 25px;
`;

export const ModalCloseDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  margin-bottom: 20px;
  button {
    border: none;
    background-color: white;
    cursor: pointer;
  }
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
  font-size: ${(props) => props.theme.fontSizes.sm};
  font-family: ${(props) => props.theme.fontFamily.Poppins};
  color: ${(props) => props.theme.colors.darkGray100};
`;

export const LabelCheckbox = styled.label`
  font-size: ${(props) => props.theme.fontSizes.xsm};
  font-family: ${(props) => props.theme.fontFamily.Poppins};
  color: ${(props) => props.theme.colors.gray100};
`;
