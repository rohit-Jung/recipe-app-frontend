import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../axiosInstance";
import endPoints from "../endPoints";
import {
  IReview,
  IErrorResponse,
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

export const useGetAllReviewsOfRecipe = (recipe_id: string) => {
  return useQuery<IReview[], IErrorResponse>({
    queryKey: ["Reviews"],
    queryFn: async () => {
      try {
        const response = await api.get(endPoints.allReviewsOfRecipe(recipe_id));
        return response.data;
      } catch (error) {
        throw handleError(error);
      }
    },
    retry: 2,
  });
};

export const useReviewDetail = (pk: string) => {
  return useQuery<IReview, IErrorResponse>({
    queryKey: ["ReviewDetail", pk],
    queryFn: async () => {
      try {
        const response = await api.get(endPoints.reviewDetail(pk));
        return response.data;
      } catch (error) {
        throw handleError(error);
      }
    },
  });
};

export const useCreateReview = () => {
  const queryClient = useQueryClient();

  return useMutation<
    IReview,
    IErrorResponse,
    { recipe_id: string; data: IReview }
  >({
    mutationFn: ({ recipe_id, data }) =>
      api.post(endPoints.createReview(recipe_id), data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Reviews"] });
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: ["Reviews"] });
      handleError;
    },
  });
};

export const useUpdateReview = () => {
  const queryClient = useQueryClient();

  return useMutation<
    IReview,
    IErrorResponse,
    { recipe_id: string; data: IReview }
  >({
    mutationFn: ({ recipe_id, data }) =>
      api.put(endPoints.updateReview(recipe_id), data),
    onSuccess: (_, data) => {
      queryClient.invalidateQueries({ queryKey: ["ReviewDetail", data?.recipe_id] });
    },
    onError: handleError,
  });
};

export const useDeleteReview = () => {
  const queryClient = useQueryClient();

  return useMutation<IDeleteResponse, IErrorResponse, string>({
    mutationFn: (pk: string) => api.delete(endPoints.deleteReview(pk)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Reviews"] });
    },
    onError: handleError,
  });
};
