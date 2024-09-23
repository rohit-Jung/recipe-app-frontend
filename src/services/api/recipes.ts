import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../axiosInstance";
import endPoints from "../endPoints";
import {
  IRecipe,
  IErrorResponse,
  ICreateUpdateResponse,
  IDeleteResponse,
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

export const useGetAllRecipes = () => {
  return useQuery<IRecipe[], IErrorResponse>({
    queryKey: ["Recipes"],
    queryFn: async () => {
      try {
        const response = await api.get(endPoints.allRecipes);
        return response.data;
      } catch (error) {
        throw handleError(error);
      }
    },
  });
};

export const useGetRecipe = (pk: string) => {
  
  return useQuery<IRecipe, IErrorResponse>({
    queryKey: ["RecipeDetail", pk],
    queryFn: async () => {
      try {
        const response = await api.get(endPoints.recipeDetail(pk));
        return response.data;
      } catch (error) {
        throw handleError(error);
      }
    },
    retry: 2,
  });
};

export const useCreateRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation<ICreateUpdateResponse, IErrorResponse, FormData>({
    mutationFn: (data: FormData) =>
      api.post(endPoints.createRecipe, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Recipes"] });
    },
    onError: handleError,
  });
};


export const useGetUserCreatedRecipes = () => {
  return useQuery<IRecipe[], IErrorResponse>({
    queryKey: ["UserRecipes"],
    queryFn: async () => {
      try {
        const response = await api.get(endPoints.userRecipe);
        return response.data;
      } catch (error) {
        throw handleError(error);
      }
    },
  });
};

export const useUpdateRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ICreateUpdateResponse,
    IErrorResponse,
    { id: string; formData: FormData }
  >({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
      api.put(endPoints.updateRecipe(id), formData),
    onSuccess: (_, data) => {
      queryClient.invalidateQueries({
        queryKey: ["RecipeDetail", data!.id, "Recipes"],
      });
    },
    onError: handleError,
  });
};

export const useDeleteRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation<IDeleteResponse, IErrorResponse, string>({
    mutationFn: (pk: string) => api.delete(endPoints.deleteRecipe(pk)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Recipes"] });
    },
    onError: handleError,
  });
};
