import { useEffect, useState } from "react"
import { GetUsers } from "../../data/services/users"
import Table from "../shared/table"

type UserDataProcessedType = {
  user: string
  email: string
  whatsapp: string
  userType: string
}

export const TableDashboard = () => {
  const tableColumns = ['Usuário', 'E-mail', 'WhatsApp', 'Tipo de Usuário']
  const [userDataProcessed, setUserDataProcessed] = useState<UserDataProcessedType[]>([])

  useEffect(() => {
    const fetchData = async () => {

        const response = await GetUsers<IDataUserArray>('/users', 6, undefined, 'DESC')
          const tempData = response?.content.reduce((accumulator, currentValue) => {
            const user = {
              user: currentValue.lastName,
              email: currentValue.email,
              whatsapp: currentValue.phone,
              userType: currentValue.profiles.length > 0 ? currentValue.profiles[0].name : ""
            }
            return [...accumulator, user]
            },
          [] as UserDataProcessedType[]
          )
          setUserDataProcessed(tempData ?? [])

    }
    fetchData()
  }, [])
  return (
    <div>
        <Table HeadColumns={tableColumns} BodyRow={userDataProcessed} />
    </div>
  )
}