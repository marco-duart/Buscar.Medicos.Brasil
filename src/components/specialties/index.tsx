import React, { createContext, useState, useContext, useEffect } from 'react'
import { GetSpecialties } from '../../data/services/specialties'


const Specialties = () => {
    const [specialtiesData, setSpecialtiesData] = useState<IDataSpecialtiesArray>([])

    useEffect(() => {
        const fetchData = async () => {
          try {    
            const specialtiesResponse = await GetSpecialties();
            setSpecialtiesData(specialtiesResponse);
          } catch (error) {
            console.error('Erro ao buscar dados da API:', error);
          }
        };
        fetchData();
      }, []);

    return (
        <>
            <div>
                Specialties
            </div>
        </>
    )
}

export default Specialties