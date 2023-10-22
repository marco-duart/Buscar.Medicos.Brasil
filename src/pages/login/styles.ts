import styled from "styled-components";
import backgrounImage from "../../assets/image/background.svg";

//DEFINIR UM MIN-H AND MIN-W

export const DivDFlexStyled = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const DivDFlexColumnStyled = styled.div`
  display: flex;
  flex-direction: column;
`;

export const LoginPageStyled = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;

  background-color: ${(props) => props.theme.colors.darkGreen};

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${backgrounImage});
    opacity: 0.3;
  }
`;

export const CardLoginStyled = styled.div`
  width: 35%;
  min-width: 400px;
  height: 73%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
  position: absolute;
  top: 13.5%;
  left: 32.5%;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: ${(props) => props.theme.radius.md};
`;

export const BlockLoginStyled = styled.div`
  width: 400px;
`;

export const SubtitleLoginStyled = styled.h3`
  font-size: ${(props) => props.theme.fontSizes.md};
  font-family: ${(props) => props.theme.fontFamily.Sora};
  color: ${(props) => props.theme.colors.gray600};
`;

export const TitleLoginStyled = styled.h1`
  font-size: ${(props) => props.theme.fontSizes.xxl};
  font-family: ${(props) => props.theme.fontFamily.Sora};
  color: ${(props) => props.theme.colors.darkGray100};
  font-weight: 700;
  margin-bottom: 20px;
`;

export const InputStyled = styled.input`
  width: 400px;
  height: 56px;
  border: 1px solid #e0e0e0;
  border-radius: ${(props) => props.theme.radius.sm};
  padding: 0 15px;
`;

export const InputSectionStyled = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

export const LabelStyled = styled.label`
  position: absolute;
  top: -15px;
  left: 12px;
  padding: 5px;
  font-size: ${(props) => props.theme.fontSizes.xsm};
  font-family: ${(props) => props.theme.fontFamily.Poppins};
  background-color: ${(props) => props.theme.colors.white};
`;

export const labelCheckboxStyled = styled.label`
  font-size: ${(props) => props.theme.fontSizes.sm};
  font-family: ${(props) => props.theme.fontFamily.Poppins};
  font-weight: 600;
  margin-left: 8px;
`;

//BOTÕES, PROVAVELMENTE MOVER PARA GLOBAL

export const ButtonStyled = styled.button`
  border: none;
  width: 400px;
  height: 56px;
  border-radius: ${(props) => props.theme.radius.sm};
  padding: 12px, 64px, 12px, 64px;
  background-color: ${(props) => props.theme.colors.darkGreen};
  color: ${(props) => props.theme.colors.white};
  font-size: ${(props) => props.theme.fontSizes.sm};
  font-weight: 600;
  cursor: pointer;
`;

//SIDEBAR LOGGEDUSER

export const ContainerLoggedUser = styled.div`
  min-height: 900px;
`;

export const ContentPageLoggedUser = styled.div`
  display: flex;
`;

export const ContentItemLoggedUser = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
`;

export const SideBarLoggedUser = styled.div`
  width: 330px;
`;

export const ButtonLoggedUser = styled.button`
  border: none;
  width: 330px;
  height: 69px;
  border-radius: 16px;
  background-color: ${(props) => props.theme.colors.darkGreen};
  font-size: ${(props) => props.theme.fontSizes.md};
  font-family: ${(props) => props.theme.fontFamily.Sora};
  color: ${(props) => props.theme.colors.white};
`;

//FORM LOGGEDUSER
export const FormSectionLoggedUser = styled.div`
  margin-left: 50px;
  min-width: 693px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const TitleLoggedUser = styled.div`
  font-size: ${(props) => props.theme.fontSizes.xxl};
  font-family: ${(props) => props.theme.fontFamily.Sora};
  color: ${(props) => props.theme.colors.darkGray100};
  font-weight: 600;
  margin-bottom: 30px;
`;

export const TitleTwoLoggedUser = styled.div`
  font-size: 30px;
  font-family: ${(props) => props.theme.fontFamily.Sora};
  color: ${(props) => props.theme.colors.darkGray100};
  font-weight: 700;
`;
export const SubTitleLoggedUser = styled.label`
  font-size: ${(props) => props.theme.fontSizes.md};
  font-family: ${(props) => props.theme.fontFamily.Poppins};
  color: ${(props) => props.theme.colors.darkGray100};
  font-weight: 600;
`;

export const ContentLoggedUser = styled.div`
  font-size: ${(props) => props.theme.fontSizes.md};
  font-family: ${(props) => props.theme.fontFamily.Poppins};
  color: #616161;
`;

export const LoggedUserIco = styled.button`
  border: none;
  background: none;
  padding: 0;
  visibility: hidden;
  img {
    visibility: visible;
    cursor: pointer;
  }
`;
