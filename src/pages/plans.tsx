import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { GetPlans } from "../data/services/plans";
import { Table } from "../components/shared/table";
import See from "../assets/icon/eye-off-line.svg";
import Edit from "../assets/icon/eye-off-line.svg";
import Delete from "../assets/icon/eye-off-line.svg";
import { useNavigate, useParams } from "react-router-dom";

type PlansDataProcessedType = {
  name: string;
  value: number;
  enabled: ReactNode;
  actions: ReactNode;
};

const Plans = () => {
  const tableColumns = ["Título", "Valor", "Situação", "Ações"];
  const [plansDataProcessed, setPlansDataProcessed] = useState<
    PlansDataProcessedType[]
  >([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await GetPlans(7, searchValue, undefined, page);
      setTotalPage(response?.totalPages ?? 0);
      const tempData = response?.content.reduce((accumulator, currentValue) => {
        const plan = {
          name: currentValue.planTitle,
          value: currentValue.value,
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
      }, [] as PlansDataProcessedType[]);
      setPlansDataProcessed(tempData ?? []);
    };
    fetchData();
  }, [searchValue, page, setPlansDataProcessed]);

  return (
    <>
      <input
        type="text"
        placeholder="Pesquise uma palavra-chave"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <Table HeadColumns={tableColumns} BodyRow={plansDataProcessed} />
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

export default Plans;
