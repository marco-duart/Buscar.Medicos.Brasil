import { useState, useEffect, ReactNode } from "react";
import Modal from "react-modal";
import { DeletePlan, GetPlans } from "../../data/services/plans";
import { Table } from "../../components/shared/table";
import icons from "../../assets/styles/icons";
import { useNavigate } from "react-router-dom";
import * as S from "../../assets/styles/shared";
import Switch from "../../components/shared/toggle";

type PlansDataProcessedType = {
  name: string;
  value: number;
  enabled: ReactNode;
  actions: ReactNode;
};

const Plans = () => {
  // T HEADS
  const tableColumns = ["Título", "Valor", "Situação", "Ações"];
  //DADOS PROCESSADOS
  const [plansDataProcessed, setPlansDataProcessed] = useState<
    PlansDataProcessedType[]
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
    "MEDICO"
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

      const response = await GetPlans(
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
        const plan = {
          name: currentValue.planTitle,
          value: currentValue.values,
          enabled: (
            <S.LabelCheckboxFlex>
                <Switch
                  onToggle={handleCheckboxChange}
                  isActive={currentValue.enabled}
                  disabled={true}
                />
              <S.StatusCheckbox>{currentValue.enabled ? "Ativo" : "Inativo"}</S.StatusCheckbox>
            </S.LabelCheckboxFlex>
          ),
          actions: (
            <div>
              <S.TableIco
                onClick={() =>
                  navigate(`/home/plans/${currentValue.id}`, {
                    state: { action: "VIEW" },
                  })
                }
              >
                <img src={icons.details} />
              </S.TableIco>
              <S.TableIco
                onClick={() =>
                  navigate(`/home/plans/${currentValue.id}`, {
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
      }, [] as PlansDataProcessedType[]);
      //ATUALIZA COM TEMPDATA OU COM ARRAY VAZIO PARA LIDAR COM NULL E UNDEFINED
      setPlansDataProcessed(tempData ?? []);
    };
    fetchData();
  }, [searchValue, page, currentTab, setPlansDataProcessed]);

  const handleCheckboxChange = () => {
    //pensar
  };

  const handleDelete = async (id: number) => {
    await DeletePlan(id);
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
  };

  //SETANDO A PAGE COMO 0 AO MUDAR DE ABA
  const changeTab = (value: "CONTRATANTE" | "MEDICO") => {
    setPage(0);
    setCurrentTab(value);
  };

  return (
    <>
      <S.ContentRefil>
        <S.PageTitle>Planos</S.PageTitle>
        <S.TableButtonsTab>
          <S.TableButtonTab
            active={currentTab === "MEDICO" ? "ACTIVE" : ""}
            onClick={() => changeTab("MEDICO")}
          >
            Médicos
          </S.TableButtonTab>
          <S.TableButtonTab
            active={currentTab === "CONTRATANTE" ? "ACTIVE" : ""}
            onClick={() => changeTab("CONTRATANTE")}
          >
            Contratantes
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
                navigate(`/home/plans/new/${currentTab}`, {
                  state: { action: "NEW" },
                })
              }
            >
            <span>+</span> Novo plano
            </S.TableNewButton>
          </S.TableDFlexTab>
          <Table HeadColumns={tableColumns} BodyRow={plansDataProcessed} />
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

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Modal"
      >
        <button onClick={() => closeModal()}>close</button>
        <div>Tem certeza que deseja *excluir* este item?</div>
        <button
          onClick={() => {
            deleteItemId && handleDelete(deleteItemId);
          }}
        >
          Sim, excluir item
        </button>
        <button onClick={() => closeModal()}>Voltar</button>
      </Modal>
    </>
  );
};

export default Plans;
