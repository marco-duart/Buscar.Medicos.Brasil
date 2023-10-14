import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react'
import { GetNotifications } from '../data/services/notifications'
import { Table } from "../components/shared/table"
import See from "../assets/icon/eye-off-line.svg"
import Edit from "../assets/icon/eye-off-line.svg"
import Delete from "../assets/icon/eye-off-line.svg"
import { useNavigate, useParams } from "react-router-dom"


type NotificationsDataProcessedType = {
  name: string
  dataEnvio: string
  actions: ReactNode
}

const Notifications = () => {
  const tableColumns = ["Título", "Data de envio", "Ações"]
    const [notificationsDataProcessed, setPlansDataProcessed] = useState<NotificationsDataProcessedType[]>([])

    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
          const response = await GetNotifications(7)
          const tempData = response?.content.reduce(
            (accumulator, currentValue) => {
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
              }
              return [...accumulator, plan]
            },
            [] as NotificationsDataProcessedType[]
          )
          setPlansDataProcessed(tempData ?? [])
        }
        fetchData()
      }, []);

    return (
        <>
          <Table HeadColumns={tableColumns} BodyRow={notificationsDataProcessed} />
        </>
    )
}

export default Notifications