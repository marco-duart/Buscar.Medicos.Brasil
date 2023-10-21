import styled from "styled-components";

export const HeaderStyled = styled.header`
  width: 100%;
  height: 11vh;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 15px;
`


export const HeaderIcoStyled = styled.img`
  width: 48px;
  height: 48px;
`

export const HeaderNameStyled = styled.div`
  font-size: ${props => props.theme.fontSizes.md};
  font-family: ${props => props.theme.fontFamily.Sora};
  font-weight: 600;
  color: ${props => props.theme.colors.darkGray100};
`


export const HeaderEmailStyled = styled.div`
  font-size: ${props => props.theme.fontSizes.sm};
  font-family: ${props => props.theme.fontFamily.Poppins};
  color: ${props => props.theme.colors.gray100};
`