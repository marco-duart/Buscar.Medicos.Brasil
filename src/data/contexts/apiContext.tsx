 import React, { createContext, useState, useContext, useEffect } from 'react'


 const ApiContext = createContext<IDataContext | null>(null)

 const ApiContextProvider:React.FC<IDataContextProviderProps> = ({children}) => {
    const [userName, setUserName] = useState<string>("")
    
    

    return (
        <ApiContext.Provider value={{userName, setUserName}}>
            {children}
        </ApiContext.Provider>
    )
}

const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('apiContext');
  }
  return context;
};

export { useApi, ApiContextProvider }