import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createOneUserService,
  deleteUserService,
  getAllUserService,
  getUserByIdService,
  updateOneUserService,
} from "../../services/admin/userService";
import { useState } from "react";
import toast from "react-hot-toast";

// Get all users with pagination + search
export const useAdminUser = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");

  const query = useQuery({
    queryKey: ["admin_user", pageNumber, pageSize, search],
    queryFn: () =>
      getAllUserService({
        page: pageNumber,
        limit: pageSize,
        search: search,
      }),
    keepPreviousData: true,
  });

  const users = query.data?.data || [];
  const pagination = query.data?.pagination || {
    page: 1,
    totalPages: 1,
    limit: 10,
  };
  const canPreviousPage = pagination.page > 1;
  const canNextPage = pagination.page < pagination.totalPages;

  return {
    ...query,
    users,
    pagination,
    canPreviousPage,
    canNextPage,
    setPageNumber,
    setPageSize,
    setSearch,
  };
};

// Create a user
export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["admin_create_user"],
    mutationFn: createOneUserService,
    onSuccess: () => {
      toast.success("User created successfully");
      queryClient.invalidateQueries(["admin_user"]);
    },
    onError: (err) => {
      toast.error(err.message || "Failed to create user");
    },
  });
};

// Get one user by id
export const useGetOneUser = (id) => {
  const query = useQuery({
    queryKey: ["admin_user_detail", id],
    queryFn: () => getUserByIdService(id),
    enabled: !!id,
    retry: false,
  });
  const user = query.data?.data || {};
  return {
    ...query,
    user,
  };
};

// Update a user
export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["admin_user_update"],
    mutationFn: ({ id, data }) => updateOneUserService(id, data),
    onSuccess: () => {
      toast.success("User updated successfully");
      queryClient.invalidateQueries(["admin_user", "admin_user_detail"]);
    },
    onError: (err) => {
      toast.error(err.message || "Update failed");
    },
  });
};

// Delete a user
export const useDeleteOneUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["admin_user_delete"],
    mutationFn: deleteUserService,
    onSuccess: () => {
      toast.success("User deleted successfully");
      queryClient.invalidateQueries(["admin_user"]);
    },
    onError: (err) => {
      console.error(err);
      toast.error(err.message || "Delete failed");
    },
  });
};
