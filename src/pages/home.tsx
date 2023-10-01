import React, { useState, useEffect } from "react";
import { GetUsers } from "../data/services/users";
import { GetDashboard } from "../data/services/dashboard";
import Dashboard from "../components/dashboard";
import Table from "../components/shared/table";

type userColumns = {
   header: string, 
   accessor: string,
   subaccessor?:string,
}[]

const userColumns: userColumns = [
  { header: 'Usuário', accessor: 'first_name' },
  { header: 'E-mail', accessor: 'email' },
  { header: 'WhatsApp', accessor: 'whatsapp' },
  { header: 'Tipo de usuário', accessor: 'profiles', subaccessor: 'name' },
]

const Home = () => {
  const [usersData, setUsersData] = useState<IDataUserArray>([]);

  //VERIFICAR O PROBLEMA COM ESSA TIPAGEM
  const [dashboardData, setDashboardData] = useState<IDataDashboard>({
    doctor: {
      total: 0,
      available: 0,
      unavailable: 0,
    },
    contractor: {
      total: 0,
      available: 0,
      unavailable: 0,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse: IDataUserArray = await GetUsers();
        if(usersResponse) {
          const lastUsers = usersResponse.slice(-4)
          setUsersData(lastUsers);
        }
        


        const dashboardResponse = await GetDashboard();
        setDashboardData(dashboardResponse);
      } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1>Olá, página HOME</h1>
      <Dashboard title="Médicos" data={dashboardData.doctor} types={["Total", "Disponíveis", "Indisponíveis"]} />
      <Dashboard title="Contratantes" data={dashboardData.contractor} types={["Total", "Ativos", "Inativos"]} />
      <Table data={usersData} columns={userColumns} />
    </>
  );
};

export default Home;
