import { useEffect, useState } from "react"
import { GetUsers } from "../../data/services/users"
import Table from "../shared/table"

type UserDataProcessedType = {
  user: string
  email: string
  whatsapp: string
  userType: string
}[]

export const TableDashboard = () => {
  const HeadColumns = ['Usuário', 'E-mail', 'WhatsApp', 'Especialidade', 'Cidade', 'Estado', 'Tipo de Usuário']
  const [userDataProcessed, setUserDataProcessed] = useState<UserDataProcessedType>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetUsers<IDataUserArray>('/users')
        console.log("Response linha 20 Table Dashboard",response)
        if(response) {
          let dataTemp: UserDataProcessedType = []
          response.content.forEach((item) => {
            dataTemp.push({
              user: item.lastName,
              email: item.email,
              whatsapp: item.phone,
              userType: item.profiles.length > 0 ? item.profiles[0].name : ""
            })
            console.log("Datatemp",dataTemp)
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