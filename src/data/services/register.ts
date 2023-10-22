import { AxiosResponse, isAxiosError } from "axios";
import api from "./api";

export const LoginAPI = async (email: string, password: string) => {
  try {
    const apiResponse: AxiosResponse<ILoginApi> = await api.post(
      `/public/register/login?email=${email}&password=${password}`
    );
    const { token, message } = apiResponse.data;
    //ATRIBUINDO O TOKEN
    localStorage.setItem("token", token);
    api.defaults.headers.Authorization = token;
    return message;
  } catch (error) {
    if (isAxiosError(error)) {
      return error.response?.status;
    }
  }
};

export const MeAPI = async () => {
  const token = localStorage.getItem("token");
  try {
    const apiResponse: AxiosResponse<IMeAPI> = await api.get("/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return apiResponse.data as IMeAPI;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error)
    }
    return null;
  }
};
