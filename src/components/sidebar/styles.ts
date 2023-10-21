import styled from "styled-components";
import { NavLink } from 'react-router-dom';



export const SideBarColumnStyled = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 274px; //14.3%
  height: 100%;
  background-color: ${props => props.theme.colors.darkGreen};
`

export const SideBarDivStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

export const LogoSidebarDivStyled = styled.div`
  width: 66%;
  margin: 1.5rem 0;
  img {
    width: 100%;
  }
`

export const IcoSidebarDivStyled = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 10px;
`

export const SidebarMenuStyled = styled(NavLink)`
  display: flex;
  align-items: center;
  text-decoration: none;
  line-height: 24px;
  font-family: ${props => props.theme.fontFamily.Poppins};
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.white};
  .active-link {
    color: yellow;
    font-size: 42px;
  }
`


/* style={({ isActive}) => { return { color: isActive ? ${props => props.theme.colors.yellowGreen} : "",};}} */