import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const SideBarColumnStyled = styled("nav")<{ expanded: boolean }>`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  width: ${(props) => (props.expanded ? "274px" : "135px")};
  height: 100%;
  background-color: ${(props) => props.theme.colors.darkGreen};
`;

export const SideIcoDiv = styled.div`
  position: absolute;
  top: 50px;
  right: -70px;
`;

export const SidebarIco = styled.button`
  border: none;
  background: none;
  padding: 0;
  visibility: hidden;
  img {
    visibility: visible;
    cursor: pointer;
  }
`;

export const SideBarDivStyled = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

export const LogoSidebarDivStyled = styled.div`
  width: 66%;
  margin: 1.5rem 0;
  img {
    width: 100%;
  }
`;

export const IcoSidebarDivStyled = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 10px;
`;

export const SidebarMenuStyled = styled(NavLink)`
  display: flex;
  align-items: center;
  text-decoration: none;
  line-height: 24px;
  font-family: ${(props) => props.theme.fontFamily.Poppins};
  font-size: ${(props) => props.theme.fontSizes.sm};
  color: ${(props) => props.theme.colors.white};
  .active-link {
    color: yellow;
    font-size: 42px;
  }
`;
