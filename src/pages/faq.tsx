import React, { useState, useEffect, ReactNode } from 'react'
import { GetQuestions } from '../data/services/questions'
import { Table } from "../components/shared/table"
import See from "../assets/icon/eye-off-line.svg"
import Edit from "../assets/icon/eye-off-line.svg"
import Delete from "../assets/icon/eye-off-line.svg"
import { useNavigate, useParams } from "react-router-dom"


type NotificationsDataProcessedType = {
  name: string
  actions: ReactNode
}

const FAQ = () => {
  const tableColumns = ["Título", "Ações"]
    const [notificationsDataProcessed, setPlansDataProcessed] = useState<NotificationsDataProcessedType[]>([])
    const [searchValue, setSearchValue] = useState<string>("");
    const [page, setPage] = useState<number>(0);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
          const response = await GetQuestions(7,searchValue, undefined, page)
          const tempData = response?.content.reduce(
            (accumulator, currentValue) => {
              const plan = {
                name: currentValue.title,
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
              return [...accumulator, plan]
            },
            [] as NotificationsDataProcessedType[]
          )
          setPlansDataProcessed(tempData ?? [])
        }
        fetchData()
      }, [searchValue, page, setPlansDataProcessed]);

    return (
        <>
          <input
            type="text"
            placeholder="Pesquise uma palavra-chave"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Table HeadColumns={tableColumns} BodyRow={notificationsDataProcessed} />
        </>
    )
}

export default FAQ