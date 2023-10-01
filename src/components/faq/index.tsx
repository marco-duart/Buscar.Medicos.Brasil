import React, { createContext, useState, useContext, useEffect } from 'react'
import { GetFAQ } from '../../data/services/faq'

const FAQ = () => {
    const [faqData, setFaqData] = useState<IDataFAQArray>([])

    useEffect(() => {
        const fetchData = async () => {
          try {
            const faqResponse = await GetFAQ();
            setFaqData(faqResponse);
          } catch (error) {
            console.error('Erro ao buscar dados da API:', error);
          }
        };
        fetchData();
      }, []);
    return (
        <>
            <div>FAQ</div>
        </>
    )
}

export default FAQ