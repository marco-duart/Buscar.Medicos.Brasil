import React, { createContext, useState, useContext, useEffect } from 'react'
import { GetUsers } from '../../data/services/users'

const Users = () => {
    const [usersData, setUsersData] = useState<IDataUserArray>([])

    useEffect(() => {
        const fetchData = async () => {
          try {
            const usersResponse = await GetUsers();
            setUsersData(usersResponse);
    
          } catch (error) {
            console.error('Erro ao buscar dados da API:', error);
          }
        };
    
        fetchData();
      }, []);

    return (
        <>
            <div>
                Usuários
            </div>
        </>
    )
}

export default Users