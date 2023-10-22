import { isAxiosError } from "axios";
import api from "./api";

export const GetQuestions = async (
  size?: number,
  search?: string,
  sort?: "ASC" | "DESC",
  page?: number,
  id?: number,
  type?: string
) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.get("/questions", {
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
    return response.data as IDataQuestionsArray;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error)
    }
    return null;
  }
};

export const GetQuestion = async (id: number) => {
  try {
    const token = localStorage.getItem("token");
    const apiResponse = await api.get(`/questions/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return apiResponse.data as IDataQuestions;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error)
    }
    return null;
  }
};

export const PostQuestion = async (
  title: string,
  message: string,
  type: string
) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.post(
      "/questions",
      {
        title,
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
      console.log(error)
    }
    return null;
  }
};

export const DeleteQuestion = async (id: number) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.delete(`/questions/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error)
    }
    return null;
  }
};

export const PutQuestion = async (
  id: number,
  title: string,
  message: string,
  type: string
) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.put(
      `/questions/${id}`,
      {
        title,
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
      console.log(error)
    }
    return null;
  }
};
