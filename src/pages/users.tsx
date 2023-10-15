import { useEffect, useState } from "react";
import { GetUsers } from "../data/services/users";
import Table from "../components/shared/table";

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
  //PESQUISA
  const [searchValue, setSearchValue] = useState<string>("");
  //PAGINAÇÃO
  const [page, setPage] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);
  //FILTRO TODOS/MEDICO/CONTRATANTE
  const [currentTab, setCurrentTab] = useState<
    "TODOS" | "MEDICO" | "CONTRATANTE"
  >("TODOS");


  useEffect(() => {
    const fetchData = async () => {
      const urlAPI = currentTab === "TODOS" ? "/users" : "/users/profile"
      const filterType = currentTab === "TODOS" ? "" : currentTab
      
      const response = await GetUsers<IDataUserArray>(
        urlAPI,
        6,
        searchValue,
        undefined,
        page,
        undefined,
        filterType
      );
      //SETANDO O TOTAL DE PAGINAS PARA DEFINIR A PAGINAÇÃO
      setTotalPage(response?.totalPages ?? 0);
      //CRIANDO UM NOVO ARRAY DE OBJETOS ESPECÍFICO PARA O CASO
      const tempData = response?.content.reduce((accumulator, currentValue) => {
        const user = {
          user: currentValue.lastName,
          email: currentValue.email,
          whatsapp: currentValue.phone,
          specialty:
            currentValue.specialties.length > 0
              ? currentValue.specialties[0].name
              : "",
          city: currentValue.address ? currentValue.address.city : " - ",
          state: currentValue.address ? currentValue.address.state : " - ",
          userType:
            currentValue.profiles.length > 0
              ? currentValue.profiles[0].name
              : "",
        };
        return [...accumulator, user];
      }, [] as UserDataProcessedType[]);
      //ATUALIZA COM TEMPDATA OU COM ARRAY VAZIO PARA LIDAR COM NULL E UNDEFINED
      setUserDataProcessed(tempData ?? []);
    };
    fetchData();
  }, [searchValue, page, currentTab, setUserDataProcessed]);

  return (
    <div>
      <div>
        <button onClick={() => setCurrentTab("TODOS")}>Todos</button>
        <button onClick={() => setCurrentTab("CONTRATANTE")}>
          Contratantes
        </button>
        <button onClick={() => setCurrentTab("MEDICO")}>Médicos</button>
      </div>
      <input
        type="text"
        placeholder="Pesquise uma palavra-chave"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <Table HeadColumns={tableColumns} BodyRow={userDataProcessed} />
      <div>
        {page > 0 && <button onClick={() => setPage(page - 1)}>←</button>}
      </div>
      {Array.from(
        { length: 4 },
        (_, index) =>
          page + index + 1 < totalPage && (
            <div key={index}>
              <button onClick={() => setPage(page + index + 1)}>
                {page + index + 2}
              </button>
            </div>
          )
      )}
      <div>
        {page < totalPage - 1 && (
          <button onClick={() => setPage(page + 1)}>→</button>
        )}
      </div>
    </div>
  );
};

export default Users;
