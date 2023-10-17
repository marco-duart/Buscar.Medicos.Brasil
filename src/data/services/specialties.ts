import { isAxiosError } from "axios";
import api from "./api";

export const GetSpecialties = async (
  size?: number,
  search?: string,
  sort?: "ASC" | "DESC",
  page?: number,
  id?: number
) => {
  try {
    const token = localStorage.getItem("token");
    const apiResponse = await api.get("/specialties", {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        page,
        sort,
        search,
        size,
        id,
      },
    });
    return apiResponse.data as IDataSpecialtiesArray;
  } catch (error) {
    if (isAxiosError(error)) {
      return null;
    }
    return null;
  }
};

export const GetSpecialty = async (id: number) => {
  try {
    const token = localStorage.getItem("token");
    const apiResponse = await api.get(`/specialties/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return apiResponse.data as IDataSpecialties;
  } catch (error) {
    if (isAxiosError(error)) {
      return null;
    }
    return null;
  }
};

export const PostSpecialty = async (title: string, content: string) => {
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

export const DeleteSpecialty = async (id: number) => {
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

export const PutSpecialty = async (
  id: number,
  name: string,
  enabled: boolean
) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.put(
      `/specialties/${id}`,
      {
        name,
        enabled,
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
