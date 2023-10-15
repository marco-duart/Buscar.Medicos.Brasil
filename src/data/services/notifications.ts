import { isAxiosError } from "axios";
import api from "./api";

export const GetNotifications = async (size?: number, search?: string, sort?: "ASC" | "DESC", page?: number, id?:number, type?: string ) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.get("/notifications", {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        page,
        sort,
        search,
        size,
        id,
        type
      }
    });
    return response.data as IDataNotificationsArray; 
  } catch (error) {
    if (isAxiosError(error)) {
      return null;
    }
    return null;
  }
};

export const PostNotification = async (title: string, content: string) => {
  try {
    const token = localStorage.getItem("token");
    const cards = await api.post(
      "/api/card",
      { 
        title, 
        content 
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

export const DeleteNotification = async (id: string) => {
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

export const PutNotification = async (id: string, title: string, content: string) => {
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