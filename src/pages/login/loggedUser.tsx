import { useState, useEffect } from "react";
import { MeAPI } from "../../data/services/register";
import * as S from "./styles";
import icons from "../../assets/styles/icons";

const LoggedUser = () => {
  const [currentUser, setCurrentUser] = useState<IMeAPI>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tempData = await MeAPI();
        if (tempData) {
          setCurrentUser(tempData);
        }
      } catch (error) {}
    };
    fetchData();
  }, []);

  return (
    <S.ContainerLoggedUser>
      <S.TitleLoggedUser>Perfil</S.TitleLoggedUser>
      <S.ContentPageLoggedUser>
        <S.SideBarLoggedUser>
          <div>
            <S.ButtonLoggedUser>Dados</S.ButtonLoggedUser>
          </div>
        </S.SideBarLoggedUser>
        <S.FormSectionLoggedUser>
          <S.TitleTwoLoggedUser>Dados</S.TitleTwoLoggedUser>
          <div>
            <S.ContentItemLoggedUser>
              <S.SubTitleLoggedUser htmlFor="">Nome</S.SubTitleLoggedUser>
              <S.ContentLoggedUser>
                {currentUser?.firstName}
              </S.ContentLoggedUser>
              <S.LoggedUserIco>
                <img src={icons.edit} alt="" />
              </S.LoggedUserIco>
            </S.ContentItemLoggedUser>
            <hr />
            <S.ContentItemLoggedUser>
              <S.SubTitleLoggedUser htmlFor="">E-mail</S.SubTitleLoggedUser>
              <S.ContentLoggedUser>{currentUser?.email}</S.ContentLoggedUser>
              <S.LoggedUserIco>
                <img src={icons.edit} alt="" />
              </S.LoggedUserIco>
            </S.ContentItemLoggedUser>
            <hr />
          </div>
        </S.FormSectionLoggedUser>
      </S.ContentPageLoggedUser>
    </S.ContainerLoggedUser>
  );
};

export default LoggedUser;
