import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { GetNotifications } from "../data/services/notifications";
import { Table } from "../components/shared/table";
import See from "../assets/icon/eye-off-line.svg";
import Edit from "../assets/icon/eye-off-line.svg";
import Delete from "../assets/icon/eye-off-line.svg";
import { useNavigate, useParams } from "react-router-dom";

type NotificationsDataProcessedType = {
  name: string;
  dataEnvio: string;
  actions: ReactNode;
};

const Notifications = () => {
  // T HEADS
  const tableColumns = ["Título", "Data de envio", "Ações"];
  //DADOS PROCESSADOS
  const [notificationsDataProcessed, setPlansDataProcessed] = useState<
    NotificationsDataProcessedType[]
  >([]);
  //PESQUISA
  const [searchValue, setSearchValue] = useState<string>("");
  //PAGINAÇÃO
  const [page, setPage] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);
  const navigate = useNavigate();
  //FILTRO TODOS/MEDICO/CONTRATANTE
  const [currentTab, setCurrentTab] = useState<
    "MEDICO" | "CONTRATANTE"
  >("CONTRATANTE");

  useEffect(() => {
    const fetchData = async () => {
      //TIPO RECEBE O VALOR DE CURRENTTAB
      const filterType = currentTab

      const response = await GetNotifications(7, searchValue, undefined, page, undefined, filterType);
      //SETANDO O TOTAL DE PAGINAS PARA DEFINIR A PAGINAÇÃO
      setTotalPage(response?.totalPages ?? 0);
      //CRIANDO UM NOVO ARRAY DE OBJETOS ESPECÍFICO PARA O CASO
      const tempData = response?.content.reduce((accumulator, currentValue) => {
        const plan = {
          name: currentValue.title,
          dataEnvio: currentValue.sendingDate,
          actions: (
            <div>
              <button
                onClick={() =>
                  navigate(`especialidades/visualizar/${currentValue.id}`)
                }
              >
                <img src={See} />
              </button>
              <button
                onClick={() =>
                  navigate(`especialidades/editar/${currentValue.id}`)
                }
              >
                <img src={Edit} />
              </button>
              <button onClick={() => {}}>
                <img src={Delete} />
              </button>
            </div>
          ),
        };
        return [...accumulator, plan];
      }, [] as NotificationsDataProcessedType[]);
      //ATUALIZA COM TEMPDATA OU COM ARRAY VAZIO PARA LIDAR COM NULL E UNDEFINED
      setPlansDataProcessed(tempData ?? []);
    };
    fetchData();
  }, [searchValue, page, currentTab, setPlansDataProcessed]);

  return (
    <>
      <div>
        <button onClick={() => setCurrentTab("CONTRATANTE")}>Contratantes</button>
        <button onClick={() => setCurrentTab("MEDICO")}>Médicos</button>
      </div>
      <input
        type="text"
        placeholder="Pesquise uma palavra-chave"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <Table HeadColumns={tableColumns} BodyRow={notificationsDataProcessed} />
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
    </>
  );
};

export default Notifications;
