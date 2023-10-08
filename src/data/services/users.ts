import { isAxiosError } from "axios";
import api from "./api";

type ApiResponse<T> = T | null;

//TIPAGEM DEFINIDA POR QUEM CHAMA O AXIOS. USAR 'UNDEFINED' PARA OS ARGUMENTOS OPCIONAIS QUE NÃO FOR USADO NA CHAMADA DO AXIOS
export const GetUsers = async <T>( urlAPI: "/users" | "/users/count" | "/users/dashboard", search?: string, sort?: "ASC" | "DESC", size?: number, page?: number ): Promise<ApiResponse<T>> => {
  let queryString = ""
  //CONCATENAR OS ARGUMENTOS CONFORME A EXISTÊNCIA DELES. COLOCAR CONDICIALMENTE O '?' E '&' CONFORME EXISTENCIA DE VALOR EM QUERYSTRING
  //ADAPTAR OUTRAS ROTAS COMO STATE, SPECIALTY, PROFILE, CITY QUE POSSUEM OUTROS ARGUMENTOS POSSÍVEIS
  if(size) {
    queryString += `${queryString ? "&": "?"}size=${size}`
  }
  if(sort) {
    queryString += `${queryString ? "&": "?"}sort=${sort}`
  }
  if(page) {
    queryString += `${queryString ? "&": "?"}page=${page}`
  }
  if(search) {
    queryString += `${queryString ? "&": "?"}search=${search}`
  }
  try {
    //TOKEN
    const token = localStorage.getItem("token");
    //A RESPONSE PODE SER DE VARIOS TIPOS, CONFORME O PARAMETRO RECEBIDO
      const apiResponse = await api.get(`${urlAPI}${queryString}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      return apiResponse.data as T;
  } catch (error) {
    if (isAxiosError(error)) {
      return null;
    }
    return null;
  }
};

//FUNÇÃO PARA OS 4 ÚLTIMOS
export const GetLastUsers = async () => {
  try {
      const apiResponse = await GetUsers<IDataUserArray>("/users")
      if(apiResponse) {
        const lastUsers = apiResponse.content.slice(-4)
        return lastUsers
      }
  } catch (error) {
    if (isAxiosError(error)) {
      return null;
    }
    return null;
  }
};


export const PostUser = async (title: string, content: string) => {
  try {
    const token = localStorage.getItem("token");
    const cards = await api.post(
      "/api/card",
      {
        title,
        content,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return cards.data;
  } catch (error) {
    if (isAxiosError(error)) {
      return null;
    }
    return null;
  }
};

export const DeleteUser = async (id: string) => {
  try {
    const token = localStorage.getItem("token");
    const cards = await api.delete(`/api/card/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return cards.data;
  } catch (error) {
    if (isAxiosError(error)) {
      return null;
    }
    return null;
  }
};

export const PutUser = async (id: string, title: string, content: string) => {
  try {
    const token = localStorage.getItem("token");
    const cards = await api.put(
      `/api/card/${id}`,
      {
        title,
        content,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return cards.data;
  } catch (error) {
    if (isAxiosError(error)) {
      return null;
    }
    return null;
  }
};
