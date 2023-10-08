import { useEffect, useState } from "react"
import { GetLastUsers, GetUsers } from "../../data/services/users"
import Table from "../shared/table"

type UserDataProcessedType = {
  user: string
  email: string
  whatsapp: string
  userType: string
}[]

export const TableDashboard = () => {
  const HeadColumns = ['Usuário', 'E-mail', 'WhatsApp', 'Tipo de Usuário']
  const [userDataProcessed, setUserDataProcessed] = useState<UserDataProcessedType>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetUsers<IDataUserArray>('/users', undefined, 'DESC', 4)
        if(response) {
          let dataTemp: UserDataProcessedType = []
          response.content.forEach((item) => {
            dataTemp.push({
              user: item.lastName,
              email: item.email,
              whatsapp: item.phone,
              userType: item.profiles.length > 0 ? item.profiles[0].name : ""
            })
          })
          setUserDataProcessed(dataTemp)
        }
      } catch (error) {
        console.error('Error fetching data', error)
      }
    }
    fetchData()
  }, [])
  return (
    <div>
        <Table HeadColumns={HeadColumns} BodyRow={userDataProcessed} />
    </div>
  )
}