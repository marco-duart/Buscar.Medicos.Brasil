import { isAxiosError } from "axios";
import api from "./api";

export const GetUsers = async () => {
  try {
    //LEMBRAR
    /* const token = localStorage.getItem("token"); */
    const users = await api.get("/users");
    return users.data;
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
        content 
      },
      {
        headers: { Authorization: token },
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
      headers: { Authorization: token },
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
        headers: { Authorization: token },
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