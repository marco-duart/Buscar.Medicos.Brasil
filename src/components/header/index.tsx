import { useState, useEffect } from "react";
import { MeAPI } from "../../data/services/register";
import icons from "../../assets/styles/icons";
import * as S from "./styles";
import { useNavigate } from "react-router-dom";

type LoggedUser = {
  firstName: string;
  email: string;
};

const Header = () => {
  //STATE DO USUÁRIO LOGADO
  const [loggedUser, setLoggedUser] = useState<LoggedUser>();
  //STATE DO MENU SUSPENSO/CASCATA
  const [isOpen, setIsOpen] = useState<boolean>(false);
  //USADO PARA REDIRECIONAR NO CASO DE DESLOGUE
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response: IMeAPI | null = await MeAPI();
      if (response) {
        const { firstName, email } = response;
        setLoggedUser({ firstName, email });
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <S.HeaderStyled>
      <div>
        <S.HeaderIcoStyled src={icons.user} alt="" />
      </div>
      <div>
        <S.HeaderNameStyled>{loggedUser?.firstName}</S.HeaderNameStyled>
        <S.HeaderEmailStyled>{loggedUser?.email}</S.HeaderEmailStyled>
      </div>
      <div>
        <S.CascadingMenu>
          <S.MenuButton onClick={() => setIsOpen(!isOpen)}>▼</S.MenuButton>
          {isOpen && (
            <S.Dropdown isOpen={isOpen}>
              <S.DropdownItem>
                <S.DropdownLinkItem to="/home/me">
                  <img src={icons.loggedUser} alt="" />
                  Usuário
                </S.DropdownLinkItem>
              </S.DropdownItem>
              <S.HrStyled />
              <S.DropdownItem onClick={handleLogout}>
                <img src={icons.logout} alt="" />
                Sair
              </S.DropdownItem>
            </S.Dropdown>
          )}
        </S.CascadingMenu>
      </div>
    </S.HeaderStyled>
  );
};

export default Header;
