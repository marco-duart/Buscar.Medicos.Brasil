import { isAxiosError } from "axios";
import api from "./api";

export const GetCountUsers = async () => {
  try {
    //LEMBRAR
    /* const token = localStorage.getItem("token"); */
    const users = await api.get("/count_users");
    return users.data;
  } catch (error) {
    if (isAxiosError(error)) {
      return null;
    }
    return null;
  }
};