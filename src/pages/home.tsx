import { useState, useEffect } from "react";
import { GetUsers } from "../data/services/users";
import { CountDashboard } from "../components/dashboard/countDashboard";
import { TableDashboard } from "../components/dashboard/tableDashboard";
import icons from "../assets/styles/icons";
import * as S from "./style";
import woman from "../assets/image/woman.svg";
import elipse from "../assets/image/Ellipse.svg";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const Home = () => {
  //DATA FORMATADA USANDO O DATE-FNS
  const formatCurrentDate = () => {
    const currentDate = new Date();
    const formattedDate = format(currentDate, "dd 'de' MMMM 'de' yyyy", {
      locale: ptBR,
    });
    return formattedDate;
  };
  const formatedDate = formatCurrentDate();
  //VERIFICAR O PROBLEMA COM ESSA TIPAGEM
  const [dashboardData, setDashboardData] = useState<IDataUserDashboard>({
    doctor: {
      total: 0,
      available: 0,
      unavailable: 0,
    },
    contractor: {
      total: 0,
      available: 0,
      unavailable: 0,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const dashboardResponse = await GetUsers<IDataUserDashboard>(
        "/users/dashboard"
      );
      if (dashboardResponse) {
        setDashboardData(dashboardResponse);
      }
    };
    fetchData();
  }, []);

  return (
    <S.ContainerDashStyled>
      <S.DivDFlexStyled>
        <S.SectionNewsDashStyled>
          <S.DivDFlexEndStyled>
            <S.RelativeDivDashStyled>
              <img src={elipse} alt="" />
              <S.AbsoluteImageDashStyled src={woman} alt="" />
            </S.RelativeDivDashStyled>
          </S.DivDFlexEndStyled>
          <S.DivDFlexCenterStyled>
            <img src={icons.calendar} alt="" />
            {formatedDate}
          </S.DivDFlexCenterStyled>
          <div>
            <S.TitleDashStyled>Seja bem vindo!</S.TitleDashStyled>
            <S.ContentDashStyled>
              Neste painel você poderá administrar seu site de forma simples e
              prática.
            </S.ContentDashStyled>
          </div>
        </S.SectionNewsDashStyled>
        <S.CountDashStyled>
          <CountDashboard
            title="Médicos"
            data={dashboardData.doctor}
            types={["Total", "Disponíveis", "Indisponíveis"]}
          />
          <CountDashboard
            title="Contratantes"
            data={dashboardData.contractor}
            types={["Total", "Ativos", "Inativos"]}
          />
        </S.CountDashStyled>
      </S.DivDFlexStyled>
      <S.TableDashStyled>
        <S.DFlexStyled>
          <S.TableDashTitleStyled>
            Últimos usuários cadastrados
          </S.TableDashTitleStyled>
          <div>
            <S.TableDashLinkStyled to="/home/users">
              Ver tudo ➔
            </S.TableDashLinkStyled>
          </div>
        </S.DFlexStyled>
        <TableDashboard />
      </S.TableDashStyled>
    </S.ContainerDashStyled>
  );
};

export default Home;
