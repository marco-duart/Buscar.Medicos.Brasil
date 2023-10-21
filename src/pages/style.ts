import { Link } from "react-router-dom";
import styled from "styled-components";

export const ContainerDashStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  background-color: ${(props) => props.theme.colors.white100};
`;

export const SectionNewsDashStyled = styled.div`
  width: 586px;
  height: 464px;
  padding: 30px;
  border-radius: ${(props) => props.theme.radius.md};
  background-color: ${(props) => props.theme.colors.darkGreen};
`;

export const DivDFlexStyled = styled.div`
  width: 100%;
  display: flex;
  gap: 15px;
`;
//DASH NEWS
export const DivDFlexEndStyled = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;
export const DivDFlexCenterStyled = styled.div`
  width: 188px;
  height: 40px;
  border-radius: ${(props) => props.theme.radius.xm};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
  gap: 5px;
  background-color: ${(props) => props.theme.colors.lightGreen200};
  color: ${(props) => props.theme.colors.white};
  font-size: ${(props) => props.theme.fontSizes.xsm};
  font-family: ${(props) => props.theme.fontFamily.Poppins};
`;

export const RelativeDivDashStyled = styled.div`
  position: relative;
`;

export const AbsoluteImageDashStyled = styled.img`
  position: absolute;
  top: -10px;
  left: 10px;
`;

export const TitleDashStyled = styled.h3`
  color: ${(props) => props.theme.colors.white};
  font-size: ${(props) => props.theme.fontSizes.xxl};
  font-family: ${(props) => props.theme.fontFamily.Sora};
  font-weight: 700;
`;

export const ContentDashStyled = styled.p`
  color: ${(props) => props.theme.colors.white200};
  font-size: ${(props) => props.theme.fontSizes.md};
  font-family: ${(props) => props.theme.fontFamily.Sora};
`;
//DASH COUNT
export const CountDashStyled = styled.div`
  width: 979px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
//DASH TABLE

export const DFlexStyled = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const TableDashStyled = styled.div`
  width: 1582px;
  padding: 30px;
  border-radius: ${(props) => props.theme.radius.md};
  background-color: ${(props) => props.theme.colors.white};
  box-shadow: 0px 7px 30px 0px #bbc0cd66;
`;

export const TableDashTitleStyled = styled.div`
  font-size: ${(props) => props.theme.fontSizes.md};
  font-family: ${(props) => props.theme.fontFamily.Sora};
  color: ${(props) => props.theme.colors.darkGray100};
  font-weight: 600;
  margin-bottom: 15px;
`;

export const TableDashLinkStyled = styled(Link)`
  text-decoration: none;
  font-size: ${(props) => props.theme.fontSizes.sm};
  font-family: ${(props) => props.theme.fontFamily.Sora};
  color: ${(props) => props.theme.colors.darkBlue};
  cursor: pointer;
`;
