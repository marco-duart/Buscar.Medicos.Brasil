import { Link } from "react-router-dom";
import styled from "styled-components";

export const HeaderStyled = styled.header`
  width: 100%;
  height: 11vh;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 15px;
  margin-bottom: 30px;
`;

export const HeaderIcoStyled = styled.img`
  width: 48px;
  height: 48px;
`;

export const HeaderNameStyled = styled.div`
  font-size: ${(props) => props.theme.fontSizes.md};
  font-family: ${(props) => props.theme.fontFamily.Sora};
  font-weight: 600;
  color: ${(props) => props.theme.colors.darkGray100};
`;

export const HeaderEmailStyled = styled.div`
  font-size: ${(props) => props.theme.fontSizes.sm};
  font-family: ${(props) => props.theme.fontFamily.Poppins};
  color: ${(props) => props.theme.colors.gray100};
`;

//MENU CASCATA

export const CascadingMenu = styled.div`
  position: relative;
  display: inline-block;
`;

export const MenuButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
`;

export const Dropdown = styled("div")<{ isOpen: boolean }>`
  border: none;
  width: 202px;
  height: 146px;
  border-radius: 24px;
  box-shadow: 0px 7px 20px 0px #bbc0cd66;
  position: absolute;
  top: 50px;
  right: -25px;
  background-color: #fff;
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  z-index: 1;
`;

export const HrStyled = styled.hr`
  width: 202px;
  margin: 10px 0;
  border-top: 2px solid ${(props) => props.theme.colors.white};
`;

export const DropdownItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  font-size: ${(props) => props.theme.fontSizes.sm};
  font-family: ${(props) => props.theme.fontFamily.Poppins};
  color: ${(props) => props.theme.colors.gray100};
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
    border-radius: 15px;
  }
`;

export const DropdownLinkItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  font-size: ${(props) => props.theme.fontSizes.sm};
  font-family: ${(props) => props.theme.fontFamily.Poppins};
  color: ${(props) => props.theme.colors.gray100};
`;
