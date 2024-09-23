import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { api } from "../axiosInstance";
import endPoints from "../endPoints";
import {
  ICreateUpdateResponse,
  IDeleteResponse,
  IErrorResponse,
  IIngredient,
  IShoppingList,
} from "@/types";

// Function to handle error responses
const handleError = (error: unknown): IErrorResponse => {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data.message || error.message;
    console.error(message);
    return { message };
  }
  console.error("An unexpected error occurred");
  return { message: "An unexpected error occurred" };
};

// Fetch all shopping lists
export const useGetAllShoppingLists = () => {
  return useQuery<IShoppingList[], IErrorResponse>({
    queryKey: ["ShoppingLists"],
    queryFn: async () => {
      try {
        const response = await api.get(endPoints.allShoppingLists);
        return response.data;
      } catch (error) {
        throw handleError(error);
      }
    },
  });
};

// Fetch details of a single shopping list
export const useShoppingListDetail = (pk: string) => {
  return useQuery<IShoppingList, IErrorResponse>({
    queryKey: ["ShoppingListDetail", pk],
    queryFn: async () => {
      try {
        const response = await api.get(endPoints.shoppingListDetail(pk));
        return response.data;
      } catch (error) {
        throw handleError(error);
      }
    },
  });
};

// Create a new shopping list
export const useCreateShoppingList = () => {
  return useMutation<
    ICreateUpdateResponse,
    IErrorResponse,
    Omit<IShoppingList, "id">
  >({
    mutationFn: async (data) => {
      try {
        const response = await api.post(endPoints.createShoppingList, data);
        return response.data;
      } catch (error) {
        throw handleError(error);
      }
    },
    onError: handleError,
  });
};

// Update an existing shopping list
// export const useUpdateShoppingList = () => {
//   const queryClient = useQueryClient();

//   return useMutation<ICreateUpdateResponse, IErrorResponse, IShoppingList>({
//     mutationFn: async (data) => {
//       try {
//         const response = await api.put(
//           endPoints.updateShoppingList(data.id),
//           data
//         );
//         return response.data;
//       } catch (error) {
//         throw handleError(error);
//       }
//     },
//     onSuccess: (_, data) => {
//       queryClient.invalidateQueries({
//         queryKey: ["ShoppingListDetail", data.id],
//       });
//     },
//     onError: handleError,
//   });
// };

// Delete a shopping list
export const useDeleteShoppingList = () => {
  const queryClient = useQueryClient();

  return useMutation<IDeleteResponse, IErrorResponse, string>({
    mutationFn: async (pk) => {
      try {
        const response = await api.delete(endPoints.deleteShoppingList(pk));
        return response.data;
      } catch (error) {
        throw handleError(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ShoppingLists"] });
    },
    onError: handleError,
  });
};

// Delete a shopping list Item
export const useDeleteShoppingListItem = () => {
  const queryClient = useQueryClient();

  return useMutation<IDeleteResponse, IErrorResponse, string>({
    mutationFn: async (pk) => {
      try {
        const response = await api.delete(endPoints.deleteShoppingListItem(pk));
        return response.data;
      } catch (error) {
        throw handleError(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ShoppingLists"] });
    },
    onError: handleError,
  });
};
export const useUpdateShoppingListItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Partial<IIngredient>; 
    }) => {
      const response = await api.put(
        endPoints.updateShoppingListItem(id),
        data
      );
      return response.data; 
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ShoppingLists"] });
    },

    onError: (error) => {
      // Handle the error (e.g., show a toast or alert)
      console.error("Error updating shopping list item:", error);
    },
  });
};
