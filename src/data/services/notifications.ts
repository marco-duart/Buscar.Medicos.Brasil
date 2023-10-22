import { isAxiosError } from "axios";
import api from "./api";

export const GetNotifications = async (
  size?: number,
  search?: string,
  sort?: "ASC" | "DESC",
  page?: number,
  id?: number,
  type?: string
) => {
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
        type,
      },
    });
    return response.data as IDataNotificationsArray;
  } catch (error) {
    if (isAxiosError(error)) {
      return null;
    }
    return null;
  }
};

export const GetNotification = async (id: number) => {
  try {
    const token = localStorage.getItem("token");
    const apiResponse = await api.get(`/notifications/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return apiResponse.data as IDataNotifications;
  } catch (error) {
    if (isAxiosError(error)) {
      return null;
    }
    return null;
  }
};

export const PostNotification = async (
  title: string,
  sendingDate: string,
  message: string,
  type: string
) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.post(
      "/notifications",
      {
        title,
        sendingDate,
        message,
        type,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      return null;
    }
    return null;
  }
};

export const PutNotification = async (
  id: number,
  title: string,
  sendingDate: string,
  message: string,
  type: string
) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.put(
      `/notifications/${id}`,
      {
        title,
        sendingDate,
        message,
        type,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      return null;
    }
    return null;
  }
};
