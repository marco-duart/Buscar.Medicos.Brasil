import { useState, useEffect, ReactNode } from "react";
import { GetNotifications, DeleteNotification } from "../../data/services/notifications";
import { Table } from "../../components/shared/table";
import icons from "../../assets/styles/icons";
import { useNavigate } from "react-router-dom";
import * as S from "../../assets/styles/shared";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

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
  const size = 7;
  const [page, setPage] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [offsetTotalItens, setOffsetTotalItens] = useState<number[]>([0, 0]);
  //FILTRO TODOS/MEDICO/CONTRATANTE
  const [currentTab, setCurrentTab] = useState<"MEDICO" | "CONTRATANTE">(
    "CONTRATANTE"
  );
  //DEFININDO O NAVIGATE
  const navigate = useNavigate();
  //MODAL
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  //ID DO ITEM PARA DELETAR
  const [deleteItemId, setDeleteItemId] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      //TIPO RECEBE O VALOR DE CURRENTTAB
      const filterType = currentTab;

      const response = await GetNotifications(
        size,
        searchValue,
        undefined,
        page,
        undefined,
        filterType
      );
      //SETANDO O TOTAL DE PAGINAS PARA DEFINIR A PAGINAÇÃO
      setTotalPage(response?.totalPages ?? 0);
      setOffsetTotalItens([
        (response?.numberOfElements ?? 0) + (response?.pageable.offset ?? 0) ??
          0 ??
          0,
        response?.totalElements ?? 0,
      ]);
      //CRIANDO UM NOVO ARRAY DE OBJETOS ESPECÍFICO PARA O CASO
      const tempData = response?.content.reduce((accumulator, currentValue) => {
        const data = parseISO(currentValue.sendingDate);
        const dataFormatada = format(data, "dd/MM/yyyy", { locale: ptBR });
        const plan = {
          name: currentValue.title,
          dataEnvio: dataFormatada,
          actions: (
            <div>
              <S.TableIco
                onClick={() =>
                  navigate(`/home/notifications/${currentValue.id}`, {
                    state: { action: "VIEW" },
                  })
                }
              >
                <img src={icons.details} />
              </S.TableIco>
              <S.TableIco
                onClick={() =>
                  navigate(`/home/notifications/${currentValue.id}`, {
                    state: { action: "EDIT" },
                  })
                }
              >
                <img src={icons.edit} />
              </S.TableIco>
              <S.TableIco onClick={() => openModal(currentValue.id)}>
                <img src={icons.delet} />
              </S.TableIco>
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
    closeModal();
    setPage(0);
  };

  //FUNÇÕES OPEN/CLOSE MODAL
  const openModal = (id: number) => {
    setDeleteItemId(id);
    setIsOpen(true);
  };
  const closeModal = () => {
    setDeleteItemId(null);
    setIsOpen(false);
    setPage(0);
  };

  //SETANDO A PAGE COMO 0 AO MUDAR DE ABA
  const changeTab = (value: "CONTRATANTE" | "MEDICO") => {
    setPage(0);
    setCurrentTab(value);
  };

  return (
    <>
      <S.ContentRefil>
        <S.PageTitle>Notificações</S.PageTitle>
        <S.TableButtonsTab>
          <S.TableButtonTab
            active={currentTab === "CONTRATANTE" ? "ACTIVE" : ""}
            onClick={() => changeTab("CONTRATANTE")}
          >
            Contratantes
          </S.TableButtonTab>
          <S.TableButtonTab
            active={currentTab === "MEDICO" ? "ACTIVE" : ""}
            onClick={() => changeTab("MEDICO")}
          >
            Médicos
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
            <S.TableNewButton
              onClick={() =>
                navigate(`/home/notifications/new/${currentTab}`, {
                  state: { action: "NEW" },
                })
              }
            >
              <span>+</span> Nova Notificação
            </S.TableNewButton>
          </S.TableDFlexTab>
          <Table
            HeadColumns={tableColumns}
            BodyRow={notificationsDataProcessed}
          />
          <S.TableDFlexTab>
            <S.PageCountOffset>
              {offsetTotalItens[0]} de {offsetTotalItens[1]}
            </S.PageCountOffset>
            <S.TableButtonsTab>
              <div>
                <S.PageCountButton
                  onClick={() => page > 0 && setPage(page - 1)}
                >
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
        </S.TableContainer>
      </S.ContentRefil>

      <S.ModalEditDelete
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Modal"
      >
        <S.ModalCloseDiv><button onClick={() => closeModal()}>X</button></S.ModalCloseDiv>
        <S.ModalContainer>
          <S.ModalMessage>Tem certeza que deseja <span>excluir</span> este item?</S.ModalMessage>
          <S.ModalButton
            onClick={() => {
              deleteItemId && handleDelete(deleteItemId);
            }}
          >
            Sim, excluir item
          </S.ModalButton>
          <S.ModalLink onClick={() => closeModal()}>Voltar</S.ModalLink>
        </S.ModalContainer>
      </S.ModalEditDelete>
    </>
  );
};

export default Notifications;
