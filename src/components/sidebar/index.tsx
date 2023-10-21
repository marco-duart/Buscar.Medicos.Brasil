import logo from "../../assets/icon/logo.svg"
import * as S from "./styles"
import icons from "../../assets/styles/icons";

const Sidebar = () => {
    return (
        <S.SideBarColumnStyled>
            <S.LogoSidebarDivStyled><img src={logo} alt="" /></S.LogoSidebarDivStyled>
            <S.SideBarDivStyled>
                <div><S.SidebarMenuStyled to="/home/"><S.IcoSidebarDivStyled src={icons.dash} alt="" />Dashboard</S.SidebarMenuStyled></div>
                <div><S.SidebarMenuStyled to="/home/users"><S.IcoSidebarDivStyled src={icons.users} alt="" />Usuarios Cadastrados</S.SidebarMenuStyled></div>
                <div><S.SidebarMenuStyled to="/home/plans"><S.IcoSidebarDivStyled src={icons.plans} alt="" />Planos</S.SidebarMenuStyled></div>
                <div><S.SidebarMenuStyled to="/home/specialties"><S.IcoSidebarDivStyled src={icons.spec} alt="" />Especialidades</S.SidebarMenuStyled></div>
                <div><S.SidebarMenuStyled to="/home/notifications"><S.IcoSidebarDivStyled src={icons.notif} alt="" />Notificações</S.SidebarMenuStyled></div>
                <div><S.SidebarMenuStyled to="/home/faq"><S.IcoSidebarDivStyled src={icons.faq} alt="" />FAQ</S.SidebarMenuStyled></div>
            </S.SideBarDivStyled>
        </S.SideBarColumnStyled>
    )
}

export default Sidebar