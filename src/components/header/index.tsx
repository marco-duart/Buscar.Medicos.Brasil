import { useState, useEffect } from "react";
import { MeAPI } from "../../data/services/register";
import icons from "../../assets/styles/icons";
import * as S from "./styles"

type LoggedUser = {
  firstName: string;
  email: string;
};

const Header = () => {
  const [loggedUser, setLoggedUser] = useState<LoggedUser>();
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
  return (
    <S.HeaderStyled>
      <div><S.HeaderIcoStyled src={icons.user} alt="" /></div>
      <div>
      <S.HeaderNameStyled>${loggedUser?.firstName}</S.HeaderNameStyled>
      <S.HeaderEmailStyled>${loggedUser?.email}</S.HeaderEmailStyled>
      </div>
      <div>\/</div>
    </S.HeaderStyled>
  );
};

export default Header;
