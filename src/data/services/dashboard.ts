import { isAxiosError } from "axios";
import api from "./api";

export const GetDashboard = async () => {
  try {
    //LEMBRAR
    /* const token = localStorage.getItem("token"); */
    const users = await api.get("/dashboard");
    return users.data;
  } catch (error) {
    if (isAxiosError(error)) {
      return null;
    }
    return null;
  }
};