// api/mealPlans.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../axiosInstance";
import endPoints from "../endPoints";
import {
  IErrorResponse,
  ICreateUpdateResponse,
  IDeleteResponse,
  IMealPlan,
} from "@/types";
import axios from "axios";

const handleError = (error: unknown): IErrorResponse => {
  if (axios.isAxiosError(error)) {
    console.error(error.response?.data.message || error.message);
    return { message: error.response?.data.message || error.message };
  } else {
    console.error("An unexpected error occurred");
    return { message: "An unexpected error occurred" };
  }
};

export const useGetAllMealPlans = () => {
  return useQuery<IMealPlan[], IErrorResponse>({
    queryKey: ["MealPlans"],
    queryFn: async () => {
      try {
        const response = await api.get(endPoints.allMealPlans);
        return response.data;
      } catch (error) {
        throw handleError(error);
      }
    },
  });
};

export const useMealPlanDetail = (pk: string) => {
  return useQuery<IMealPlan, IErrorResponse>({
    queryKey: ["MealPlanDetail", pk],
    queryFn: async () => {
      try {
        const response = await api.get(endPoints.mealPlanDetail(pk));
        return response.data;
      } catch (error) {
        throw handleError(error);
      }
    },
  });
};

export const useCreateMealPlan = () => {
  return useMutation<
    ICreateUpdateResponse,
    IErrorResponse,
    Omit<IMealPlan, "id">
  >({
    mutationFn: (data) => api.post(endPoints.createMealPlan, data),
    onError: handleError,
  });
};

export const useUpdateMealPlan = () => {
  const queryClient = useQueryClient();

  return useMutation<ICreateUpdateResponse, IErrorResponse, IMealPlan>({
    mutationFn: (data) => api.put(endPoints.updateMealPlan(data.id), data),
    onSuccess: (_, data) => {
      queryClient.invalidateQueries({ queryKey: ["MealPlanDetail", data.id] });
    },
    onError: handleError,
  });
};

export const useDeleteMealPlan = () => {
  const queryClient = useQueryClient();

  return useMutation<IDeleteResponse, IErrorResponse, string>({
    mutationFn: (pk) => api.delete(endPoints.deleteMealPlan(pk)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["MealPlans"] });
    },
    onError: handleError,
  });
};
