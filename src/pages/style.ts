import styled from "styled-components";

export const SectionNewsDashStyled = styled.div`
  min-width: 500;
  width: 586px;
  min-height: 400;
  height: 464px;
  padding: 30px;
  border-radius: ${props => props.theme.radius.md};
  background-color: ${props => props.theme.colors.darkGreen};
`

export const DivDFlexEndStyled = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`

export const RelativeDivDashStyled = styled.div`
  position: relative;
`

export const AbsoluteImageDashStyled = styled.img`
  position: absolute;
  top: -10px;
  left: 10px;
`

