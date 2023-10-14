import { isAxiosError } from "axios";
import api from "./api";

type ApiResponse<T> = T | null;

//TIPAGEM DEFINIDA POR QUEM CHAMA O AXIOS. USAR 'UNDEFINED' PARA OS ARGUMENTOS OPCIONAIS QUE NÃO FOR USADO NA CHAMADA DO AXIOS
export const GetUsers = async <T>( urlAPI: "/users" | "/users/count" | "/users/dashboard", size?: number, search?: string, sort?: "ASC" | "DESC", page?: number, id?: number ): Promise<ApiResponse<T>> => {
  //ADAPTAR OUTRAS ROTAS COMO STATE, SPECIALTY, PROFILE, CITY QUE POSSUEM OUTROS ARGUMENTOS POSSÍVEIS
  try {
    //TOKEN
    const token = localStorage.getItem("token");
    //A RESPONSE PODE SER DE VARIOS TIPOS, CONFORME O PARAMETRO RECEBIDO
      const apiResponse = await api.get(`${urlAPI}`, {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          page,
          sort,
          search,
          size,
          id
        }
      });
  
      return apiResponse.data as T;
  } catch (error) {
    if (isAxiosError(error)) {
      return null;
    }
    return null;
  }
};
