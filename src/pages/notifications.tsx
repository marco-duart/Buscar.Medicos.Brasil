import {
  useState,
  useEffect,
  ReactNode,
} from "react";
import Modal from 'react-modal';
import { DeleteNotification, GetNotifications } from "../data/services/notifications";
import { Table } from "../components/shared/table";
import See from "../assets/icon/eye-off-line.svg";
import Edit from "../assets/icon/eye-off-line.svg";
import Delete from "../assets/icon/eye-off-line.svg";
import { useNavigate } from "react-router-dom";

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
  //FILTRO TODOS/MEDICO/CONTRATANTE
  const [currentTab, setCurrentTab] = useState<
    "MEDICO" | "CONTRATANTE"
  >("CONTRATANTE");
  //DEFININDO O NAVIGATE
  const navigate = useNavigate();
  //MODAL
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  //ID DO ITEM PARA DELETAR
  const [deleteItemId, setDeleteItemId] = useState<number | null>(null);

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
                  navigate(`/home/notifications/${currentValue.id}`, {
                    state: { action: "VIEW" },
                  })
                }
              >
                <img src={See} />
              </button>
              <button
                onClick={() =>
                  navigate(`/home/notifications/${currentValue.id}`, {
                    state: { action: "EDIT" },
                  })
                }
              >
                <img src={Edit} />
              </button>
              <button onClick={() => openModal(currentValue.id)}>
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

  const handleDelete = async (id: number) => {
    await DeleteNotification(id);
    closeModal()
    setPage(0);
  };

  //FUNÇÕES OPEN/CLOSE MODAL
  const openModal = (id: number) => {
    setDeleteItemId(id);
    setIsOpen(true);
  }
  const closeModal = () => {
    setDeleteItemId(null);
    setIsOpen(false);
  }

  //SETANDO A PAGE COMO 0 AO MUDAR DE ABA
  const changeTab = (value: "CONTRATANTE" | "MEDICO") => {
    setPage(0)
    setCurrentTab(value)
  }

  return (
    <>
      <div>
        <button onClick={() => changeTab("CONTRATANTE")}>Contratantes</button>
        <button onClick={() => changeTab("MEDICO")}>Médicos</button>
      </div>
      <input
        type="text"
        placeholder="Pesquise uma palavra-chave"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <button
            onClick={() =>
              navigate(`/home/notifications/new/${currentTab}`, { state: { action: "NEW" } })
            }
          >
            Nova Notificação
          </button>
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
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Modal"
      >
        <button onClick={() => closeModal()}>close</button>
        <div>Tem certeza que deseja *excluir* este item?</div>
        <button onClick={() => {deleteItemId && handleDelete(deleteItemId)}}>Sim, excluir item</button>
        <button onClick={() => closeModal()}>Voltar</button>
      </Modal>
    </>
  );
};

export default Notifications;
