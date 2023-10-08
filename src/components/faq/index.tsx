import React, { createContext, useState, useContext, useEffect } from 'react'
import { GetQuestions } from '../../data/services/questions'

const FAQ = () => {
    const [faqData, setFaqData] = useState<IDataQuestionsArray>([])

    useEffect(() => {
        const fetchData = async () => {
          try {
            const faqResponse = await GetQuestions();
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