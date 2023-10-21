import { useEffect, useState } from "react";
import { GetUsers } from "../../data/services/users";
import Table from "../../components/shared/table";
import { useNavigate } from "react-router-dom";
import * as S from "../../assets/styles/shared";

type UserDataProcessedType = {
  user: string;
  email: string;
  whatsapp: string;
  specialty: string;
  city: string;
  state: string;
  userType: string;
};

export const Users = () => {
  const size = 7;
  //T HEADS
  const tableColumns = [
    "Usuário",
    "E-mail",
    "WhatsApp",
    "Especialidade",
    "Cidade",
    "Estado",
    "Tipo de Usuário",
  ];
  //DADOS PROCESSADOS
  const [userDataProcessed, setUserDataProcessed] = useState<
    UserDataProcessedType[]
  >([]);
  //DADOS DO DASHBOARD
  const [dashboardData, setCountData] = useState<IDataUserCount>({
    total: 0,
    totalDoctors: 0,
    totalContractor: 0,
  });
  //PESQUISA
  const [searchValue, setSearchValue] = useState<string>("");
  //PAGINAÇÃO
  const [page, setPage] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [currentTotal, SetCurrentTotal] = useState<number>(0);
  const [offsetTotalItens, setOffsetTotalItens] = useState<number[]>([0, 0]);
  //FILTRO TODOS/MEDICO/CONTRATANTE
  const [currentTab, setCurrentTab] = useState<
    "TODOS" | "MEDICO" | "CONTRATANTE"
  >("TODOS");

  //TESTANDO
  const navigate = useNavigate();
  const toDetail = () => {
    navigate("/home/user/detail", { state: { data: userDataProcessed } });
  };

  useEffect(() => {
    const fetchData = async () => {
      const urlAPI = currentTab === "TODOS" ? "/users" : "/users/profile";
      const filterType = currentTab === "TODOS" ? "" : currentTab;

      const response = await GetUsers<IDataUserArray>(
        urlAPI,
        size,
        searchValue,
        undefined,
        page,
        undefined,
        filterType
      );
      const dashboardResponse = await GetUsers<IDataUserCount>("/users/count");
      if (dashboardResponse) {
        setCountData(dashboardResponse);
      }
      //SETANDO O TOTAL DE PAGINAS PARA DEFINIR A PAGINAÇÃO
      SetCurrentTotal(response?.totalElements ?? 0);
      setTotalPage(response?.totalPages ?? 0);
      setOffsetTotalItens([
        (response?.numberOfElements ?? 0) + (response?.pageable.offset ?? 0) ??
          0 ??
          0,
        response?.totalElements ?? 0,
      ]);
      //CRIANDO UM NOVO ARRAY DE OBJETOS ESPECÍFICO PARA O CASO
      const tempData = response?.content.reduce((accumulator, currentValue) => {
        const user = {
          user: currentValue.lastName,
          email: currentValue.email,
          whatsapp: currentValue.phone,
          specialty:
            currentValue.specialties.length > 0
              ? currentValue.specialties[0].name
              : " - ",
          city: currentValue.address ? currentValue.address.city : " - ",
          state: currentValue.address ? currentValue.address.state : " - ",
          userType:
            currentValue.profiles.length > 0
              ? currentValue.profiles[0].name
              : " - ",
        };
        return [...accumulator, user];
      }, [] as UserDataProcessedType[]);
      //ATUALIZA COM TEMPDATA OU COM ARRAY VAZIO PARA LIDAR COM NULL E UNDEFINED
      setUserDataProcessed(tempData ?? []);
    };
    fetchData();
  }, [searchValue, page, currentTab, setCountData, setUserDataProcessed]);

  //SETANDO A PAGE COMO 0 AO MUDAR DE ABA
  const changeTab = (value: "TODOS" | "CONTRATANTE" | "MEDICO") => {
    setPage(0);
    setCurrentTab(value);
  };

  return (
    <S.ContentRefil>
      <S.PageTitle>Usuários Cadastrados | Todos</S.PageTitle>
      <S.TableButtonsTab>
        <S.TableButtonTab
          active={currentTab === "TODOS" ? "ACTIVE" : ""}
          onClick={() => changeTab("TODOS")}
        >
          Todos <span>{dashboardData.total}</span>
        </S.TableButtonTab>
        <S.TableButtonTab
          active={currentTab === "CONTRATANTE" ? "ACTIVE" : ""}
          onClick={() => changeTab("CONTRATANTE")}
        >
          Contratantes <span>{dashboardData.totalContractor}</span>
        </S.TableButtonTab>
        <S.TableButtonTab
          active={currentTab === "MEDICO" ? "ACTIVE" : ""}
          onClick={() => changeTab("MEDICO")}
        >
          Médicos <span>{dashboardData.totalDoctors}</span>
        </S.TableButtonTab>
      </S.TableButtonsTab>
      <S.TableContainer>
        <S.TableDFlexTab>
          <S.TableSearchInput
            type="text"
            placeholder="Pesquise uma palavra-chave"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              setPage(0);
            }}
          />
          <div>
            <S.TableCountText>Total de usuários</S.TableCountText>
            <S.TableCountValue>{currentTotal}</S.TableCountValue>
          </div>
        </S.TableDFlexTab>
        <Table HeadColumns={tableColumns} BodyRow={userDataProcessed} />
        <S.TableDFlexTab>
          <S.PageCountOffset>
            {offsetTotalItens[0]} de {offsetTotalItens[1]}
          </S.PageCountOffset>
          <S.TableButtonsTab>
            <div>
              <S.PageCountButton onClick={() => page > 0 && setPage(page - 1)}>
                ⮜
              </S.PageCountButton>
            </div>
            {Array.from(
              { length: 4 },
              (_, index) =>
                page + index < totalPage && (
                  <span key={index}>
                    <S.PageCountButton onClick={() => setPage(page + index)}>
                      {page + index + 1}
                    </S.PageCountButton>
                  </span>
                )
            )}
            <div>
              <S.PageCountButton
                onClick={() => page < totalPage - 1 && setPage(page + 1)}
              >
                ⮞
              </S.PageCountButton>
            </div>
          </S.TableButtonsTab>
        </S.TableDFlexTab>
        <div>
          <button onClick={() => toDetail()}>UseNavigate</button>
        </div>
      </S.TableContainer>
    </S.ContentRefil>
  );
};

export default Users;
