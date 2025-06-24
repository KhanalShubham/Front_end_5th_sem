import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  addOneRequestService,
  getMyRequestsService,
  deleteRequestService,
  getAllRequestsService,
  updateRequestStatusService,
} from "../services/requestService";

// Patient: Fetch my requests
export const useMyRequests = () => {
  const query = useQuery({
    queryKey: ["my_requests"],
    queryFn: getMyRequestsService,
    retry: false,
  });
  const myRequests = query.data?.data || [];
  return { ...query, myRequests };
};

// Patient: Add request
export const useAddRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addOneRequestService,
    mutationKey: ["add_request"],
    onSuccess: () => {
      toast.success("Request submitted successfully");
      queryClient.invalidateQueries(["my_requests"]);
    },
    onError: (err) => {
      toast.error(err.message || "Failed to submit request");
    },
  });
};

// Patient: Delete request
export const useDeleteRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteRequestService,
    mutationKey: ["delete_request"],
    onSuccess: () => {
      toast.success("Request deleted");
      queryClient.invalidateQueries(["my_requests"]);
    },
    onError: (err) => {
      toast.error(err.message || "Failed to delete request");
    },
  });
};

// Admin: Fetch all requests (with pagination, status, date filter)
export const useAdminRequests = (params) => {
  const query = useQuery({
    queryKey: ["admin_requests", params],
    queryFn: () => getAllRequestsService(params),
    keepPreviousData: true,
    retry: false,
  });
  const requests = query.data?.data || [];
  const pagination = query.data?.pagination || { page: 1, totalPages: 1 };
  return { ...query, requests, pagination };
};

// Admin: Update request status
export const useUpdateRequestStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateRequestStatusService,
    mutationKey: ["update_request_status"],
    onSuccess: (res) => {
      toast.success(res.message);
      queryClient.invalidateQueries(["admin_requests"]);
    },
    onError: (err) => {
        console.log(err);
        
      toast.error(err.message || "Failed to update status");
    },
  });
};
