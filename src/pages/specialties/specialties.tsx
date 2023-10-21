import { ReactNode, useEffect, useState } from "react";
import Modal from 'react-modal';
import { DeleteSpecialty, GetSpecialties } from "../../data/services/specialties";
import { Table } from "../../components/shared/table";
import See from "../../assets/icon/details.svg";
import Edit from "../../assets/icon/edit.svg";
import Delete from "../../assets/icon/delete.svg";
import { useNavigate } from "react-router-dom";

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
  const size = 7
  const [page, setPage] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);
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
      //CRIANDO UM NOVO ARRAY DE OBJETOS ESPECÍFICO PARA O CASO
      const tempData = response?.content.reduce((accumulator, currentValue) => {
        const specialty = {
          name: currentValue.name,
          enabled: (
            <div>
              <input type="checkbox" checked={currentValue.enabled} />
              <label>{currentValue.enabled ? "Ativo" : "Inativo"}</label>
            </div>
          ),
          actions: (
            <div>
              <button
                onClick={() =>
                  navigate(`/home/specialties/${currentValue.id}`, {
                    state: { action: "VIEW" },
                  })
                }
              >
                <img src={See} />
              </button>
              <button
                onClick={() =>
                  navigate(`/home/specialties/${currentValue.id}`, {
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
        return [...accumulator, specialty];
      }, [] as SpecialtiesDataProcessedType[]);
      //ATUALIZA COM TEMPDATA OU COM ARRAY VAZIO PARA LIDAR COM NULL E UNDEFINED
      setSpecialtiesDataProcessed(tempData ?? []);
    };

    fetchData();
  }, [searchValue, page, setSpecialtiesDataProcessed]);

  const handleDelete = async (id: number) => {
    await DeleteSpecialty(id);
    closeModal()
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
      <div>
        <div>
          <input
            type="text"
            placeholder="Pesquise uma palavra-chave"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button
            onClick={() =>
              navigate("/home/specialties/new", { state: { action: "NEW" } })
            }
          >
            Nova Especialidade
          </button>
        </div>
        <Table HeadColumns={tableColumns} BodyRow={specialtiesDataProcessed} />
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
      <div>
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
      </div>
    </>
  );
};

export default Specialties;