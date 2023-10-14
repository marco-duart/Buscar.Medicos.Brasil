import { ReactNode, useEffect, useState } from "react"
import { GetSpecialties } from "../data/services/specialties"
import { Table } from "../components/shared/table"
import See from "../assets/icon/eye-off-line.svg"
import Edit from "../assets/icon/eye-off-line.svg"
import Delete from "../assets/icon/eye-off-line.svg"
import { useNavigate, useParams } from "react-router-dom"

type SpecialtiesDataProcessedType = {
  name: string
  enabled: ReactNode
  actions: ReactNode
}

const Specialties = () => {
  const [specialtiesDataProcessed, setSpecialtiesDataProcessed] = useState<SpecialtiesDataProcessedType[]>([])
  const [page, setPage] = useState<number>(1);
  const [currentTab, setCurrentTab] = useState<
    "TODOS" | "MEDICO" | "CONTRATANTE"
  >("MEDICO")

  const tableColumns = ["Nome especialidade", "Situação", "Ações"]

  const navigate = useNavigate()

  const exemploRedirectDeCreate = () => {
    navigate(`/planos/criar/${currentTab}`)

    // Você acessa esse valor na sua página de criação a partir do
    const params = useParams()
    params.tipo
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await GetSpecialties(7)
      const tempData = response?.content.reduce(
        (accumulator, currentValue) => {
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
          }
          return [...accumulator, specialty]
        },
        [] as SpecialtiesDataProcessedType[]
      )
      setSpecialtiesDataProcessed(tempData ?? [])
    }

    fetchData()
  }, [])

  return (
    <>
      <Table HeadColumns={tableColumns} BodyRow={specialtiesDataProcessed} />
    </>
  )
}

export default Specialties