import logo from "../../assets/icon/logo.svg";
import * as S from "./styles";
import icons from "../../assets/styles/icons";
import { useState } from "react";

const Sidebar = () => {
  const [expanded, setExpanded] = useState<boolean>(true);
  return (
    <S.SideBarColumnStyled expanded={expanded}>
      <S.LogoSidebarDivStyled>
        {expanded && <img src={logo} alt="" />}
        <S.SideIcoDiv>
          <S.SidebarIco onClick={() => setExpanded(!expanded)}>
            <img src={icons.deft} alt="" />
          </S.SidebarIco>
        </S.SideIcoDiv>
      </S.LogoSidebarDivStyled>
      <S.SideBarDivStyled>
        <div>
          <S.SidebarMenuStyled expanded={expanded} to="/home/">
            <S.IcoSidebarDivStyled src={icons.dash} alt="" />
            {expanded && "Dashboard"}
          </S.SidebarMenuStyled>
        </div>
        <div>
          <S.SidebarMenuStyled expanded={expanded} to="/home/users">
            <S.IcoSidebarDivStyled src={icons.users} alt="" />
            {expanded && "Usuarios Cadastrados"}
          </S.SidebarMenuStyled>
        </div>
        <div>
          <S.SidebarMenuStyled expanded={expanded} to="/home/plans">
            <S.IcoSidebarDivStyled src={icons.plans} alt="" />
            {expanded && "Planos"}
          </S.SidebarMenuStyled>
        </div>
        <div>
          <S.SidebarMenuStyled expanded={expanded} to="/home/specialties">
            <S.IcoSidebarDivStyled src={icons.spec} alt="" />
            {expanded && "Especialidades"}
          </S.SidebarMenuStyled>
        </div>
        <div>
          <S.SidebarMenuStyled expanded={expanded} to="/home/notifications">
            <S.IcoSidebarDivStyled src={icons.notif} alt="" />
            {expanded && "Notificações"}
          </S.SidebarMenuStyled>
        </div>
        <div>
          <S.SidebarMenuStyled expanded={expanded} to="/home/faq">
            <S.IcoSidebarDivStyled src={icons.faq} alt="" />
            {expanded && "FAQ"}
          </S.SidebarMenuStyled>
        </div>
      </S.SideBarDivStyled>
    </S.SideBarColumnStyled>
  );
};

export default Sidebar;
