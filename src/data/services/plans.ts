import { isAxiosError } from "axios";
import api from "./api";

export const GetPlans = async (
  size?: number,
  search?: string,
  sort?: "ASC" | "DESC",
  page?: number,
  id?: number,
  type?: string
) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.get("/plans", {
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
    return response.data as IDataPlansArray;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error);
    }
    return null;
  }
};

export const GetPlan = async (id: number) => {
  try {
    const token = localStorage.getItem("token");
    const apiResponse = await api.get(`/plans/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return apiResponse.data as IDataPlans;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error);
    }
    return null;
  }
};

export const PostPlan = async (
  planTitle: string,
  enabled: boolean,
  period: string,
  type: string,
  values: number
) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.post(
      "/plans",
      {
        planTitle,
        enabled,
        period,
        type,
        values,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error);
    }
    return null;
  }
};

export const DeletePlan = async (id: number) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.delete(`/plans/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error);
    }
    return null;
  }
};

export const PutPlan = async (
  id: number,
  planTitle: string,
  enabled: boolean,
  period: string,
  type: string,
  values: number
) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.put(
      `/plans/${id}`,
      {
        planTitle,
        enabled,
        period,
        type,
        values,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error);
    }
    return null;
  }
};
