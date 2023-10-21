import { Outlet } from "react-router-dom";
import * as S from "./styles";
import Header from "../header";
import Sidebar from "../sidebar";

const BaseLayout = () => {
  return (
    <S.BaseLayoutPageStyled>
      <S.BaseLayoutSidebarStyled>
        <Sidebar />
      </S.BaseLayoutSidebarStyled>
      <S.BaseLayoutDivStyled>
        <Header />
        <Outlet />
      </S.BaseLayoutDivStyled>
    </S.BaseLayoutPageStyled>
  );
};

export default BaseLayout;
