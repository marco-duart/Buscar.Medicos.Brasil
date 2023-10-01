import React, { createContext, useState, useContext, useEffect } from 'react'
import { GetPlans } from '../../data/services/plans'



const Plans = () => {
    const [plansData, setPlansData] = useState<IDataPlansArray>([])

    useEffect(() => {
        const fetchData = async () => {
          try {
            const plansResponse = await GetPlans();
            setPlansData(plansResponse);
          } catch (error) {
            console.error('Erro ao buscar dados da API:', error);
          }
        };
        fetchData();
      }, []);

    return (
        <>
            <div>
                Plans
            </div>
        </>
    )
}

export default Plans