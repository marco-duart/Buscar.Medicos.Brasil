import { useState, useEffect, ReactNode } from "react";
import { DeletePlan, GetPlans, PutPlan } from "../../data/services/plans";
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
  //FORÇAR A RENDERIZAÇÃO APÓS O CHECKBOX ****GAMBIARRA PERDE FEIO PRA ISSO***** MAS TENHO POUCAS HORAS
  const [checkboxState, setCheckboxState] = useState(false);

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
                onToggle={() =>
                  handleCheckboxChange(
                    currentValue.id,
                    currentValue.planTitle,
                    !currentValue.enabled,
                    currentValue.period,
                    currentValue.type,
                    currentValue.values
                  )
                }
                isActive={currentValue.enabled}
              />
              <S.StatusCheckbox>
                {currentValue.enabled ? "Ativo" : "Inativo"}
              </S.StatusCheckbox>
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
  }, [checkboxState, searchValue, page, currentTab, setPlansDataProcessed]);

  const handleCheckboxChange = async (
    id: number,
    title: string,
    enabled: boolean,
    period: string,
    type: string,
    values: number
  ) => {
    const response = await PutPlan(id, title, enabled, period, type, values);
    console.log(response);
    setCheckboxState(!checkboxState);
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

      <S.ModalEditDelete
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Modal"
      >
        <S.ModalCloseDiv>
          <button onClick={() => closeModal()}>X</button>
        </S.ModalCloseDiv>
        <S.ModalContainer>
          <S.ModalMessage>
            Tem certeza que deseja <span>excluir</span> este item?
          </S.ModalMessage>
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

export default Plans;
