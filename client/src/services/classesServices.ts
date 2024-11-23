import { useMutation, useQuery } from "@tanstack/react-query";
import { apiClient } from "./apiClient";
import { ApiResponse, Class, ClassData } from "@/types/types";
import { AxiosError } from "axios";

export const useGetClasses = (user_id: number) => {
  return useQuery<Class[]>({
    queryKey: ["classes", user_id],
    queryFn: async () => {
      const { data } = await apiClient.get(`/classes/user/${user_id}`);
      return data;
    },
  });
};

export const useGetClass = (class_id: number) => {
  return useQuery<Class>({
    queryKey: ["class", class_id],
    queryFn: async () => {
      const { data } = await apiClient.get(`/classes/${class_id}`);
      return data;
    },
  });
};

export const useCreateClass = () => {
  return useMutation<ApiResponse, AxiosError<ApiResponse>, ClassData>({
    mutationFn: async (classData) => {
      const { data } = await apiClient.post("/classes", classData);
      return data;
    },
  });
};

export const useDeleteClass = () => {
  return useMutation<ApiResponse, AxiosError<ApiResponse>, number>({
    mutationFn: async (class_id) => {
      const { data } = await apiClient.delete(`/classes/${class_id}`);
      return data;
    },
  });
};

export const useEditClass = (class_id: number) => {
  return useMutation<ApiResponse, AxiosError<ApiResponse>, ClassData>({
    mutationFn: async (classData) => {
      const { data } = await apiClient.put(`/classes/${class_id}`, classData);
      return data;
    },
  });
};
