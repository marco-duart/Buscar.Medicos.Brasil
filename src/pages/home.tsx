import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { GetUsers } from "../data/services/users";
import { CountDashboard } from "../components/dashboard/countDashboard";
import { TableDashboard } from "../components/dashboard/tableDashboard";

const Home = () => {
  //VERIFICAR O PROBLEMA COM ESSA TIPAGEM
  const [dashboardData, setDashboardData] = useState<IDataUserDashboard>({
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
        const dashboardResponse = await GetUsers<IDataUserDashboard>("/users/dashboard");
        if (dashboardResponse) {
          setDashboardData(dashboardResponse)
        }
      } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <h1>Olá, página HOME</h1>
      <CountDashboard title="Médicos" data={dashboardData.doctor} types={["Total", "Disponíveis", "Indisponíveis"]} />
      <CountDashboard title="Contratantes" data={dashboardData.contractor} types={["Total", "Ativos", "Inativos"]} />
      <div>
        <div><Link to="/home/users">Ver tudo ➔</Link></div>
      <TableDashboard />
      </div>
    </>
  );
};

export default Home;
