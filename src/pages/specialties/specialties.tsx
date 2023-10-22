import { ReactNode, useEffect, useState } from "react";
import Modal from "react-modal";
import {
  DeleteSpecialty,
  GetSpecialties,
} from "../../data/services/specialties";
import { Table } from "../../components/shared/table";
import icons from "../../assets/styles/icons";
import { useNavigate } from "react-router-dom";
import * as S from "../../assets/styles/shared";
import Switch from "../../components/shared/toggle";

type SpecialtiesDataProcessedType = {
  name: string;
  enabled: ReactNode;
  actions: ReactNode;
};

const Specialties = () => {
  // T HEADS
  const tableColumns = ["Nome especialidade", "Situação", "Ações"];
  //DADOS PROCESSADOS
  const [specialtiesDataProcessed, setSpecialtiesDataProcessed] = useState<
    SpecialtiesDataProcessedType[]
  >([]);
  //PESQUISA
  const [searchValue, setSearchValue] = useState<string>("");
  //PAGINAÇÃO
  const size = 7;
  const [page, setPage] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [offsetTotalItens, setOffsetTotalItens] = useState<number[]>([0, 0]);
  //DEFININDO O NAVIGATE
  const navigate = useNavigate();
  //MODAL
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  //ID DO ITEM PARA DELETAR
  const [deleteItemId, setDeleteItemId] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await GetSpecialties(size, searchValue, undefined, page);
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
        const specialty = {
          name: currentValue.name,
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
                  navigate(`/home/specialties/${currentValue.id}`, {
                    state: { action: "VIEW" },
                  })
                }
              >
                <img src={icons.details} />
              </S.TableIco>
              <S.TableIco
                onClick={() =>
                  navigate(`/home/specialties/${currentValue.id}`, {
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
        return [...accumulator, specialty];
      }, [] as SpecialtiesDataProcessedType[]);
      //ATUALIZA COM TEMPDATA OU COM ARRAY VAZIO PARA LIDAR COM NULL E UNDEFINED
      setSpecialtiesDataProcessed(tempData ?? []);
    };

    fetchData();
  }, [searchValue, page, setSpecialtiesDataProcessed]);

  const handleCheckboxChange = () => {
    //pensar
  };

  const handleDelete = async (id: number) => {
    await DeleteSpecialty(id);
    closeModal();
    setPage(0);
  };

  //FUNÇÕES OPEN/CLOSE MODAL
  function openModal(id: number) {
    setDeleteItemId(id);
    setIsOpen(true);
  }
  function closeModal() {
    setDeleteItemId(null);
    setIsOpen(false);
  }

  return (
    <>
      <S.ContentRefil>
        <S.PageTitle>Especialidades</S.PageTitle>
        <S.TableContainerRad>
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
                navigate("/home/specialties/new", { state: { action: "NEW" } })
              }
            >
            <span>+</span> Nova Especialidade
            </S.TableNewButton>
          </S.TableDFlexTab>
          <Table
            HeadColumns={tableColumns}
            BodyRow={specialtiesDataProcessed}
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
        </S.TableContainerRad>
      </S.ContentRefil>

      <div>
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
      </div>
    </>
  );
};

export default Specialties;
