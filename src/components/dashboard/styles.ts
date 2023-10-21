import styled from "styled-components";

export const DFlexColumnStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
`;

export const DFlexRowStyled = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
`;

export const ContainerCountStyled = styled.div`
  width: 100%;
  min-height: 180px;
  height: 220px;
  padding: 20px;
  border-radius: ${(props) => props.theme.radius.md};
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.white};
  box-shadow: 0px 7px 30px 0px #bbc0cd66;
`;

export const CardsSectionCountStyled = styled.div`
  width: 100%;
  border-radius: ${(props) => props.theme.radius.md};
  display: flex;
  gap: 15px;
`;
export const CardsTitleCountStyled = styled.div`
  font-size: ${(props) => props.theme.fontSizes.md};
  font-family: ${(props) => props.theme.fontFamily.Sora};
  color: ${(props) => props.theme.colors.darkGray100};
  font-weight: 600;
  margin-bottom: 5px;
`;

export const CardsCountStyled = styled.div`
  min-width: 250px;
  width: 289px;
  min-height: 110px;
  height: 128px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${(props) => props.theme.radius.md};
  background-color: ${(props) => props.theme.colors.gray300};
`;

//PROP PELO STYLED COMPONENTS
export const CardIcoStyled = styled("div")<{ headerStyle: string }>`
  width: 80px;
  height: 80px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background-color: ${(props) => props.headerStyle};
`;

export const CardsTitleStyled = styled.div`
  font-size: ${(props) => props.theme.fontSizes.sm};
  font-family: ${(props) => props.theme.fontFamily.Sora};
  color: ${(props) => props.theme.colors.gray100};
`;

export const CardsValueStyled = styled.div`
  font-size: ${(props) => props.theme.fontSizes.xl};
  font-family: ${(props) => props.theme.fontFamily.Sora};
  color: ${(props) => props.theme.colors.darkGray100};
  font-weight: 600;
`;
