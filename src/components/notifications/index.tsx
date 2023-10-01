import React, { createContext, useState, useContext, useEffect } from 'react'
import { GetNotifications } from '../../data/services/notifications'

const Notifications = () => {
    const [notificationsData, setNotificationsData] = useState<IDataNotificationsArray>([])

    useEffect(() => {
        const fetchData = async () => {
          try {
            const notificationsResponse = await GetNotifications();
            setNotificationsData(notificationsResponse);
          } catch (error) {
            console.error('Erro ao buscar dados da API:', error);
          }
        };
        fetchData();
    }, []);

    return (
        <>
            <div>Notifications</div>
        </>
    )
}

export default Notifications