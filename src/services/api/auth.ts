import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../axiosInstance";
import endPoints from "../endPoints";
import {
  IUser,
  IErrorResponse,
  ICreateUpdateResponse,
  IDeleteResponse,
  MutationDataType,
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

export const useRegisterUser = () => {
  return useMutation<IUser, IErrorResponse, MutationDataType>({
    mutationFn: async (data: MutationDataType) => {
      const response = await api.post(endPoints.registerUser, data);
      return response.data.data as IUser;
    },
    onError: handleError,
  });
};

export const useLoginUser = () => {
  return useMutation<ICreateUpdateResponse, IErrorResponse, MutationDataType>({
    mutationFn: async (data: MutationDataType) => {
      const response = await api.post(endPoints.loginUser, data);
      return response.data;
    },
    onError: handleError,
  });
};

export const useLogoutUser = () => {
  return useMutation<ICreateUpdateResponse, IErrorResponse>({
    mutationFn: async () => {
      const response = await api.post(endPoints.logoutUser);

      return response.data;
    },
    onError: handleError,
  });
};

export const useGetAllUsers = () => {
  return useQuery<IUser[], IErrorResponse>({
    queryKey: ["Users"],
    queryFn: async () => {
      try {
        const response = await api.get(endPoints.allUsers);
        return response.data;
      } catch (error) {
        throw handleError(error);
      }
    },
  });
};

export const useUserDetail = (pk: string) => {
  return useQuery<IUser, IErrorResponse>({
    queryKey: ["UserDetail", pk],
    queryFn: async () => {
      try {
        const response = await api.get(endPoints.userDetail(pk));
        return response.data;
      } catch (error) {
        throw handleError(error);
      }
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ICreateUpdateResponse,
    IErrorResponse,
    { id: string; formData: FormData }
  >({
    mutationFn: ({ id, formData }) =>
      api.put(endPoints.updateUser(id), formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["UserDetail"] });
    },
    onError: handleError,
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation<IDeleteResponse, IErrorResponse, string>({
    mutationFn: (pk: string) => api.delete(endPoints.deleteUser(pk)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Users"] });
    },
    onError: handleError,
  });
};

export const useGetCurrentUser = () => {
  return useQuery<ICreateUpdateResponse, IErrorResponse>({
    queryKey: ["UserDetail"],
    queryFn: async () => {
      try {
        const response = await api.get(endPoints.getCurrentUser);
        return response.data;
      } catch (error) {
        throw handleError(error);
      }
    },
    retry: false,
  });
};
