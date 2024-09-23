import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../axiosInstance";
import endPoints from "../endPoints";
import {
  IErrorResponse,
  ICreateUpdateResponse,
  IDeleteResponse,
  ISavedRecipe,
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

// Fetch all saved recipes
export const useGetUserSavedRecipes = () => {
  return useQuery<ISavedRecipe[], IErrorResponse>({
    queryKey: ["SavedRecipes"],
    queryFn: async () => {
      try {
        const response = await api.get(endPoints.usersSavedRecipes);
        return response.data;
      } catch (error) {
        throw handleError(error);
      }
    },
  });
};

// Fetch details of a single saved recipe
export const useSavedRecipeDetail = (pk: string) => {
  return useQuery<ISavedRecipe, IErrorResponse>({
    queryKey: ["SavedRecipeDetail"],
    queryFn: async () => {
      try {
        const response = await api.get(endPoints.savedRecipeDetail(pk));
        return response.data;
      } catch (error) {
        throw handleError(error);
      }
    },
    retry: false,
  });
};

// Create a saved recipe
export const useCreateSavedRecipe = () => {
  const queryClient = useQueryClient();
  return useMutation<
    ICreateUpdateResponse,
    IErrorResponse,
    { recipe_id: string }
  >({
    mutationFn: ({ recipe_id }) =>
      api.post(endPoints.createSavedRecipe, { recipe_id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["SavedRecipeDetail"] });
    },
    onError: handleError,
  });
};


// Delete a saved recipe
export const useDeleteSavedRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation<IDeleteResponse, IErrorResponse, string>({
    mutationFn: (pk) => api.delete(endPoints.deleteSavedRecipe(pk)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["SavedRecipes"] });
    },
    onError: handleError,
  });
};
